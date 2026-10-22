"use client"

import { cn } from "cn"
import { useLanguage } from "@/components/language/language-provider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  GOVERNANCE_MODELS,
  gateFeeOk,
  governanceLive,
  type GovernanceModel,
} from "@/lib/ckb/community-data"

export function LaunchTerms({
  fee,
  model,
  onFee,
  onModel,
}: {
  fee: string
  model: GovernanceModel
  onFee: (fee: string) => void
  onModel: (model: GovernanceModel) => void
}) {
  const { t } = useLanguage()
  const invalid = fee.trim().length > 0 && !gateFeeOk(fee)

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="community-fee">{t.launch.feeLabel}</Label>
        <Input
          id="community-fee"
          inputMode="decimal"
          value={fee}
          aria-invalid={invalid}
          onChange={(event) => onFee(event.target.value)}
        />
        <p className={invalid ? "text-xs text-destructive" : "text-xs text-muted-foreground"}>
          {invalid ? t.launch.feeInvalid : t.launch.feeHint}
        </p>
      </div>
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium">{t.launch.modelLabel}</legend>
        <p className="text-xs text-muted-foreground">{t.launch.modelHint}</p>
        <div className="grid gap-2">
          {GOVERNANCE_MODELS.map((item) => {
            const live = governanceLive(item)
            return (
              <button
                key={item}
                type="button"
                disabled={!live}
                aria-pressed={model === item}
                onClick={() => onModel(item)}
                className={cn(
                  "rounded-2xl border px-3 py-3 text-left disabled:cursor-not-allowed disabled:opacity-50",
                  model === item
                    ? "border-primary text-foreground"
                    : "border-border text-muted-foreground",
                )}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium">{t.launch.models[item]}</span>
                  {live ? null : (
                    <span className="text-[10px] tracking-[0.16em] uppercase">{t.launch.modelLater}</span>
                  )}
                </span>
                <span className="mt-1 block text-xs">{t.launch.modelNotes[item]}</span>
              </button>
            )
          })}
        </div>
      </fieldset>
    </div>
  )
}
