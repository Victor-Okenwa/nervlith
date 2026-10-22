"use client"

import { useState, type FormEvent } from "react"
import { ccc } from "@ckb-ccc/connector-react"
import { useLanguage } from "@/components/language/language-provider"
import { TxNotice } from "@/components/identity/tx-notice"
import { useDidAction } from "@/components/identity/use-did-action"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { deactivateDid } from "@/lib/ckb/deactivate-did"
import type { OwnedDid } from "@/lib/ckb/read-did"

export function DeactivateDid({
  record,
  onComplete,
}: {
  record: OwnedDid
  onComplete: (txHash: string) => void
}) {
  const { t } = useLanguage()
  const signer = ccc.useSigner()
  const action = useDidAction(onComplete)
  const [confirmed, setConfirmed] = useState(false)

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (!signer || !confirmed) return
    await action.run(() => deactivateDid(signer, record.id))
  }

  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-4 rounded-2xl bg-card p-6">
      <h2 className="font-display text-xl font-semibold">{t.identity.deactivateTitle}</h2>
      <p className="text-sm text-muted-foreground">{t.identity.deactivateBody}</p>
      <Label className="items-start gap-3 text-sm font-normal">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(event) => setConfirmed(event.target.checked)}
          className="mt-0.5 accent-primary"
        />
        {t.identity.deactivateConfirm}
      </Label>
      {action.error ? (
        <p className="text-sm text-destructive">{action.error || t.identity.failed}</p>
      ) : null}
      <TxNotice label={t.identity.sent} txHash={action.txHash} />
      <Button
        type="submit"
        variant="destructive"
        disabled={action.pending || !signer || !confirmed}
      >
        {action.pending ? t.identity.pending : t.identity.deactivate}
      </Button>
    </form>
  )
}
