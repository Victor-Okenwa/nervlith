"use client"

import { cn } from "cn"
import { useLanguage } from "@/components/language/language-provider"
import { CARD_HOLOS, type CardHolo } from "@/lib/ckb/community-data"

export function CardHolographicPicker({
  value,
  onChange,
}: {
  value: CardHolo
  onChange: (value: CardHolo) => void
}) {
  const { t } = useLanguage()

  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium">{t.launch.holographic}</legend>
      <div className="grid grid-cols-3 gap-2">
        {CARD_HOLOS.map((holo) => (
          <button
            key={holo}
            type="button"
            aria-pressed={value === holo}
            onClick={() => onChange(holo)}
            className={cn(
              "rounded-2xl border px-3 py-2 text-sm",
              value === holo
                ? "border-primary text-foreground"
                : "border-border text-muted-foreground",
            )}
          >
            {t.launch.holos[holo]}
          </button>
        ))}
      </div>
    </fieldset>
  )
}
