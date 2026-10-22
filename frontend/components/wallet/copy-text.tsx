"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

function shorten(value: string, front: number, end: number) {
  if (value.length <= front + end + 1) return value
  return `${value.slice(0, front)}…${value.slice(-end)}`
}

export function CopyText({
  value,
  label,
  copiedLabel,
  front = 10,
  end = 6,
}: {
  value: string
  label: string
  copiedLabel: string
  front?: number
  end?: number
}) {
  const [copied, setCopied] = useState(false)

  return (
    <span className="flex min-w-0 items-center gap-1.5">
      <span className="truncate font-mono text-xs text-muted-foreground" title={value}>
        {shorten(value, front, end)}
      </span>
      <button
        type="button"
        aria-label={copied ? copiedLabel : label}
        className="shrink-0 rounded-md p-1 text-muted-foreground hover:text-foreground"
        onClick={() => {
          void navigator.clipboard.writeText(value).then(() => {
            setCopied(true)
            window.setTimeout(() => setCopied(false), 1500)
          })
        }}
      >
        {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      </button>
    </span>
  )
}
