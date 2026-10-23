import { ccc } from "@ckb-ccc/connector-react"
import { decodeCommunity, type CommunityRecord } from "@/lib/ckb/community-data"

export type ListedCommunity = CommunityRecord & {
  outPoint: string
  lockHash: string
  typeId: string
}

const PAGE = 20
const LIMIT = 50

export async function listCommunities(client: ccc.Client): Promise<ListedCommunity[]> {
  const codeHash = process.env.NEXT_PUBLIC_COMMUNITY_TYPE_CODE_HASH
  const hashType = process.env.NEXT_PUBLIC_COMMUNITY_TYPE_HASH_TYPE ?? "type"
  if (!codeHash) return []
  if (hashType !== "type" && hashType !== "data" && hashType !== "data1" && hashType !== "data2") {
    return []
  }

  const found: ListedCommunity[] = []
  for await (const cell of client.findCells(
    {
      script: { codeHash, hashType, args: "0x" },
      scriptType: "type",
      scriptSearchMode: "prefix",
      withData: true,
    },
    "desc",
    PAGE,
  )) {
    const record = decodeCommunity(ccc.bytesFrom(cell.outputData))
    const typeScript = cell.cellOutput.type
    if (!record || !typeScript) continue
    found.push({
      ...record,
      outPoint: `${cell.outPoint.txHash}:${cell.outPoint.index}`,
      lockHash: ccc.Script.from(cell.cellOutput.lock).hash(),
      typeId: ccc.Script.from(typeScript).args,
    })
    if (found.length >= LIMIT) break
  }
  return found
}
