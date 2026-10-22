"use client"

import { useState } from "react"

export function useDidAction(onComplete?: (txHash: string) => void) {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [txHash, setTxHash] = useState<string | null>(null)

  async function run(action: () => Promise<string>) {
    setPending(true)
    setError(null)
    try {
      const hash = await action()
      setTxHash(hash)
      onComplete?.(hash)
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "")
    } finally {
      setPending(false)
    }
  }

  return { pending, error, txHash, run }
}
