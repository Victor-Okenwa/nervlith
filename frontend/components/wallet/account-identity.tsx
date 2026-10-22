"use client"

import { useConnectWalletDid } from "ckb-connect-wallet-kit"
import { useLanguage } from "@/components/language/language-provider"
import { CopyText } from "@/components/wallet/copy-text"
import { WalletMark } from "@/components/wallet/wallet-mark"

export function AccountIdentity() {
  const { did, isLoading } = useConnectWalletDid()
  const { t } = useLanguage()

  if (isLoading) {
    return <div className="h-8" />
  }

  if (!did) {
    return <p className="text-sm text-muted-foreground">{t.wallet.didNotFound}</p>
  }

  return (
    <div className="flex min-w-0 items-center gap-3">
      <WalletMark className="size-10 shrink-0" />
      <CopyText
        value={did.did}
        label={t.wallet.copyDid}
        copiedLabel={t.wallet.copied}
        front={18}
        end={6}
      />
    </div>
  )
}
