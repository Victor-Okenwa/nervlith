"use client"

import { useState } from "react"
import Link from "next/link"
import { ccc } from "@ckb-ccc/connector-react"
import { useLanguage } from "@/components/language/language-provider"
import { LaunchCard } from "@/components/dao/launch-card"
import { LaunchDescription } from "@/components/dao/launch-description"
import { LaunchName } from "@/components/dao/launch-name"
import { LaunchReview } from "@/components/dao/launch-review"
import { LaunchTerms } from "@/components/dao/launch-terms"
import { ConnectPrompt } from "@/components/identity/connect-prompt"
import { useOwnedDid } from "@/components/identity/use-owned-did"
import { Button } from "@/components/ui/button"
import { cn } from "cn"
import {
  communityDescriptionOk,
  communityNameOk,
  gateFeeOk,
  type CommunityDraft,
} from "@/lib/ckb/community-data"

const steps = 4

export function LaunchWizard() {
  const { t } = useLanguage()
  const signer = ccc.useSigner()
  const owned = useOwnedDid()
  const [step, setStep] = useState(0)
  const [draft, setDraft] = useState<CommunityDraft>({
    name: "",
    description: "",
    gateFeeCkb: "200",
    model: "autocracy",
    pattern: "signal",
    art: "ember",
    holographic: "sheen",
  })

  const canContinue =
    (step === 0 && communityNameOk(draft.name) && communityDescriptionOk(draft.description)) ||
    (step === 1 && gateFeeOk(draft.gateFeeCkb)) ||
    step === 2

  if (!signer) return <ConnectPrompt />
  if (owned.loading) {
    return <p className="text-sm text-muted-foreground">{t.identity.loading}</p>
  }
  if (!owned.records || owned.records.length === 0) {
    return (
      <div className="max-w-xl rounded-2xl bg-card p-6">
        <h2 className="font-display text-xl font-semibold">{t.launch.needDidTitle}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t.launch.needDidBody}</p>
        <Link href="/identity" className="mt-5 inline-block text-sm text-primary">
          {t.launch.needDidAction}
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl space-y-6">
      <ol className="flex flex-wrap gap-2 text-xs tracking-wide uppercase">
        {t.launch.steps.map((label, index) => (
          <li
            key={label}
            className={cn(
              "rounded-full border px-3 py-1",
              index === step
                ? "border-primary text-foreground"
                : "border-border text-muted-foreground",
            )}
          >
            {label}
          </li>
        ))}
      </ol>
      {step === 0 ? (
        <div className="max-w-xl space-y-5">
          <LaunchName name={draft.name} onChange={(name) => setDraft({ ...draft, name })} />
          <LaunchDescription
            description={draft.description}
            onChange={(description) => setDraft({ ...draft, description })}
          />
        </div>
      ) : null}
      {step === 1 ? (
        <LaunchTerms
          fee={draft.gateFeeCkb}
          model={draft.model}
          onFee={(gateFeeCkb) => setDraft({ ...draft, gateFeeCkb })}
          onModel={(model) => setDraft({ ...draft, model })}
        />
      ) : null}
      {step === 2 ? (
        <LaunchCard draft={draft} onChange={(patch) => setDraft({ ...draft, ...patch })} />
      ) : null}
      {step === 3 ? <LaunchReview draft={draft} /> : null}
      <div className="flex gap-2">
        {step > 0 ? (
          <Button type="button" variant="outline" onClick={() => setStep((value) => value - 1)}>
            {t.launch.back}
          </Button>
        ) : null}
        {step < steps - 1 ? (
          <Button type="button" disabled={!canContinue} onClick={() => setStep((value) => value + 1)}>
            {t.launch.continue}
          </Button>
        ) : null}
      </div>
    </div>
  )
}
