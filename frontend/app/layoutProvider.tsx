"use client"

import type { ReactNode } from "react"
import { ConnectWalletKitProvider } from "ckb-connect-wallet-kit"
import { ccc } from "@ckb-ccc/connector-react"

export function LayoutProvider({ children }: { children: ReactNode }) {
  const network =
    process.env.NEXT_PUBLIC_IS_MAINNET === "true" ? "mainnet" : "testnet";
  const defaultClient = network === "mainnet"
    ? new ccc.ClientPublicMainnet()
    : new ccc.ClientPublicTestnet();

  return <ccc.Provider 
    defaultClient={defaultClient}
    clientOptions={[
      { name: "CKB Testnet", client: new ccc.ClientPublicTestnet() },
      { name: "CKB Mainnet", client: new ccc.ClientPublicMainnet() },
    ]}
  >
    <ConnectWalletKitProvider
      defaults={{
        buttonClassName:
          "rounded-2xl border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-[0_0_24px_color-mix(in_srgb,var(--primary)_35%,transparent)] hover:bg-primary/80 hover:opacity-100 dark:border-transparent dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/80",
        buttonLabel: "Connect Wallet",
        decimalPlaces: 4,
        withCurrency: true,
        didAvatarClassName: "size-5 rounded-full object-cover",
        didNameClassName: "max-w-28 truncate text-xs font-semibold",
        didIdClassName: "max-w-24 truncate text-[10px] font-normal text-muted-foreground",
        didFrontChars: 14,
        didEndChars: 6,
        dialogOverlayClassName:
          "fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 p-4",
        dialogPanelClassName:
          "flex max-h-[min(40rem,calc(100vh-2rem))] w-full max-w-sm flex-col gap-3 overflow-y-auto rounded-2xl border border-border bg-card p-4 text-card-foreground shadow-2xl outline-none dark:border-border dark:bg-card dark:text-card-foreground",
        dialogTitleClassName: "font-display text-base font-semibold",
        dialogListButtonClassName:
          "flex w-full items-center gap-3 rounded-xl border border-border bg-background px-3 py-3 text-left text-sm text-foreground hover:border-primary/50 dark:border-border dark:bg-background dark:text-foreground",
        dialogActionClassName:
          "flex w-full items-center justify-center rounded-xl bg-primary px-3 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/80 dark:bg-primary dark:text-primary-foreground",
        dialogAccountHeaderClassName: "flex items-start justify-between gap-2",
        dialogAccountFooterClassName: "flex flex-col gap-2",
        dialogCloseClassName:
          "rounded-full p-1 text-muted-foreground hover:text-foreground",
        disconnectClassName:
          "flex w-full items-center justify-center rounded-xl border border-border bg-transparent px-3 py-3 text-sm font-medium text-foreground hover:bg-accent dark:bg-transparent dark:text-foreground",
      }}
    >
      {children}
    </ConnectWalletKitProvider>
    
  </ccc.Provider>
}
