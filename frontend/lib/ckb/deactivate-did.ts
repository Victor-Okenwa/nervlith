import { destroyDidCkb } from "@ckb-ccc/did-ckb"
import { ccc } from "@ckb-ccc/connector-react"
import { submitDidTransaction } from "@/lib/ckb/submit-did-transaction"

export async function deactivateDid(signer: ccc.Signer, id: string) {
  const { tx } = await destroyDidCkb({ client: signer.client, id })

  // The DID cell is consumed, so there is no DID output.
  // completeFeeBy returns its capacity to the signer as change.
  // cellDeps still include KnownScript.DidCkb so the type script can run.
  return submitDidTransaction(signer, tx)
}
