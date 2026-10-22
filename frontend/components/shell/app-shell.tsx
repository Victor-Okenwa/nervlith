"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"
import ConnectWallet from "@/components/ConnectWallet"
import { Logo } from "@/components/brand/logo"
import { LanguageSelect } from "@/components/language/language-select"
import { useLanguage } from "@/components/language/language-provider"
import { MobileNav } from "@/components/shell/mobile-nav"
import { cn } from "cn"

const links = [
  { href: "/dashboard", key: "dashboard" },
  { href: "/communities", key: "communities" },
  { href: "/launch", key: "launch" },
  { href: "/identity", key: "identity" },
] as const

function isCurrent(pathname: string, href: string) {
  return pathname === href || (href === "/dashboard" && pathname === "/")
}

export function AppShell({ children }: { children: ReactNode }) {
  const { t } = useLanguage()
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen flex-col">
      <header
        data-mobile-nav=""
        className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md"
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:px-6">
          <Link href="/" className="flex min-w-0 items-center gap-2.5">
            <Logo className="h-7 shrink-0" />
            <span className="truncate font-display text-sm font-semibold tracking-wide">
              Nervlith
            </span>
          </Link>
          <nav className="mr-auto ml-3 hidden items-center gap-4 text-sm md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-foreground",
                  isCurrent(pathname, link.href)
                    ? "text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {t.shell[link.key]}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex shrink-0 items-center gap-2">
            <div className="hidden md:block">
              <LanguageSelect />
            </div>
            <MobileNav label={t.nav.menu} closeLabel={t.nav.closeMenu}>
              <nav className="flex flex-col text-sm">
                {links.map((link) => {
                  const current = isCurrent(pathname, link.href)
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={current ? "page" : undefined}
                      className={cn(
                        "rounded-xl px-3 py-2.5 transition-colors hover:bg-secondary hover:text-foreground",
                        current
                          ? "bg-secondary text-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      {t.shell[link.key]}
                    </Link>
                  )
                })}
              </nav>
              <div className="border-t border-border/60 pt-3">
                <LanguageSelect className="w-full" />
              </div>
            </MobileNav>
            <ConnectWallet />
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
        {children}
      </main>
    </div>
  )
}
