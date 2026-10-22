"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language/language-provider"
import { ConnectPrompt } from "@/components/identity/connect-prompt"
import { CreateDid } from "@/components/identity/create-did"
import { DeactivateDid } from "@/components/identity/deactivate-did"
import { EditProfile } from "@/components/identity/edit-profile"
import { MigrateFromPlc } from "@/components/identity/migrate-from-plc"
import { ResolveDid } from "@/components/identity/resolve-did"
import { RotateKeys } from "@/components/identity/rotate-keys"
import { useOwnedDid } from "@/components/identity/use-owned-did"
import { transactionUrl } from "@/lib/ckb/transaction-url"

export function IdentityHome() {
  const { t } = useLanguage()
  const owned = useOwnedDid()
  const [selectedDid, setSelectedDid] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const record =
    owned.records?.find((item) => item.did === selectedDid) ?? owned.records?.[0]

  async function onComplete(txHash: string) {
    setNotice(txHash)
    await owned.refresh()
  }

  return (
    <div className="space-y-8">
      <header className="max-w-2xl">
        <p className="font-display text-xs tracking-[0.24em] text-primary uppercase">
          {t.identity.eyebrow}
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold">{t.identity.title}</h1>
        <p className="mt-3 text-muted-foreground">{t.identity.lead}</p>
      </header>
      {notice ? (
        <p className="text-sm text-muted-foreground">
          {t.identity.sent}{" "}
          <a
            href={transactionUrl(notice)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary"
          >
            {notice.slice(0, 10)}…
          </a>
        </p>
      ) : null}
      {!owned.signer ? <ConnectPrompt /> : null}
      {owned.signer && owned.loading ? (
        <p className="text-sm text-muted-foreground">{t.identity.loading}</p>
      ) : null}
      {owned.error ? (
        <p className="text-sm text-destructive">{owned.error || t.identity.failed}</p>
      ) : null}
      {owned.signer && owned.records && owned.records.length === 0 ? (
        <div className="space-y-6">
          <div className="max-w-xl">
            <h2 className="font-display text-xl font-semibold">{t.identity.emptyTitle}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t.identity.emptyBody}</p>
          </div>
          <CreateDid onComplete={onComplete} />
        </div>
      ) : null}
      {record ? (
        <div className="space-y-6">
          <section className="max-w-xl rounded-2xl bg-card p-6">
            <p className="text-xs tracking-wide text-primary uppercase">{t.identity.owned}</p>
            {owned.records && owned.records.length > 1 ? (
              <label className="mt-3 block text-sm">
                <select
                  className="mt-1 w-full rounded-2xl border border-border bg-background px-3 py-2"
                  value={record.did}
                  onChange={(event) => setSelectedDid(event.target.value)}
                >
                  {owned.records.map((item) => (
                    <option key={item.did} value={item.did}>
                      {item.profile?.displayName || item.did}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}
            <div className="mt-4 flex items-center gap-3">
              {record.profile?.avatar ? (
                <span
                  aria-hidden
                  className="size-12 shrink-0 rounded-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url("${record.profile.avatar.replace(/["\\\n\r]/g, "")}")`,
                  }}
                />
              ) : null}
              <div className="min-w-0">
                <p className="font-display text-lg font-semibold">
                  {record.profile?.displayName || record.did}
                </p>
                <p className="truncate text-xs text-muted-foreground">{record.did}</p>
              </div>
            </div>
            {record.profile?.bio ? (
              <p className="mt-3 text-sm text-muted-foreground">{record.profile.bio}</p>
            ) : null}
            {record.localId ? (
              <p className="mt-3 text-xs text-muted-foreground">
                {t.identity.importedFrom} {record.localId}
              </p>
            ) : null}
          </section>
          <EditProfile key={record.did} record={record} onComplete={onComplete} />
          <RotateKeys record={record} onComplete={onComplete} />
          <DeactivateDid record={record} onComplete={onComplete} />
        </div>
      ) : null}
      {owned.signer ? <MigrateFromPlc onComplete={onComplete} /> : null}
      {owned.signer ? <ResolveDid /> : null}
    </div>
  )
}
