import {
  argsToDid,
  buildMigrationWitness,
  migrateDidCkb,
  plc,
} from "@ckb-ccc/did-ckb"
import { ccc } from "@ckb-ccc/connector-react"
import {
  documentWithProfile,
  encodeDidData,
  type DidProfile,
} from "@/lib/ckb/did-document"
import { reserveDidCapacity } from "@/lib/ckb/reserve-did-capacity"

export async function migrateDid(
  signer: ccc.Signer,
  sourceDid: string,
  rotationPrivateKey: string,
  rotationKeyIndex: number,
  profile: DidProfile,
) {
  const log = await plc.fetchPlcLog(sourceDid)
  const genesisOperation = plc.getGenesisOperation(log)
  const rotationKeys = plc.getRotationKeys(genesisOperation)
  const slot = rotationKeys[rotationKeyIndex]
  if (!slot) {
    throw new Error(`Rotation key ${rotationKeyIndex} is not on that DID`)
  }
  if (
    !plc.verifyPrivateKeyMatch(
      rotationPrivateKey,
      slot.compressedPubkey,
      slot.curve,
    )
  ) {
    throw new Error(`Rotation key ${rotationKeyIndex} does not match`)
  }

  const { tx, id, index } = await migrateDidCkb({
    signer,
    sourceDid,
    data: { value: { document: {}, localId: sourceDid } },
  })
  const did = argsToDid(id)

  // migrateDidCkb attaches cellDeps for KnownScript.DidCkb.
  // localId must stay on the output or the migration proof does not apply.
  reserveDidCapacity(
    tx,
    index,
    encodeDidData(documentWithProfile({}, { ...profile, did }), sourceDid),
  )

  await tx.completeInputsByCapacity(signer)
  await tx.completeFeeBy(signer)

  // WitnessArgs.outputType on input 0 is the slot the did:ckb script reads.
  // The witness is built after the fee, because it signs the final tx hash.
  const witness = buildMigrationWitness({
    txHash: tx.hash(),
    genesisOperation,
    rotationKeyIndex,
    rotationPrivateKey,
  })
  tx.setWitnessArgs(0, ccc.WitnessArgs.from({ outputType: witness.toBytes() }))

  const txHash = await signer.sendTransaction(tx)
  return { txHash, did }
}
