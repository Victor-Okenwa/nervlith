"use client"

import { LaunchWizard } from "@/components/dao/launch-wizard"
import { useLanguage } from "@/components/language/language-provider"

export function LaunchHome() {
  const { t } = useLanguage()

  return (
    <div className="space-y-8">
      <header className="max-w-2xl">
        <p className="font-display text-xs tracking-[0.24em] text-primary uppercase">
          {t.launch.eyebrow}
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold">{t.launch.title}</h1>
        <p className="mt-3 text-muted-foreground">{t.launch.lead}</p>
      </header>
      <LaunchWizard />
    </div>
  )
}
