import { transferDidCkb } from "@ckb-ccc/did-ckb"
import { ccc } from "@ckb-ccc/connector-react"
import { submitDidTransaction } from "@/lib/ckb/submit-did-transaction"

export async function rotateDid(
  signer: ccc.Signer,
  id: string,
  address: string,
) {
  const receiver = await ccc.Address.fromString(address, signer.client)

  // The type id and document stay. Only the lock moves.
  // cellDeps for KnownScript.DidCkb are attached by transferDidCkb.
  const { tx } = await transferDidCkb({
    client: signer.client,
    id,
    receiver: receiver.script,
  })

  return submitDidTransaction(signer, tx)
}
