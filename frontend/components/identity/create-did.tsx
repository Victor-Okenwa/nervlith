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
import { createDid } from "@/lib/ckb/create-did"

const actionClass =
  "shadow-[0_0_24px_color-mix(in_srgb,var(--primary)_35%,transparent)]"

export function CreateDid({ onComplete }: { onComplete: (txHash: string) => void }) {
  const { t } = useLanguage()
  const signer = ccc.useSigner()
  const action = useDidAction(onComplete)
  const [displayName, setDisplayName] = useState("")
  const [bio, setBio] = useState("")
  const [avatar, setAvatar] = useState("")

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (!signer) return
    if (!displayName.trim()) {
      return
    }
    await action.run(async () => {
      const result = await createDid(signer, { displayName, bio, avatar })
      return result.txHash
    })
  }

  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-4 rounded-2xl bg-card p-6">
      <h2 className="font-display text-xl font-semibold">{t.identity.createTitle}</h2>
      <div className="space-y-2">
        <Label htmlFor="create-name">{t.identity.displayName}</Label>
        <Input
          id="create-name"
          value={displayName}
          onChange={(event) => setDisplayName(event.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="create-bio">{t.identity.bio}</Label>
        <Textarea
          id="create-bio"
          value={bio}
          onChange={(event) => setBio(event.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="create-avatar">{t.identity.avatar}</Label>
        <Input
          id="create-avatar"
          value={avatar}
          onChange={(event) => setAvatar(event.target.value)}
          placeholder="https://"
        />
        <p className="text-xs text-muted-foreground">{t.identity.avatarHint}</p>
      </div>
      {action.error ? (
        <p className="text-sm text-destructive">{action.error || t.identity.failed}</p>
      ) : null}
      <TxNotice label={t.identity.sent} txHash={action.txHash} />
      <Button type="submit" className={actionClass} disabled={action.pending || !signer}>
        {action.pending ? t.identity.pending : t.identity.create}
      </Button>
    </form>
  )
}
