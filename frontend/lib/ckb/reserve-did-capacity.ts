import { ccc } from "@ckb-ccc/connector-react"

// 200 CKB above the encoded document, so a later profile edit can grow the
// cell without a second funding input. Returned to the holder on deactivate.
const RESERVE_SHANNONS = BigInt(200) * BigInt(100000000)

export function reserveDidCapacity(
  tx: ccc.Transaction,
  index: number,
  data: ccc.BytesLike,
) {
  tx.outputsData[index] = ccc.hexFrom(data)
  tx.outputs[index].capacity =
    ccc.numFrom(tx.outputs[index].capacity) + RESERVE_SHANNONS
}
