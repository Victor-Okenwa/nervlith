"use client"

import ConnectWallet from "@/components/ConnectWallet"
import { useLanguage } from "@/components/language/language-provider"

export function ConnectPrompt() {
  const { t } = useLanguage()

  return (
    <div className="max-w-xl rounded-2xl bg-card p-6">
      <h2 className="font-display text-xl font-semibold">{t.identity.connectTitle}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{t.identity.connectBody}</p>
      <div className="mt-5">
        <ConnectWallet />
      </div>
    </div>
  )
}
