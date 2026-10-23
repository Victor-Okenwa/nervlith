import { ccc } from "@ckb-ccc/connector-react"

// Owner-mode xUDT args, 68 bytes:
// 0..32  creator lock hash. The deployed script treats this as the owner.
//        A mint is allowed when an input lock has this hash.
// 32..36 flags. Four zero bytes select plain xUDT: no extension script.
//        The script reads this word and ignores the bytes after it.
// 36..68 community type id. Those bytes stay in the type script, so two
//        communities from the same creator are different tokens.
// Cell data is the uint128 token amount, little-endian. The card picture is
// not in this cell. The client draws it from the community cell.
export const MEMBERSHIP_XUDT_ARGS_LENGTH = 68
export const MEMBERSHIP_AMOUNT = BigInt(1)

const ZERO = BigInt(0)
const ONE = BigInt(1)
const SHIFT64 = BigInt(64)
const SHIFT128 = BigInt(128)

export function membershipXudtArgs(ownerLockHash: string, typeId: string) {
  const owner = ccc.bytesFrom(ownerLockHash)
  const id = ccc.bytesFrom(typeId)
  if (owner.length !== 32 || id.length !== 32) throw new Error("BAD_MEMBERSHIP_ARGS")
  const args = new Uint8Array(MEMBERSHIP_XUDT_ARGS_LENGTH)
  args.set(owner, 0)
  args.set(id, 36)
  return ccc.hexFrom(args)
}

export function parseMembershipXudtArgs(args: string) {
  let bytes: Uint8Array
  try {
    bytes = ccc.bytesFrom(args)
  } catch {
    return null
  }
  if (bytes.length !== MEMBERSHIP_XUDT_ARGS_LENGTH) return null
  if (bytes[32] !== 0 || bytes[33] !== 0 || bytes[34] !== 0 || bytes[35] !== 0) return null
  return {
    ownerLockHash: ccc.hexFrom(bytes.slice(0, 32)),
    typeId: ccc.hexFrom(bytes.slice(36)),
  }
}

export function encodeMembershipAmount(amount: bigint) {
  if (amount < ZERO || amount >= ONE << SHIFT128) throw new Error("BAD_MEMBERSHIP_AMOUNT")
  const bytes = new Uint8Array(16)
  const view = new DataView(bytes.buffer)
  const low = amount & ((ONE << SHIFT64) - ONE)
  view.setBigUint64(0, low, true)
  view.setBigUint64(8, amount >> SHIFT64, true)
  return bytes
}

export function decodeMembershipAmount(data: Uint8Array) {
  if (data.length < 16) return null
  const view = new DataView(data.buffer, data.byteOffset, data.byteLength)
  const low = view.getBigUint64(0, true)
  const high = view.getBigUint64(8, true)
  return low + (high << SHIFT64)
}
