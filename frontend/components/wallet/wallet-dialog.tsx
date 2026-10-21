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

function CloseButton() {
  return (
    <ConnectWalletDialogClose label="Close">
      <X className="size-4" />
    </ConnectWalletDialogClose>
  )
}

export function WalletDialog() {
  return (
    <ConnectWalletDialog>
      <ConnectWalletDialogOverlay label="Wallet">
        <ConnectWalletDialogWallets>
          <ConnectWalletDialogWalletsHeader className="flex items-center justify-between">
            <h2 className="font-display text-base font-semibold">Connect Wallet</h2>
            <CloseButton />
          </ConnectWalletDialogWalletsHeader>
          <ConnectWalletDialogWalletList show="both" />
          <ConnectWalletDialogWalletsFooter>
            <ConnectWalletDialogWalletsRefresh buttonText="Refresh wallets" />
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
            <CloseButton />
          </ConnectWalletDialogAccountHeader>
          <ConnectWalletBalance className="font-display text-2xl" />
          <ConnectWalletDialogAccountFooter>
            <ConnectWalletSwitchNetwork />
            <ConnectWalletDisconnect buttonText="Disconnect" />
          </ConnectWalletDialogAccountFooter>
        </ConnectWalletDialogAccount>
      </ConnectWalletDialogOverlay>
    </ConnectWalletDialog>
  )
}
