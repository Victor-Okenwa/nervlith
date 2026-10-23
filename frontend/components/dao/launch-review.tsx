"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ccc } from "@ckb-ccc/connector-react"
import { useLanguage } from "@/components/language/language-provider"
import { MembershipCard } from "@/components/membership/membership-card"
import { Button } from "@/components/ui/button"
import {
  CommunityScriptUnavailable,
  communityScriptReady,
  createCommunity,
} from "@/lib/ckb/create-community"
import {
  communityDescriptionOk,
  formatGateFeeCkb,
  parseGateFeeShannons,
  type CommunityDraft,
} from "@/lib/ckb/community-data"

const actionClass =
  "shadow-[0_0_24px_color-mix(in_srgb,var(--primary)_35%,transparent)]"

export function LaunchReview({ draft }: { draft: CommunityDraft }) {
  const { t } = useLanguage()
  const router = useRouter()
  const signer = ccc.useSigner()
  const ready = communityScriptReady()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<"script" | "failed" | null>(null)
  const fee = parseGateFeeShannons(draft.gateFeeCkb)

  async function onLaunch() {
    if (!signer || pending) return
    setPending(true)
    setError(null)
    try {
      await createCommunity(signer, draft)
      router.push("/communities?tab=created")
    } catch (caught) {
      setError(caught instanceof CommunityScriptUnavailable ? "script" : "failed")
      setPending(false)
    }
  }

  return (
    <div className="space-y-5">
      <h2 className="font-display text-xl font-semibold">{t.launch.reviewTitle}</h2>
      <MembershipCard
        className="max-w-sm"
        name={draft.name.trim()}
        fee={fee === null ? "—" : formatGateFeeCkb(fee)}
        model={t.launch.models[draft.model]}
        pattern={draft.pattern}
        art={draft.art}
        holographic={draft.holographic}
      />
      <dl className="max-w-sm space-y-2 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">{t.launch.nameLabel}</dt>
          <dd className="truncate">{draft.name.trim()}</dd>
        </div>
        {draft.description.trim() ? (
          <div className="space-y-1">
            <dt className="text-muted-foreground">{t.launch.descriptionLabel}</dt>
            <dd className="whitespace-pre-wrap">{draft.description.trim()}</dd>
          </div>
        ) : null}
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">{t.launch.feeLabel}</dt>
          <dd>{fee === null ? "—" : `${formatGateFeeCkb(fee)} CKB`}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">{t.launch.modelLabel}</dt>
          <dd>{t.launch.models[draft.model]}</dd>
        </div>
      </dl>
      {ready ? null : <p className="text-sm text-muted-foreground">{t.launch.scriptPending}</p>}
      {error === "script" ? <p className="text-sm text-destructive">{t.launch.scriptPending}</p> : null}
      {error === "failed" ? <p className="text-sm text-destructive">{t.launch.failed}</p> : null}
      <Button
        type="button"
        className={actionClass}
        disabled={
          !ready || pending || !signer || fee === null || !communityDescriptionOk(draft.description)
        }
        onClick={() => {
          void onLaunch()
        }}
      >
        {pending ? t.launch.pending : t.launch.launchAction}
      </Button>
    </div>
  )
}
