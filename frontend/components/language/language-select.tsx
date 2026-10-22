"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useLanguage } from "@/components/language/language-provider"
import { isLocale, type Locale } from "@/lib/i18n/messages"
import { cn } from "cn"

export function LanguageSelect({ className }: { className?: string }) {
  const { locale, setLocale, t } = useLanguage()
  const items = [
    { value: "en" as const, label: t.language.english },
    { value: "zh" as const, label: t.language.chinese },
  ]

  return (
    <Select<Locale>
      items={items}
      value={locale}
      onValueChange={(value) => {
        if (isLocale(value)) setLocale(value)
      }}
    >
      <SelectTrigger
        aria-label={t.language.label}
        className={cn("w-[7.5rem]", className)}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">{t.language.english}</SelectItem>
        <SelectItem value="zh">{t.language.chinese}</SelectItem>
      </SelectContent>
    </Select>
  )
}
