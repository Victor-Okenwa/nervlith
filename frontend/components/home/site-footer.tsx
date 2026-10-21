"use client"

import { Logo } from "@/components/brand/logo"
import { useLanguage } from "@/components/language/language-provider"

export function SiteFooter() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 py-8 sm:flex-row sm:items-center sm:px-6">
        <div className="flex items-center gap-2.5 text-sm">
          <Logo className="h-5" />
          <span className="font-display font-medium">Nervlith</span>
          <span className="text-muted-foreground">{t.footer.formalName}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          {t.footer.tagline}
        </p>
      </div>
    </footer>
  )
}
