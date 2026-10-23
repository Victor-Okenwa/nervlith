"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ccc } from "@ckb-ccc/connector-react"
import { useLanguage } from "@/components/language/language-provider"
import { ConnectPrompt } from "@/components/identity/connect-prompt"
import { CommunityListing } from "@/components/shell/community-listing"
import { CommunityRoster } from "@/components/shell/community-roster"
import {
  CommunityTabs,
  communityTab,
  type CommunityTab,
} from "@/components/shell/community-tabs"
import { formatGateFeeCkb } from "@/lib/ckb/community-data"
import { listCommunities, type ListedCommunity } from "@/lib/ckb/read-communities"

export function CommunitiesHome({ initialTab }: { initialTab?: string }) {
  const { t } = useLanguage()
  const router = useRouter()
  const signer = ccc.useSigner()
  const { client } = ccc.useCcc()
  const [tab, setTab] = useState<CommunityTab>(communityTab(initialTab))
  const [rows, setRows] = useState<ListedCommunity[] | null>(null)
  const [failed, setFailed] = useState(false)
  const [lockHash, setLockHash] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    listCommunities(client).then(
      (next) => {
        if (cancelled) return
        setRows(next)
        setFailed(false)
      },
      () => {
        if (cancelled) return
        setRows([])
        setFailed(true)
      },
    )
    return () => {
      cancelled = true
    }
  }, [client])

  useEffect(() => {
    if (!signer) return
    let cancelled = false
    signer.getRecommendedAddressObj().then(
      (address) => {
        if (!cancelled) setLockHash(address.script.hash())
      },
      () => {
        if (!cancelled) setLockHash(null)
      },
    )
    return () => {
      cancelled = true
    }
  }, [signer])

  function selectTab(next: CommunityTab) {
    setTab(next)
    router.replace(next === "communities" ? "/communities" : `/communities?tab=${next}`)
  }

  const ownerHash = signer ? lockHash : null
  const created = rows?.filter((community) => community.lockHash === ownerHash) ?? []
  const launch = { href: "/launch", label: t.shell.communitiesLaunch }
  const modelLabel = (community: ListedCommunity) => t.launch.models[community.model]
  const feeLabel = (community: ListedCommunity) => formatGateFeeCkb(community.gateFeeShannons)

  return (
    <div className="max-w-3xl">
      <p className="font-display text-xs tracking-[0.24em] text-primary uppercase">
        {t.shell.communities}
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold">{t.shell.communitiesTitle}</h1>
      {rows === null ? (
        <p className="mt-4 text-sm text-muted-foreground">{t.shell.communitiesLoading}</p>
      ) : null}
      {failed ? <p className="mt-4 text-sm text-destructive">{t.launch.failed}</p> : null}
      {rows ? (
        <CommunityTabs
          tab={tab}
          onChange={selectTab}
          labels={{
            communities: t.shell.tabCommunities,
            memberships: t.shell.tabMemberships,
            created: t.shell.tabCreated,
          }}
          communities={
            <CommunityListing
              communities={rows}
              modelLabel={modelLabel}
              feeLabel={feeLabel}
              empty={t.shell.communitiesEmpty}
              action={launch}
            />
          }
          memberships={
            // Join mints the membership card in Phase 3. This tab stays empty until then.
            <CommunityRoster
              communities={[]}
              modelLabel={modelLabel}
              empty={t.shell.membershipsEmpty}
              hint={signer ? t.shell.membershipsHint : undefined}
              prompt={signer ? undefined : <ConnectPrompt />}
            />
          }
          created={
            <CommunityRoster
              row
              communities={ownerHash ? created : []}
              modelLabel={modelLabel}
              empty={t.shell.createdEmpty}
              hint={signer ? t.shell.createdPending : undefined}
              action={signer ? launch : undefined}
              prompt={
                !signer ? (
                  <ConnectPrompt />
                ) : ownerHash ? undefined : (
                  <p className="mt-6 text-sm text-muted-foreground">{t.shell.communitiesLoading}</p>
                )
              }
            />
          }
        />
      ) : null}
    </div>
  )
}
