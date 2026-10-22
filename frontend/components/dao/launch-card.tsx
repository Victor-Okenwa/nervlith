"use client"

import { useLanguage } from "@/components/language/language-provider"
import { CardArtPicker } from "@/components/dao/card-art"
import { CardHolographicPicker } from "@/components/dao/card-holographic"
import { CardPatternPicker } from "@/components/dao/card-pattern"
import { MembershipCard } from "@/components/membership/membership-card"
import { formatGateFeeCkb, parseGateFeeShannons, type CommunityDraft } from "@/lib/ckb/community-data"

export function LaunchCard({
  draft,
  onChange,
}: {
  draft: CommunityDraft
  onChange: (patch: Partial<CommunityDraft>) => void
}) {
  const { t } = useLanguage()
  const fee = parseGateFeeShannons(draft.gateFeeCkb)

  return (
    <div className="grid items-start gap-6 md:grid-cols-[16rem_minmax(0,1fr)]">
      <MembershipCard
        name={draft.name.trim()}
        fee={fee === null ? "—" : formatGateFeeCkb(fee)}
        model={t.launch.models[draft.model]}
        pattern={draft.pattern}
        art={draft.art}
        holographic={draft.holographic}
      />
      <div className="space-y-5">
        <CardPatternPicker value={draft.pattern} onChange={(pattern) => onChange({ pattern })} />
        <CardArtPicker value={draft.art} onChange={(art) => onChange({ art })} />
        <CardHolographicPicker
          value={draft.holographic}
          onChange={(holographic) => onChange({ holographic })}
        />
      </div>
    </div>
  )
}
