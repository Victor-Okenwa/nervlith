"use client"

import { useLanguage } from "@/components/language/language-provider"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { COMMUNITY_DESCRIPTION_MAX, communityDescriptionOk } from "@/lib/ckb/community-data"

export function LaunchDescription({
  description,
  onChange,
}: {
  description: string
  onChange: (description: string) => void
}) {
  const { t } = useLanguage()
  const invalid = description.trim().length > 0 && !communityDescriptionOk(description)

  return (
    <div className="space-y-2">
      <Label htmlFor="community-description">{t.launch.descriptionLabel}</Label>
      <Textarea
        id="community-description"
        value={description}
        maxLength={COMMUNITY_DESCRIPTION_MAX}
        rows={4}
        aria-invalid={invalid}
        onChange={(event) => onChange(event.target.value)}
      />
      <p className={invalid ? "text-xs text-destructive" : "text-xs text-muted-foreground"}>
        {invalid ? t.launch.descriptionInvalid : t.launch.descriptionHint}
      </p>
    </div>
  )
}
