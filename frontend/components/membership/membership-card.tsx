"use client"

import { useState } from "react"
import { cn } from "cn"
import { useLanguage } from "@/components/language/language-provider"
import type { CardArt, CardHolo, CardPattern } from "@/lib/ckb/community-data"

const patterns: Record<CardPattern, string | null> = {
  signal:
    "repeating-linear-gradient(115deg, transparent 0 10px, color-mix(in srgb, var(--foreground) 14%, transparent) 10px 11px)",
  mesh:
    "radial-gradient(circle, color-mix(in srgb, var(--foreground) 28%, transparent) 1px, transparent 1.4px)",
  crest:
    "linear-gradient(135deg, transparent 46%, color-mix(in srgb, var(--primary) 55%, transparent) 46% 54%, transparent 54%), linear-gradient(45deg, transparent 46%, color-mix(in srgb, var(--foreground) 18%, transparent) 46% 54%, transparent 54%)",
  splats:
    "radial-gradient(circle at 16% 32%, color-mix(in srgb, var(--primary) 72%, transparent) 0 11px, transparent 13px), radial-gradient(circle at 74% 24%, color-mix(in srgb, var(--foreground) 34%, transparent) 0 18px, transparent 20px), radial-gradient(circle at 38% 72%, color-mix(in srgb, var(--primary) 42%, transparent) 0 8px, transparent 10px), radial-gradient(circle at 86% 70%, color-mix(in srgb, var(--foreground) 24%, transparent) 0 13px, transparent 15px)",
  top: null,
  bottom: null,
  left: null,
  right: null,
}

const lineClass = "pointer-events-none absolute bg-primary"

const arts: Record<CardArt, string> = {
  ember:
    "radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--primary) 55%, transparent), transparent 58%)",
  alloy:
    "linear-gradient(160deg, color-mix(in srgb, var(--foreground) 16%, transparent), transparent 42%, color-mix(in srgb, var(--foreground) 8%, transparent))",
  void:
    "radial-gradient(circle at 50% 120%, color-mix(in srgb, var(--primary) 28%, transparent), transparent 55%)",
}

const face =
  "absolute inset-0 overflow-hidden rounded-2xl border border-border bg-card backface-hidden"

export function MembershipCard({
  name,
  fee,
  model,
  pattern,
  art,
  holographic,
  description,
  className,
}: {
  name: string
  fee: string
  model: string
  pattern: CardPattern
  art: CardArt
  holographic: CardHolo
  description?: string
  className?: string
}) {
  const { t } = useLanguage()
  const [flipped, setFlipped] = useState(false)
  const back = description?.trim() ?? ""
  const flippable = back.length > 0

  return (
    <div
      className={cn(
        "group w-full max-w-64 rounded-2xl outline-none",
        flippable && "focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      tabIndex={flippable ? 0 : undefined}
      onClick={() => {
        if (!flippable) return
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) return
        setFlipped((value) => !value)
      }}
    >
      <div className="perspective-distant">
        <div
          className={cn(
            "relative aspect-[54/86] transform-3d transition-transform duration-700 ease-out motion-reduce:transition-none",
            flippable && "group-hover:rotate-y-180 group-focus-visible:rotate-y-180",
            flipped && "rotate-y-180",
          )}
        >
        <article className={face}>
          {patterns[pattern] ? (
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                backgroundImage: patterns[pattern],
                backgroundSize: pattern === "mesh" ? "10px 10px" : undefined,
              }}
            />
          ) : null}
          {pattern === "top" ? (
            <div aria-hidden className={cn(lineClass, "top-3 right-5 left-5 h-px")} />
          ) : null}
          {pattern === "bottom" ? (
            <div aria-hidden className={cn(lineClass, "right-5 bottom-3 left-5 h-px")} />
          ) : null}
          {pattern === "left" ? (
            <div aria-hidden className={cn(lineClass, "top-3 bottom-3 left-3 w-px")} />
          ) : null}
          {pattern === "right" ? (
            <div aria-hidden className={cn(lineClass, "top-3 right-3 bottom-3 w-px")} />
          ) : null}
          <div aria-hidden className="absolute inset-0" style={{ backgroundImage: arts[art] }} />
          {holographic === "sheen" ? (
            <div
              aria-hidden
              className="nervlith-sheen pointer-events-none absolute inset-y-0 -left-1/3 w-2/3 bg-[linear-gradient(100deg,transparent,color-mix(in_srgb,var(--foreground)_22%,transparent),transparent)]"
            />
          ) : null}
          {holographic === "prism" ? (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,color-mix(in_srgb,var(--primary)_28%,transparent),transparent_32%,color-mix(in_srgb,#7dd3fc_22%,transparent)_58%,transparent_74%,color-mix(in_srgb,#f0abfc_18%,transparent))]"
            />
          ) : null}
          <div className="relative flex h-full flex-col justify-between p-4">
            <p className="text-[10px] tracking-[0.22em] text-primary uppercase">Nervlith</p>
            <div className="min-w-0">
              <p className="truncate font-display text-xl font-semibold">{name || "—"}</p>
              <p className="mt-1 truncate text-xs text-muted-foreground">
                {fee} CKB · {model}
              </p>
            </div>
          </div>
        </article>
        {flippable ? (
          <div className={cn(face, "rotate-y-180")}>
            <div
              aria-hidden
              className="absolute inset-0 opacity-70"
              style={{ backgroundImage: arts[art] }}
            />
            <div className="relative flex h-full min-h-0 flex-col p-4">
              <p className="text-[10px] tracking-[0.22em] text-primary uppercase">
                {t.launch.descriptionLabel}
              </p>
              <p className="mt-3 min-h-0 flex-1 overflow-y-auto text-sm leading-relaxed whitespace-pre-wrap">
                {back}
              </p>
            </div>
          </div>
        ) : null}
        </div>
      </div>
    </div>
  )
}
