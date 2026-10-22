import { listDidCkbsByLock, resolveDidCkb } from "@ckb-ccc/did-ckb"
import { ccc } from "@ckb-ccc/connector-react"
import {
  readDocument,
  readProfile,
  type DidDocument,
  type DidProfile,
} from "@/lib/ckb/did-document"

export type OwnedDid = {
  did: string
  id: string
  document: DidDocument
  profile: DidProfile | null
  localId: string | null
}

function fromRecord(record: {
  did: string
  id: ccc.Hex
  data: { value: { document: unknown; localId?: string | null } }
}): OwnedDid {
  const document = readDocument(record.data.value.document)
  return {
    did: record.did,
    id: record.id,
    document,
    profile: readProfile(document),
    localId: record.data.value.localId ?? null,
  }
}

export async function listOwnedDids(signer: ccc.Signer) {
  const lock = (await signer.getRecommendedAddressObj()).script
  const records = await listDidCkbsByLock({ client: signer.client, lock })
  return records.map(fromRecord)
}

export async function resolveDid(client: ccc.Client, did: string) {
  const record = await resolveDidCkb({ client, did })
  return record ? fromRecord(record) : null
}
