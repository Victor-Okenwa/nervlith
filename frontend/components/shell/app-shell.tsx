"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"
import ConnectWallet from "@/components/ConnectWallet"
import { Logo } from "@/components/brand/logo"
import { LanguageSelect } from "@/components/language/language-select"
import { useLanguage } from "@/components/language/language-provider"
import { cn } from "cn"

const links = [
  { href: "/dashboard", key: "dashboard" },
  { href: "/communities", key: "communities" },
  { href: "/identity", key: "identity" },
] as const

export function AppShell({ children }: { children: ReactNode }) {
  const { t } = useLanguage()
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <Logo className="h-7" />
            <span className="font-display text-sm font-semibold tracking-wide">
              Nervlith
            </span>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-foreground",
                  (pathname === link.href ||
                    (link.href === "/dashboard" && pathname === "/"))
                    ? "text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {t.shell[link.key]}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <LanguageSelect />
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
