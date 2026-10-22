"use client"

import ConnectWallet from "@/components/ConnectWallet"
import { Logo } from "@/components/brand/logo"
import { LanguageSelect } from "@/components/language/language-select"
import { useLanguage } from "@/components/language/language-provider"
import { MobileNav } from "@/components/shell/mobile-nav"

export function SiteHeader() {
  const { t } = useLanguage()
  const links = [
    { href: "#problem", label: t.nav.problem },
    { href: "#protocol", label: t.nav.protocol },
    { href: "#integrations", label: t.nav.stack },
    { href: "#builders", label: t.nav.builders },
  ]

  return (
    <header
      data-mobile-nav=""
      className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <a href="#top" className="flex min-w-0 items-center gap-2.5">
          <Logo className="h-7 shrink-0" />
          <span className="truncate font-display text-sm font-semibold tracking-wide">
            Nervlith
          </span>
        </a>
        <nav className="mr-auto ml-3 hidden items-center gap-5 text-sm text-muted-foreground md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <div className="hidden md:block">
            <LanguageSelect />
          </div>
          <MobileNav label={t.nav.menu} closeLabel={t.nav.closeMenu}>
            <nav className="flex flex-col text-sm">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-3 py-2.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="border-t border-border/60 pt-3">
              <LanguageSelect className="w-full" />
            </div>
          </MobileNav>
          <ConnectWallet />
        </div>
      </div>
    </header>
  )
}
