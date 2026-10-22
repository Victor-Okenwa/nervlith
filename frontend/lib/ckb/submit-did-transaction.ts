import { ccc } from "@ckb-ccc/connector-react"

export async function submitDidTransaction(
  signer: ccc.Signer,
  tx: ccc.Transaction,
) {
  await tx.completeInputsByCapacity(signer)
  await tx.completeFeeBy(signer)
  return signer.sendTransaction(tx)
}
