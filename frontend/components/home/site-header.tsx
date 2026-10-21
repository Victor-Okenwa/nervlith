"use client"

import ConnectWallet from "@/components/ConnectWallet"
import { Logo } from "@/components/brand/logo"
import { LanguageSelect } from "@/components/language/language-select"
import { useLanguage } from "@/components/language/language-provider"

export function SiteHeader() {
  const { t } = useLanguage()
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <Logo className="h-7" />
          <span className="font-display text-sm font-semibold tracking-wide">
            Nervlith
          </span>
        </a>
        <nav className="mr-auto ml-6 hidden items-center gap-5 text-sm text-muted-foreground sm:flex">
          <a href="#problem" className="transition-colors hover:text-foreground">
            {t.nav.problem}
          </a>
          <a href="#protocol" className="transition-colors hover:text-foreground">
            {t.nav.protocol}
          </a>
          <a href="#integrations" className="transition-colors hover:text-foreground">
            {t.nav.stack}
          </a>
          <a href="#builders" className="transition-colors hover:text-foreground">
            {t.nav.builders}
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSelect />
          <ConnectWallet />
        </div>
      </div>
    </header>
  )
}
