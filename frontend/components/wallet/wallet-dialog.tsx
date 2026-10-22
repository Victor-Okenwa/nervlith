"use client"

import {
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
  ConnectWalletDisconnect,
  ConnectWalletImage,
  ConnectWalletName,
} from "ckb-connect-wallet-kit"
import { X } from "lucide-react"
import { useLanguage } from "@/components/language/language-provider"
import { AccountAddress } from "@/components/wallet/account-address"
import { AccountIdentity } from "@/components/wallet/account-identity"

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
            <span className="flex min-w-0 items-center gap-2">
              <ConnectWalletImage className="size-8 shrink-0 rounded-full object-cover" />
              <ConnectWalletName className="truncate font-display text-base font-semibold" />
            </span>
            <CloseButton label={t.wallet.close} />
          </ConnectWalletDialogAccountHeader>
          <ConnectWalletDid>
            <AccountIdentity />
          </ConnectWalletDid>
          <AccountAddress />
          <ConnectWalletBalance className="font-display text-2xl" />
          <ConnectWalletDialogAccountFooter>
            <ConnectWalletDisconnect buttonText={t.wallet.disconnect} />
          </ConnectWalletDialogAccountFooter>
        </ConnectWalletDialogAccount>
      </ConnectWalletDialogOverlay>
    </ConnectWalletDialog>
  )
}
