import { argsToDid, createDidCkb } from "@ckb-ccc/did-ckb"
import { ccc } from "@ckb-ccc/connector-react"
import {
  documentWithProfile,
  encodeDidData,
  type DidProfile,
} from "@/lib/ckb/did-document"
import { reserveDidCapacity } from "@/lib/ckb/reserve-did-capacity"
import { submitDidTransaction } from "@/lib/ckb/submit-did-transaction"

export async function createDid(signer: ccc.Signer, profile: DidProfile) {
  const { tx, id, index } = await createDidCkb({
    signer,
    data: { value: { document: {} } },
  })
  const did = argsToDid(id)
  const document = documentWithProfile({}, { ...profile, did })

  // createDidCkb already attaches cellDeps for KnownScript.DidCkb.
  reserveDidCapacity(tx, index, encodeDidData(document))

  const txHash = await submitDidTransaction(signer, tx)
  return { txHash, did }
}
