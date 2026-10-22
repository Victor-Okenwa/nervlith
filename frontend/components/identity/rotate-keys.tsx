"use client"

import { useState, type FormEvent } from "react"
import { ccc } from "@ckb-ccc/connector-react"
import { useLanguage } from "@/components/language/language-provider"
import { TxNotice } from "@/components/identity/tx-notice"
import { useDidAction } from "@/components/identity/use-did-action"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { rotateDid } from "@/lib/ckb/rotate-did"
import type { OwnedDid } from "@/lib/ckb/read-did"

const actionClass =
  "shadow-[0_0_24px_color-mix(in_srgb,var(--primary)_35%,transparent)]"

export function RotateKeys({
  record,
  onComplete,
}: {
  record: OwnedDid
  onComplete: (txHash: string) => void
}) {
  const { t } = useLanguage()
  const signer = ccc.useSigner()
  const action = useDidAction(onComplete)
  const [address, setAddress] = useState("")

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (!signer) return
    await action.run(() => rotateDid(signer, record.id, address.trim()))
  }

  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-4 rounded-2xl bg-card p-6">
      <h2 className="font-display text-xl font-semibold">{t.identity.rotateTitle}</h2>
      <p className="text-sm text-muted-foreground">{t.identity.rotateBody}</p>
      <div className="space-y-2">
        <Label htmlFor="rotate-address">{t.identity.address}</Label>
        <Input
          id="rotate-address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          required
        />
      </div>
      {action.error ? (
        <p className="text-sm text-destructive">{action.error || t.identity.failed}</p>
      ) : null}
      <TxNotice label={t.identity.sent} txHash={action.txHash} />
      <Button type="submit" className={actionClass} disabled={action.pending || !signer}>
        {action.pending ? t.identity.pending : t.identity.rotate}
      </Button>
    </form>
  )
}
