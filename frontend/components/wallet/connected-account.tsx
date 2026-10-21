"use client"

import {
  ConnectWalletAddress,
  ConnectWalletBalance,
  ConnectWalletDid,
  ConnectWalletDidAvatar,
  ConnectWalletDidId,
  ConnectWalletDidName,
  ConnectWalletImage,
  useConnectWallet,
} from "ckb-connect-wallet-kit"
import { cn } from "cn"

export function ConnectedAccount({ size }: { size: "default" | "lg" }) {
  const { open, wallet } = useConnectWallet()

  if (!wallet) {
    return null
  }

  return (
    <button
      type="button"
      onClick={() => open()}
      className={cn(
        "flex items-center gap-2 rounded-2xl border border-border bg-secondary py-1 pr-3 font-medium text-secondary-foreground hover:border-primary/40 dark:bg-secondary dark:text-secondary-foreground",
        size === "lg" ? "min-h-9 px-3" : "min-h-8 px-2"
      )}
    >
      <ConnectWalletDid>
        <ConnectWalletDidAvatar
          fallback={<ConnectWalletImage className="size-5 rounded-full" />}
        />
        <span className="flex min-w-0 flex-col items-start leading-tight">
          <ConnectWalletDidName
            fallback={
              <ConnectWalletAddress
                frontChars={10}
                endChars={6}
                className="text-xs font-semibold"
              />
            }
          />
          <span className="flex items-center gap-1.5">
            <ConnectWalletBalance className="text-[10px] font-normal text-muted-foreground" />
            <ConnectWalletDidId />
          </span>
        </span>
      </ConnectWalletDid>
    </button>
  )
}
