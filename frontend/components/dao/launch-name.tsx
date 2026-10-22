"use client"

import { useLanguage } from "@/components/language/language-provider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { COMMUNITY_NAME_MAX, communityNameOk } from "@/lib/ckb/community-data"

export function LaunchName({
  name,
  onChange,
}: {
  name: string
  onChange: (name: string) => void
}) {
  const { t } = useLanguage()
  const invalid = name.trim().length > 0 && !communityNameOk(name)

  return (
    <div className="space-y-2">
      <Label htmlFor="community-name">{t.launch.nameLabel}</Label>
      <Input
        id="community-name"
        value={name}
        maxLength={COMMUNITY_NAME_MAX}
        aria-invalid={invalid}
        onChange={(event) => onChange(event.target.value)}
      />
      <p className={invalid ? "text-xs text-destructive" : "text-xs text-muted-foreground"}>
        {invalid ? t.launch.nameInvalid : t.launch.nameHint}
      </p>
    </div>
  )
}
