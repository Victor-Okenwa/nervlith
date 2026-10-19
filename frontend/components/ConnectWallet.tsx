"use client"

import {
  ConnectWallet as CkbConnectWallet,
  ConnectWalletButton,
  ConnectWalletInfoAddress,
  ConnectWalletInfoBalance,
  ConnectWalletInfoContainer,
  ConnectWalletInfoImage,
} from "ckb-connect-wallet-kit"
import { cn } from "cn"

const buttonSurface =
  "rounded-2xl border border-transparent bg-primary font-medium text-primary-foreground shadow-[0_0_24px_color-mix(in_srgb,var(--primary)_35%,transparent)] hover:bg-primary/80 hover:opacity-100 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/80"

export default function ConnectWallet({
  size = "default",
}: {
  size?: "default" | "lg"
}) {
  const sizing =
    size === "lg"
      ? "h-9 px-4 py-0 text-sm sm:text-sm"
      : "h-8 px-3 py-0 text-sm sm:text-sm"

  return (
    <CkbConnectWallet>
      <ConnectWalletButton className={cn(buttonSurface, sizing)} />
      <ConnectWalletInfoContainer
        className={cn(
          "flex items-center gap-2 rounded-2xl border border-border bg-secondary font-medium text-secondary-foreground hover:opacity-100 dark:bg-secondary dark:text-secondary-foreground",
          sizing,
          "pr-3"
        )}
      >
        <ConnectWalletInfoImage className="size-5 rounded-full" />
        <span className="flex flex-col items-start leading-tight">
          <ConnectWalletInfoBalance
            decimalPlaces={4}
            withCurrency
            className="text-xs font-semibold"
          />
          <ConnectWalletInfoAddress
            frontChars={10}
            endChars={6}
            className="text-[10px] font-normal text-muted-foreground"
          />
        </span>
      </ConnectWalletInfoContainer>
    </CkbConnectWallet>
  )
}
