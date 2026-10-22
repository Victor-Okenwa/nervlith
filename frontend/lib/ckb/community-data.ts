// Molecule table Community, field order fixed for the Phase 2 type script:
// name: Bytes, gate_fee: Uint64 (shannons), model: byte, pattern: byte,
// art: byte, holographic: byte.
// Offsets are from the start of the table, including the 4-byte header.

export const MIN_GATE_FEE_CKB = 200
export const MIN_GATE_FEE_SHANNONS = BigInt(MIN_GATE_FEE_CKB) * BigInt(100_000_000)
export const COMMUNITY_NAME_MAX = 32

export const GOVERNANCE_MODELS = ["autocracy", "democracy", "legislative"] as const
export const LIVE_GOVERNANCE_MODELS = ["autocracy"] as const
export const CARD_PATTERNS = [
  "signal",
  "mesh",
  "crest",
  "splats",
  "top",
  "bottom",
  "left",
  "right",
] as const
export const CARD_ARTS = ["ember", "alloy", "void"] as const
export const CARD_HOLOS = ["none", "sheen", "prism"] as const

export type GovernanceModel = (typeof GOVERNANCE_MODELS)[number]

export function governanceLive(model: GovernanceModel) {
  return (LIVE_GOVERNANCE_MODELS as readonly GovernanceModel[]).includes(model)
}
export type CardPattern = (typeof CARD_PATTERNS)[number]
export type CardArt = (typeof CARD_ARTS)[number]
export type CardHolo = (typeof CARD_HOLOS)[number]

export type CommunityDraft = {
  name: string
  gateFeeCkb: string
  model: GovernanceModel
  pattern: CardPattern
  art: CardArt
  holographic: CardHolo
}

export type CommunityRecord = {
  name: string
  gateFeeShannons: bigint
  model: GovernanceModel
  pattern: CardPattern
  art: CardArt
  holographic: CardHolo
}

const SHANNONS = BigInt(100_000_000)
const U32 = BigInt(4_294_967_296)

export function parseGateFeeShannons(input: string): bigint | null {
  const trimmed = input.trim()
  if (!/^\d+(\.\d{1,8})?$/.test(trimmed)) return null
  const [whole, frac = ""] = trimmed.split(".")
  if (whole.length > 15) return null
  const padded = `${frac}00000000`.slice(0, 8)
  return BigInt(whole) * SHANNONS + BigInt(padded)
}

export function formatGateFeeCkb(shannons: bigint): string {
  const whole = shannons / SHANNONS
  const frac = (shannons % SHANNONS).toString().padStart(8, "0").replace(/0+$/, "")
  return frac ? `${whole.toString()}.${frac}` : whole.toString()
}

export function communityNameOk(name: string) {
  const trimmed = name.trim()
  const length = [...trimmed].length
  return length >= 1 && length <= COMMUNITY_NAME_MAX && !/[\u0000-\u001f]/.test(trimmed)
}

export function gateFeeOk(input: string) {
  const fee = parseGateFeeShannons(input)
  return fee !== null && fee >= MIN_GATE_FEE_SHANNONS
}

export function encodeCommunity(draft: CommunityDraft): Uint8Array {
  const name = draft.name.trim()
  const fee = parseGateFeeShannons(draft.gateFeeCkb)
  if (!communityNameOk(name) || fee === null || !gateFeeOk(draft.gateFeeCkb)) {
    throw new Error("INVALID_COMMUNITY")
  }
  return molTable([
    molBytes(new TextEncoder().encode(name)),
    u64le(fee),
    new Uint8Array([GOVERNANCE_MODELS.indexOf(draft.model)]),
    new Uint8Array([CARD_PATTERNS.indexOf(draft.pattern)]),
    new Uint8Array([CARD_ARTS.indexOf(draft.art)]),
    new Uint8Array([CARD_HOLOS.indexOf(draft.holographic)]),
  ])
}

export function decodeCommunity(data: Uint8Array): CommunityRecord | null {
  try {
    const fields = readTable(data, 6)
    const nameBytes = readBytes(fields[0])
    const name = new TextDecoder("utf-8", { fatal: true }).decode(nameBytes)
    if (!communityNameOk(name)) return null
    const gateFeeShannons = readU64(fields[1])
    if (gateFeeShannons < MIN_GATE_FEE_SHANNONS) return null
    const model = GOVERNANCE_MODELS[fields[2][0]]
    const pattern = CARD_PATTERNS[fields[3][0]]
    const art = CARD_ARTS[fields[4][0]]
    const holographic = CARD_HOLOS[fields[5][0]]
    if (!model || !pattern || !art || !holographic) return null
    if (fields[2].length !== 1 || fields[3].length !== 1) return null
    if (fields[4].length !== 1 || fields[5].length !== 1) return null
    return { name, gateFeeShannons, model, pattern, art, holographic }
  } catch {
    return null
  }
}

function u32le(value: number) {
  const bytes = new Uint8Array(4)
  new DataView(bytes.buffer).setUint32(0, value, true)
  return bytes
}

function u64le(value: bigint) {
  const bytes = new Uint8Array(8)
  const view = new DataView(bytes.buffer)
  const low = value % U32
  const high = value / U32
  view.setUint32(0, Number(low), true)
  view.setUint32(4, Number(high), true)
  return bytes
}

function readU32(bytes: Uint8Array, offset: number) {
  return new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength).getUint32(offset, true)
}

function readU64(bytes: Uint8Array) {
  if (bytes.length !== 8) throw new Error("bad uint64")
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)
  const low = BigInt(view.getUint32(0, true))
  const high = BigInt(view.getUint32(4, true))
  return low + high * U32
}

function concat(parts: Uint8Array[]) {
  const length = parts.reduce((sum, part) => sum + part.length, 0)
  const out = new Uint8Array(length)
  let offset = 0
  for (const part of parts) {
    out.set(part, offset)
    offset += part.length
  }
  return out
}

function molBytes(raw: Uint8Array) {
  return concat([u32le(4 + raw.length), raw])
}

function molTable(fields: Uint8Array[]) {
  const header = 4 + fields.length * 4
  let cursor = header
  const offsets = fields.map((field) => {
    const offset = u32le(cursor)
    cursor += field.length
    return offset
  })
  return concat([u32le(cursor), ...offsets, ...fields])
}

function readTable(bytes: Uint8Array, count: number) {
  const total = readU32(bytes, 0)
  if (total !== bytes.length) throw new Error("bad table")
  const fields: Uint8Array[] = []
  for (let index = 0; index < count; index += 1) {
    const start = readU32(bytes, 4 + index * 4)
    const end = index + 1 === count ? total : readU32(bytes, 8 + index * 4)
    if (start > end || end > total) throw new Error("bad offset")
    fields.push(bytes.slice(start, end))
  }
  return fields
}

function readBytes(field: Uint8Array) {
  const size = readU32(field, 0)
  if (size !== field.length || size < 4) throw new Error("bad bytes")
  return field.slice(4)
}
