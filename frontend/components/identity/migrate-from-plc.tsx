"use client"

import { useState, type FormEvent } from "react"
import { ccc } from "@ckb-ccc/connector-react"
import { useLanguage } from "@/components/language/language-provider"
import { TxNotice } from "@/components/identity/tx-notice"
import { useDidAction } from "@/components/identity/use-did-action"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { migrateDid } from "@/lib/ckb/migrate-did"

const actionClass =
  "shadow-[0_0_24px_color-mix(in_srgb,var(--primary)_35%,transparent)]"

export function MigrateFromPlc({
  onComplete,
}: {
  onComplete: (txHash: string) => void
}) {
  const { t } = useLanguage()
  const signer = ccc.useSigner()
  const action = useDidAction(onComplete)
  const [sourceDid, setSourceDid] = useState("")
  const [rotationKey, setRotationKey] = useState("")
  const [keyIndex, setKeyIndex] = useState("0")
  const [displayName, setDisplayName] = useState("")
  const [bio, setBio] = useState("")

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (!signer || !displayName.trim()) return
    const index = Number(keyIndex)
    await action.run(async () => {
      const result = await migrateDid(signer, sourceDid.trim(), rotationKey.trim(), index, {
        displayName,
        bio,
        avatar: "",
      })
      setRotationKey("")
      return result.txHash
    })
  }

  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-4 rounded-2xl bg-card p-6">
      <h2 className="font-display text-xl font-semibold">{t.identity.migrateTitle}</h2>
      <p className="text-sm text-muted-foreground">{t.identity.migrateBody}</p>
      <div className="space-y-2">
        <Label htmlFor="migrate-source">{t.identity.sourceDid}</Label>
        <Input
          id="migrate-source"
          value={sourceDid}
          onChange={(event) => setSourceDid(event.target.value)}
          placeholder="did:plc:…"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="migrate-key">{t.identity.rotationKey}</Label>
        <Input
          id="migrate-key"
          type="password"
          value={rotationKey}
          autoComplete="off"
          onChange={(event) => setRotationKey(event.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="migrate-index">{t.identity.keyIndex}</Label>
        <Input
          id="migrate-index"
          inputMode="numeric"
          value={keyIndex}
          onChange={(event) => setKeyIndex(event.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="migrate-name">{t.identity.displayName}</Label>
        <Input
          id="migrate-name"
          value={displayName}
          onChange={(event) => setDisplayName(event.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="migrate-bio">{t.identity.bio}</Label>
        <Textarea
          id="migrate-bio"
          value={bio}
          onChange={(event) => setBio(event.target.value)}
        />
      </div>
      {action.error ? (
        <p className="text-sm text-destructive">{action.error || t.identity.failed}</p>
      ) : null}
      <TxNotice label={t.identity.sent} txHash={action.txHash} />
      <Button type="submit" className={actionClass} disabled={action.pending || !signer}>
        {action.pending ? t.identity.pending : t.identity.migrate}
      </Button>
    </form>
  )
}
