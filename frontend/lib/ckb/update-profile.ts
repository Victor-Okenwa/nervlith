import { resolveDidCkb, transferDidCkb } from "@ckb-ccc/did-ckb"
import { ccc } from "@ckb-ccc/connector-react"
import {
  documentWithProfile,
  readDocument,
  type DidProfile,
} from "@/lib/ckb/did-document"
import { submitDidTransaction } from "@/lib/ckb/submit-did-transaction"

export async function updateProfile(
  signer: ccc.Signer,
  did: string,
  profile: DidProfile,
) {
  const record = await resolveDidCkb({ client: signer.client, did })
  if (!record) {
    throw new Error("DID not found")
  }

  const document = documentWithProfile(readDocument(record.data.value.document), {
    ...profile,
    did,
  })

  // Same lock, new document. cellDeps for KnownScript.DidCkb come from transferDidCkb.
  // localId stays so a migrated did:plc import is not wiped by a profile edit.
  const { tx } = await transferDidCkb({
    client: signer.client,
    id: record.id,
    receiver: record.cell.cellOutput.lock,
    data: {
      value: {
        document,
        localId: record.data.value.localId,
      },
    },
  })

  return submitDidTransaction(signer, tx)
}
