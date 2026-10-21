"use client"

import {
  ConnectWalletButton,
  ConnectWalletContainer
} from "ckb-connect-wallet-kit"
import { ConnectedAccount } from "@/components/wallet/connected-account"
import { WalletDialog } from "@/components/wallet/wallet-dialog"

export default function ConnectWallet({
  size = "default",
}: {
  size?: "default" | "lg"
}) {
  const sizing =
    size === "lg"
      ? "h-9 px-4 py-0 text-sm"
      : "h-8 px-3 py-0 text-sm"

  return (
    <ConnectWalletContainer>
      <ConnectWalletButton className={sizing} />
      <ConnectedAccount size={size} />
      <WalletDialog />
    </ConnectWalletContainer>
  )
}
