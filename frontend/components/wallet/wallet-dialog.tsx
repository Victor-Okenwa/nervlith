"use client"

import {
  ConnectWalletAddress,
  ConnectWalletBalance,
  ConnectWalletDialog,
  ConnectWalletDialogAccount,
  ConnectWalletDialogAccountFooter,
  ConnectWalletDialogAccountHeader,
  ConnectWalletDialogClose,
  ConnectWalletDialogConnecting,
  ConnectWalletDialogOverlay,
  ConnectWalletDialogSigners,
  ConnectWalletDialogWalletList,
  ConnectWalletDialogWallets,
  ConnectWalletDialogWalletsFooter,
  ConnectWalletDialogWalletsHeader,
  ConnectWalletDialogWalletsRefresh,
  ConnectWalletDid,
  ConnectWalletDidAvatar,
  ConnectWalletDidName,
  ConnectWalletDisconnect,
  ConnectWalletImage,
  ConnectWalletName,
  ConnectWalletSwitchNetwork,
} from "ckb-connect-wallet-kit"
import { X } from "lucide-react"
import { useLanguage } from "@/components/language/language-provider"

function CloseButton({ label }: { label: string }) {
  return (
    <ConnectWalletDialogClose label={label}>
      <X className="size-4" />
    </ConnectWalletDialogClose>
  )
}

export function WalletDialog() {
  const { t } = useLanguage()

  return (
    <ConnectWalletDialog>
      <ConnectWalletDialogOverlay label={t.wallet.dialog}>
        <ConnectWalletDialogWallets>
          <ConnectWalletDialogWalletsHeader className="flex items-center justify-between">
            <h2 className="font-display text-base font-semibold">{t.wallet.connect}</h2>
            <CloseButton label={t.wallet.close} />
          </ConnectWalletDialogWalletsHeader>
          <ConnectWalletDialogWalletList show="both" />
          <ConnectWalletDialogWalletsFooter>
            <ConnectWalletDialogWalletsRefresh buttonText={t.wallet.refresh} />
          </ConnectWalletDialogWalletsFooter>
        </ConnectWalletDialogWallets>
        <ConnectWalletDialogSigners />
        <ConnectWalletDialogConnecting />
        <ConnectWalletDialogAccount className="flex flex-col gap-4">
          <ConnectWalletDialogAccountHeader>
            <ConnectWalletDid>
              <span className="flex min-w-0 items-center gap-2">
                <ConnectWalletDidAvatar
                  fallback={<ConnectWalletImage className="size-8 rounded-full" />}
                />
                <span className="flex min-w-0 flex-col">
                  <ConnectWalletDidName fallback={<ConnectWalletName />} />
                  <ConnectWalletAddress className="text-xs font-normal text-muted-foreground" />
                </span>
              </span>
            </ConnectWalletDid>
            <CloseButton label={t.wallet.close} />
          </ConnectWalletDialogAccountHeader>
          <ConnectWalletBalance className="font-display text-2xl" />
          <ConnectWalletDialogAccountFooter>
            <ConnectWalletSwitchNetwork />
            <ConnectWalletDisconnect buttonText={t.wallet.disconnect} />
          </ConnectWalletDialogAccountFooter>
        </ConnectWalletDialogAccount>
      </ConnectWalletDialogOverlay>
    </ConnectWalletDialog>
  )
}
