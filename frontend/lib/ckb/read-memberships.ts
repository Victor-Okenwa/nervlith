import { ccc } from "@ckb-ccc/connector-react"
import {
  decodeMembershipAmount,
  membershipXudtArgs,
  parseMembershipXudtArgs,
} from "@/lib/ckb/membership-xudt"
import type { ListedCommunity } from "@/lib/ckb/read-communities"

const PAGE = 10
const QUERY_WIDTH = 8

export async function listMemberships(
  client: ccc.Client,
  holderLockHash: string,
  communities: ListedCommunity[],
): Promise<ListedCommunity[]> {
  const xudt = await client.getKnownScript(ccc.KnownScript.XUdt)
  const held: ListedCommunity[] = []
  for (let start = 0; start < communities.length; start += QUERY_WIDTH) {
    const slice = communities.slice(start, start + QUERY_WIDTH)
    const found = await Promise.all(
      slice.map((community) => cellsFor(client, xudt, holderLockHash, community)),
    )
    held.push(...found.flat())
  }
  return held
}

async function cellsFor(
  client: ccc.Client,
  xudt: ccc.ScriptInfo,
  holderLockHash: string,
  community: ListedCommunity,
): Promise<ListedCommunity[]> {
  if (!isByte32(community.typeId) || !isByte32(community.lockHash)) return []
  const args = membershipXudtArgs(community.lockHash, community.typeId)
  const parsed = parseMembershipXudtArgs(args)
  if (!parsed) return []

  const held: ListedCommunity[] = []
  for await (const cell of client.findCells(
    {
      script: {
        codeHash: xudt.codeHash,
        hashType: xudt.hashType,
        args,
      },
      scriptType: "type",
      scriptSearchMode: "exact",
      withData: true,
    },
    "desc",
    PAGE,
  )) {
    const typeScript = cell.cellOutput.type
    if (!typeScript) continue
    const type = ccc.Script.from(typeScript)
    if (type.codeHash !== xudt.codeHash || type.hashType !== xudt.hashType) continue
    const identity = parseMembershipXudtArgs(type.args)
    if (!identity || !sameHex(identity.typeId, parsed.typeId)) continue
    if (!sameHex(identity.ownerLockHash, parsed.ownerLockHash)) continue
    const lock = ccc.Script.from(cell.cellOutput.lock)
    if (!sameHex(lock.hash(), holderLockHash)) continue
    const amount = decodeMembershipAmount(ccc.bytesFrom(cell.outputData))
    if (amount === null || amount < BigInt(1)) continue
    held.push({
      ...community,
      outPoint: `${cell.outPoint.txHash}:${cell.outPoint.index}`,
    })
    if (held.length >= PAGE) break
  }
  return held
}

function isByte32(hex: string) {
  try {
    return ccc.bytesFrom(hex).length === 32
  } catch {
    return false
  }
}

function sameHex(left: string, right: string) {
  return left.toLowerCase() === right.toLowerCase()
}
