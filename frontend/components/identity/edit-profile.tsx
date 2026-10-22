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
import { updateProfile } from "@/lib/ckb/update-profile"
import type { OwnedDid } from "@/lib/ckb/read-did"

const actionClass =
  "shadow-[0_0_24px_color-mix(in_srgb,var(--primary)_35%,transparent)]"

export function EditProfile({
  record,
  onComplete,
}: {
  record: OwnedDid
  onComplete: (txHash: string) => void
}) {
  const { t } = useLanguage()
  const signer = ccc.useSigner()
  const action = useDidAction(onComplete)
  const [displayName, setDisplayName] = useState(record.profile?.displayName ?? "")
  const [bio, setBio] = useState(record.profile?.bio ?? "")
  const [avatar, setAvatar] = useState(record.profile?.avatar ?? "")

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (!signer || !displayName.trim()) return
    await action.run(() =>
      updateProfile(signer, record.did, { displayName, bio, avatar }),
    )
  }

  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-4 rounded-2xl bg-card p-6">
      <h2 className="font-display text-xl font-semibold">{t.identity.profileTitle}</h2>
      <div className="space-y-2">
        <Label htmlFor="profile-name">{t.identity.displayName}</Label>
        <Input
          id="profile-name"
          value={displayName}
          onChange={(event) => setDisplayName(event.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="profile-bio">{t.identity.bio}</Label>
        <Textarea
          id="profile-bio"
          value={bio}
          onChange={(event) => setBio(event.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="profile-avatar">{t.identity.avatar}</Label>
        <Input
          id="profile-avatar"
          value={avatar}
          onChange={(event) => setAvatar(event.target.value)}
        />
      </div>
      {action.error ? (
        <p className="text-sm text-destructive">{action.error || t.identity.failed}</p>
      ) : null}
      <TxNotice label={t.identity.sent} txHash={action.txHash} />
      <Button type="submit" className={actionClass} disabled={action.pending || !signer}>
        {action.pending ? t.identity.pending : t.identity.saveProfile}
      </Button>
    </form>
  )
}
