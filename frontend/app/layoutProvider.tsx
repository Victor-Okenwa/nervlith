"use client"

import type { ReactNode } from "react"
import { LayoutProvider as CkbLayoutProvider } from "ckb-connect-wallet-kit"

export function LayoutProvider({ children }: { children: ReactNode }) {
  const network =
    process.env.NEXT_PUBLIC_IS_MAINNET === "true" ? "mainnet" : "testnet"

  return <CkbLayoutProvider network={network}>{children}</CkbLayoutProvider>
}
