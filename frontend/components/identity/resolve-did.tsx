"use client"

import { useState, type FormEvent } from "react"
import { ccc } from "@ckb-ccc/connector-react"
import { useLanguage } from "@/components/language/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { resolveDid, type OwnedDid } from "@/lib/ckb/read-did"

export function ResolveDid() {
  const { t } = useLanguage()
  const signer = ccc.useSigner()
  const [did, setDid] = useState("")
  const [record, setRecord] = useState<OwnedDid | null>(null)
  const [missing, setMissing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    const client = signer?.client
    if (!client) return
    setPending(true)
    setError(null)
    setMissing(false)
    setRecord(null)
    try {
      const found = await resolveDid(client, did.trim())
      if (!found) setMissing(true)
      else setRecord(found)
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : t.identity.failed)
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-4 rounded-2xl bg-card p-6">
      <h2 className="font-display text-xl font-semibold">{t.identity.resolveTitle}</h2>
      <div className="space-y-2">
        <Label htmlFor="resolve-did">DID:CKB</Label>
        <Input
          id="resolve-did"
          value={did}
          onChange={(event) => setDid(event.target.value)}
          placeholder={t.identity.resolvePlaceholder}
          required
        />
      </div>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      {missing ? <p className="text-sm text-muted-foreground">{t.identity.notFound}</p> : null}
      {record ? (
        <div className="space-y-1 text-sm">
          <p className="font-medium">{record.profile?.displayName || record.did}</p>
          <p className="break-all text-muted-foreground">{record.did}</p>
          {record.profile?.bio ? <p>{record.profile.bio}</p> : null}
        </div>
      ) : null}
      <Button type="submit" variant="outline" disabled={pending || !signer}>
        {pending ? t.identity.pending : t.identity.resolve}
      </Button>
    </form>
  )
}
