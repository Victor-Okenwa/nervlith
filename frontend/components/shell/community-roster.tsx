import type { ReactNode } from "react"
import Link from "next/link"
import { MembershipCard } from "@/components/membership/membership-card"
import { cn } from "cn"
import { formatGateFeeCkb } from "@/lib/ckb/community-data"
import type { ListedCommunity } from "@/lib/ckb/read-communities"

export function CommunityRoster({
  communities,
  modelLabel,
  empty,
  hint,
  action,
  prompt,
  row = false,
}: {
  communities: ListedCommunity[]
  modelLabel: (community: ListedCommunity) => string
  empty: string
  hint?: string
  action?: { href: string; label: string }
  prompt?: ReactNode
  row?: boolean
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
    <ul
      className={cn(
        "mt-6 items-start gap-4",
        row
          ? "flex flex-row flex-wrap"
          : "grid grid-cols-[repeat(auto-fill,minmax(20rem,24rem))] justify-start",
      )}
    >
      {communities.map((community) => (
        <li key={community.outPoint} className={row ? "w-[min(100%,22rem)] shrink-0" : undefined}>
          <MembershipCard
            name={community.name}
            description={community.description}
            fee={formatGateFeeCkb(community.gateFeeShannons)}
            model={modelLabel(community)}
            pattern={community.pattern}
            art={community.art}
            holographic={community.holographic}
          />
        </li>
      ))}
    </ul>
  )
}
