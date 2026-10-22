import { ccc } from "@ckb-ccc/connector-react"
import {
  encodeCommunity,
  type CommunityDraft,
} from "@/lib/ckb/community-data"
import { submitDidTransaction } from "@/lib/ckb/submit-did-transaction"

export class CommunityScriptUnavailable extends Error {
  constructor() {
    super("COMMUNITY_SCRIPT_UNAVAILABLE")
    this.name = "CommunityScriptUnavailable"
  }
}

function scriptDeployment() {
  const codeHash = process.env.NEXT_PUBLIC_COMMUNITY_TYPE_CODE_HASH
  const txHash = process.env.NEXT_PUBLIC_COMMUNITY_DEP_TX_HASH
  const hashType = process.env.NEXT_PUBLIC_COMMUNITY_TYPE_HASH_TYPE ?? "type"
  const index = process.env.NEXT_PUBLIC_COMMUNITY_DEP_INDEX ?? "0"
  if (!codeHash || !txHash) return null
  if (hashType !== "type" && hashType !== "data" && hashType !== "data1" && hashType !== "data2") {
    return null
  }
  return { codeHash, txHash, hashType, index }
}

export function communityScriptReady() {
  return scriptDeployment() !== null
}

export async function createCommunity(signer: ccc.Signer, draft: CommunityDraft) {
  const deployment = scriptDeployment()
  if (!deployment) throw new CommunityScriptUnavailable()

  const data = encodeCommunity(draft)
  const lock = (await signer.getRecommendedAddressObj()).script
  // 200 CKBytes covers the lock and type scripts. Each data byte adds one CKByte.
  // cellDeps carries the community type script. Creation reads output data, not a witness.
  // The owner-mode xUDT is minted on join in Phase 3. Its args are the owner lock hash
  // plus this cell's type id, so the token belongs to this community alone.
  const capacity = (BigInt(data.length) + BigInt(200)) * BigInt(100_000_000)
  const tx = ccc.Transaction.from({
    cellDeps: [
      {
        outPoint: { txHash: deployment.txHash, index: deployment.index },
        depType: "code",
      },
    ],
    outputs: [
      {
        lock,
        type: {
          codeHash: deployment.codeHash,
          hashType: deployment.hashType,
          args: `0x${"00".repeat(32)}`,
        },
        capacity,
      },
    ],
    outputsData: [ccc.hexFrom(data)],
  })

  await tx.completeInputsByCapacity(signer)
  const typeId = ccc.hashTypeId(tx.inputs[0], 0)
  tx.outputs[0].type = ccc.Script.from({
    codeHash: deployment.codeHash,
    hashType: deployment.hashType,
    args: typeId,
  })
  const txHash = await submitDidTransaction(signer, tx)
  return { txHash }
}
