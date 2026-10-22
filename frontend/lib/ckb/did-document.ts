import { DidCkbData } from "@ckb-ccc/did-ckb"

export type DidDocument = {
  verificationMethods?: Record<string, string>
  alsoKnownAs?: string[]
  services?: Record<string, unknown>
}

export type DidProfile = {
  displayName: string
  bio: string
  avatar: string
}

export function readDocument(document: unknown): DidDocument {
  if (!document || typeof document !== "object") return {}
  return document as DidDocument
}

export function readProfile(document: DidDocument): DidProfile | null {
  const profile = document.services?.profile
  if (!profile || typeof profile !== "object") return null
  const record = profile as Record<string, unknown>
  if (record.type !== "VellumProfile") return null
  return {
    displayName: typeof record.displayName === "string" ? record.displayName : "",
    bio: typeof record.bio === "string" ? record.bio : "",
    avatar: typeof record.avatar === "string" ? record.avatar : "",
  }
}

export function documentWithProfile(
  current: DidDocument,
  input: DidProfile & { did: string },
): DidDocument {
  const avatar =
    input.avatar.trim() ||
    `https://api.dicebear.com/9.x/pixel-art/png?seed=${encodeURIComponent(input.did)}`

  return {
    ...current,
    services: {
      ...current.services,
      profile: {
        type: "VellumProfile",
        endpoint: "inline",
        displayName: input.displayName.trim(),
        bio: input.bio.trim(),
        avatar,
      },
    },
  }
}

export function encodeDidData(document: DidDocument, localId?: string | null) {
  return DidCkbData.from({
    value: {
      document,
      localId: localId ?? undefined,
    },
  }).toBytes()
}
