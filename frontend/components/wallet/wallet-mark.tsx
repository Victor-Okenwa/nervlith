"use client"

import { ConnectWalletDidAvatar, ConnectWalletImage, useConnectWalletDid } from "ckb-connect-wallet-kit"
import { cn } from "cn"

function portraitStyle(did: string) {
  const url = `https://api.dicebear.com/9.x/pixel-art/png?seed=${encodeURIComponent(did)}`.replace(
    /["\\\n\r]/g,
    "",
  )
  return { backgroundImage: `url("${url}")` }
}

export function WalletMark({ className }: { className?: string }) {
  const { did } = useConnectWalletDid()
  const frame = cn("rounded-full object-cover", className)

  if (did?.avatar) {
    return <ConnectWalletDidAvatar className={frame} />
  }

  if (did) {
    return (
      <span aria-hidden className={cn("block bg-cover bg-center", frame)} style={portraitStyle(did.did)} />
    )
  }

  return <ConnectWalletImage className={frame} />
}
