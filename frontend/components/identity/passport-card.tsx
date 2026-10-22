"use client"

import { useLanguage } from "@/components/language/language-provider"
import type { OwnedDid } from "@/lib/ckb/read-did"

function portraitUrl(record: OwnedDid) {
  const raw = record.profile?.avatar.trim()
  const url =
    raw ||
    `https://api.dicebear.com/9.x/pixel-art/png?seed=${encodeURIComponent(record.did)}`
  return url.replace(/["\\\n\r]/g, "")
}

export function PassportCard({ record }: { record: OwnedDid }) {
  const { t } = useLanguage()
  const name = record.profile?.displayName.trim() || record.did
  const bio = record.profile?.bio.trim()

  return (
    <div
      tabIndex={0}
      aria-label={name}
      className="group w-[13.75rem] rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="perspective-distant">
        <div className="relative aspect-[54/86] transform-3d transition-transform duration-700 ease-out group-hover:rotate-y-180 group-focus-visible:rotate-y-180 motion-reduce:transition-none">
          <div className="absolute inset-0 overflow-hidden rounded-2xl border border-border bg-card shadow-[0_0_28px_color-mix(in_srgb,var(--primary)_16%,transparent)] backface-hidden">
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-[62%] bg-cover bg-center"
              style={{ backgroundImage: `url("${portraitUrl(record)}")` }}
            />
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-[62%] bg-[linear-gradient(160deg,color-mix(in_srgb,var(--foreground)_14%,transparent),transparent_46%)]"
            />
            <div className="absolute inset-x-0 bottom-0 flex h-[38%] flex-col justify-end border-t border-primary/70 bg-card px-4 pt-3 pb-4">
              <p className="text-[10px] tracking-[0.22em] text-primary uppercase">
                {t.identity.eyebrow}
              </p>
              <p className="mt-1 truncate font-display text-lg font-semibold">{name}</p>
              <p className="mt-1 truncate font-mono text-[10px] text-muted-foreground">
                {record.did}
              </p>
            </div>
          </div>
          <div className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-border bg-card px-5 py-5 shadow-[0_0_28px_color-mix(in_srgb,var(--primary)_16%,transparent)] backface-hidden rotate-y-180">
            <p className="text-[10px] tracking-[0.22em] text-primary uppercase">
              {t.identity.bio}
            </p>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
              {bio || <span className="text-muted-foreground">{t.identity.bioEmpty}</span>}
            </p>
            {record.localId ? (
              <p className="text-[10px] text-muted-foreground">
                {t.identity.importedFrom} {record.localId}
              </p>
            ) : null}
            <p className="mt-4 font-display text-xs tracking-wide">Nervlith</p>
          </div>
        </div>
      </div>
    </div>
  )
}
