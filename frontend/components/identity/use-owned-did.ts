"use client"

import { useCallback, useEffect, useState } from "react"
import { ccc } from "@ckb-ccc/connector-react"
import { listOwnedDids, type OwnedDid } from "@/lib/ckb/read-did"

export function useOwnedDid() {
  const signer = ccc.useSigner()
  const [records, setRecords] = useState<OwnedDid[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    if (!signer) return
    try {
      setRecords(await listOwnedDids(signer))
      setError(null)
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "")
    }
  }, [signer])

  useEffect(() => {
    if (!signer) return
    let cancelled = false
    listOwnedDids(signer).then(
      (next) => {
        if (cancelled) return
        setRecords(next)
        setError(null)
      },
      (caught: unknown) => {
        if (cancelled) return
        setError(caught instanceof Error ? caught.message : "")
        setRecords([])
      },
    )
    return () => {
      cancelled = true
    }
  }, [signer])

  return {
    signer,
    records: signer ? records : [],
    loading: signer !== undefined && records === null,
    error,
    refresh,
  }
}
