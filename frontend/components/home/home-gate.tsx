"use client"

import { useSyncExternalStore, type ReactNode } from "react"
import { ccc } from "@ckb-ccc/connector-react"

function subscribe() {
  return () => {}
}

export function HomeGate({
  marketing,
  dashboard,
}: {
  marketing: ReactNode
  dashboard: ReactNode
}) {
  const signer = ccc.useSigner()
  const ready = useSyncExternalStore(subscribe, () => true, () => false)

  if (!ready) {
    return <div className="min-h-screen bg-background" />
  }

  return signer ? dashboard : marketing
}
