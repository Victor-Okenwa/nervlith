"use client"

import { cn } from "cn"
import { useLanguage } from "@/components/language/language-provider"
import { CARD_ARTS, type CardArt } from "@/lib/ckb/community-data"

export function CardArtPicker({
  value,
  onChange,
}: {
  value: CardArt
  onChange: (value: CardArt) => void
}) {
  const { t } = useLanguage()

  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium">{t.launch.art}</legend>
      <div className="grid grid-cols-3 gap-2">
        {CARD_ARTS.map((art) => (
          <button
            key={art}
            type="button"
            aria-pressed={value === art}
            onClick={() => onChange(art)}
            className={cn(
              "rounded-2xl border px-3 py-2 text-sm",
              value === art
                ? "border-primary text-foreground"
                : "border-border text-muted-foreground",
            )}
          >
            {t.launch.arts[art]}
          </button>
        ))}
      </div>
    </fieldset>
  )
}
