"use client"

import { ConnectWalletDid, useConnectWallet } from "ckb-connect-wallet-kit"
import { cn } from "cn"
import { useLanguage } from "@/components/language/language-provider"
import { WalletMark } from "@/components/wallet/wallet-mark"

export function ConnectedAccount({ size }: { size: "default" | "lg" }) {
  const { open, wallet } = useConnectWallet()
  const { t } = useLanguage()

  if (!wallet) {
    return null
  }

  const mark = size === "lg" ? "size-9" : "size-8"

  return (
    <button
      type="button"
      onClick={() => open()}
      aria-label={t.wallet.dialog}
      className={cn(
        "flex items-center justify-center overflow-hidden rounded-full border border-border bg-secondary hover:border-primary/40",
        mark,
      )}
    >
      <ConnectWalletDid>
        <WalletMark className={mark} />
      </ConnectWalletDid>
    </button>
  )
}
