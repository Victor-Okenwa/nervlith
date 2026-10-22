"use client"

import Link from "next/link"
import { useLanguage } from "@/components/language/language-provider"
import { PassportCard } from "@/components/identity/passport-card"
import { useOwnedDid } from "@/components/identity/use-owned-did"

export function DashboardHome() {
  const { t } = useLanguage()
  const owned = useOwnedDid()
  const record = owned.records?.[0]

  return (
    <div className="max-w-2xl">
      <p className="font-display text-xs tracking-[0.24em] text-primary uppercase">
        {t.shell.dashboard}
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold">{t.shell.dashboardTitle}</h1>
      {owned.loading ? (
        <p className="mt-4 text-sm text-muted-foreground">{t.identity.loading}</p>
      ) : null}
      {record ? (
        <div className="mt-6">
          <PassportCard record={record} />
          <p className="mt-4 text-sm text-muted-foreground">{t.shell.dashboardHasDid}</p>
        </div>
      ) : owned.signer ? (
        <p className="mt-4 text-muted-foreground">{t.shell.dashboardEmpty}</p>
      ) : (
        <p className="mt-4 text-muted-foreground">{t.identity.connectTitle}</p>
      )}
      <Link href="/identity" className="mt-6 inline-block text-sm text-primary">
        {t.shell.dashboardOpen}
      </Link>
    </div>
  )
}
