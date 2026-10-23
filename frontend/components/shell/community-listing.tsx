import type { ReactNode } from "react"
import Link from "next/link"
import { previewCommunityDescription } from "@/lib/ckb/community-data"
import type { ListedCommunity } from "@/lib/ckb/read-communities"

export function CommunityListing({
  communities,
  modelLabel,
  feeLabel,
  empty,
  hint,
  action,
  prompt,
}: {
  communities: ListedCommunity[]
  modelLabel: (community: ListedCommunity) => string
  feeLabel: (community: ListedCommunity) => string
  empty: string
  hint?: string
  action?: { href: string; label: string }
  prompt?: ReactNode
}) {
  if (prompt) return prompt
  if (communities.length === 0) {
    return (
      <div className="mt-6">
        <p className="text-muted-foreground">{empty}</p>
        {hint ? <p className="mt-2 text-sm text-muted-foreground">{hint}</p> : null}
        {action ? (
          <Link
            href={action.href}
            className="mt-5 inline-flex rounded-2xl bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow-[0_0_24px_color-mix(in_srgb,var(--primary)_35%,transparent)]"
          >
            {action.label}
          </Link>
        ) : null}
      </div>
    )
  }

  return (
    <ul className="mt-6 grid gap-4 sm:grid-cols-2">
      {communities.map((community) => (
        <li key={community.outPoint}>
          <article className="flex aspect-[3/4] flex-col rounded-2xl border border-border bg-card p-4 sm:p-5">
            <h2 className="line-clamp-2 font-display text-lg font-semibold sm:text-xl">
              {community.name}
            </h2>
            <p className="mt-2 text-[10px] tracking-[0.18em] text-primary uppercase sm:text-xs">
              {modelLabel(community)}
            </p>
            {community.description ? (
              <p className="mt-4 text-sm text-muted-foreground">
                {previewCommunityDescription(community.description)}
              </p>
            ) : null}
            <p className="mt-auto pt-4 text-sm text-muted-foreground">{feeLabel(community)} CKB</p>
          </article>
        </li>
      ))}
    </ul>
  )
}
