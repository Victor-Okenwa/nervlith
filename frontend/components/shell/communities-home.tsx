"use client"

import { useLanguage } from "@/components/language/language-provider"

export function CommunitiesHome() {
  const { t } = useLanguage()

  return (
    <div className="max-w-2xl">
      <p className="font-display text-xs tracking-[0.24em] text-primary uppercase">
        {t.shell.communities}
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold">
        {t.shell.communitiesTitle}
      </h1>
      <p className="mt-4 text-muted-foreground">{t.shell.communitiesEmpty}</p>
    </div>
  )
}
