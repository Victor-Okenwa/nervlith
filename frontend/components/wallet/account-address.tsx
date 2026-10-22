"use client"

import { useConnectWallet } from "ckb-connect-wallet-kit"
import { useLanguage } from "@/components/language/language-provider"
import { CopyText } from "@/components/wallet/copy-text"

export function AccountAddress() {
  const { address } = useConnectWallet()
  const { t } = useLanguage()

  if (!address) return null

  return (
    <div className="flex min-w-0 flex-col gap-1">
      <span className="text-xs text-muted-foreground">{t.wallet.address}</span>
      <CopyText
        value={address}
        label={t.wallet.copyAddress}
        copiedLabel={t.wallet.copied}
      />
    </div>
  )
}
