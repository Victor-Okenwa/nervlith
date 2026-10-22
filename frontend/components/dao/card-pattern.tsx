"use client"

import { cn } from "cn"
import { useLanguage } from "@/components/language/language-provider"
import { CARD_PATTERNS, type CardPattern } from "@/lib/ckb/community-data"

export function CardPatternPicker({
  value,
  onChange,
}: {
  value: CardPattern
  onChange: (value: CardPattern) => void
}) {
  const { t } = useLanguage()

  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium">{t.launch.pattern}</legend>
      <div className="grid grid-cols-2 gap-2">
        {CARD_PATTERNS.map((pattern) => (
          <button
            key={pattern}
            type="button"
            aria-pressed={value === pattern}
            onClick={() => onChange(pattern)}
            className={cn(
              "rounded-2xl border px-3 py-2 text-sm",
              value === pattern
                ? "border-primary text-foreground"
                : "border-border text-muted-foreground",
            )}
          >
            {t.launch.patterns[pattern]}
          </button>
        ))}
      </div>
    </fieldset>
  )
}
