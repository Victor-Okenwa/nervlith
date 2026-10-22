"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ccc } from "@ckb-ccc/connector-react"
import { useLanguage } from "@/components/language/language-provider"
import { MembershipCard } from "@/components/membership/membership-card"
import { formatGateFeeCkb } from "@/lib/ckb/community-data"
import { listCommunities, type ListedCommunity } from "@/lib/ckb/read-communities"

export function CommunitiesHome() {
  const { t } = useLanguage()
  const { client } = ccc.useCcc()
  const [rows, setRows] = useState<ListedCommunity[] | null>(null)
  const [failed, setFailed] = useState(false)

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
      {rows && rows.length === 0 ? (
        <div className="mt-6">
          <p className="text-muted-foreground">{t.shell.communitiesEmpty}</p>
          <Link
            href="/launch"
            className="mt-5 inline-flex rounded-2xl bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow-[0_0_24px_color-mix(in_srgb,var(--primary)_35%,transparent)]"
          >
            {t.shell.communitiesLaunch}
          </Link>
        </div>
      ) : null}
      {rows && rows.length > 0 ? (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {rows.map((community) => (
            <li key={community.outPoint}>
              <MembershipCard
                name={community.name}
                fee={formatGateFeeCkb(community.gateFeeShannons)}
                model={t.launch.models[community.model]}
                pattern={community.pattern}
                art={community.art}
                holographic={community.holographic}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
