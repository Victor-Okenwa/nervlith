"use client"

import { motion } from "motion/react"
import { Fingerprint, Landmark, Vote } from "lucide-react"

const pillars = [
  {
    icon: Landmark,
    title: "Build",
    body: "Launch a community as CKB cells. The owner sets a gate fee and a model: autocracy, democracy, or legislative council.",
  },
  {
    icon: Vote,
    title: "Govern",
    body: "Paying the fee mints a membership card. Democracy and legislative votes are independent intent cells. The app aggregates them. Nothing shares one mutable ballot box.",
  },
  {
    icon: Fingerprint,
    title: "Belong",
    body: "The card is drawn in the browser from on-chain metadata — not an image on a host. DID:CKB is the passport that travels with you across communities.",
  },
]

export function ProtocolSection() {
  return (
    <section id="protocol" className="relative scroll-mt-16 overflow-hidden border-t border-border/60">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_0%,color-mix(in_srgb,var(--primary)_10%,transparent),transparent_65%)]" />
      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="max-w-2xl"
        >
          <p className="font-display text-xs tracking-[0.24em] text-primary uppercase">
            CKB-native protocol
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-balance sm:text-4xl">
            A community the chain can verify.
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            Nervlith does not wrap a forum in a wallet connect button. Every
            join, vote, and identity change is a transaction. Cell deps, witness
            slots, and scripts stay aligned so TypeScript and Rust tell the
            same story.
          </p>
        </motion.div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <motion.article
              key={pillar.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className="flex flex-col gap-4"
            >
              <div className="flex size-10 items-center justify-center rounded-2xl bg-secondary text-primary ring-1 ring-border">
                <pillar.icon className="size-5" />
              </div>
              <h3 className="font-display text-xl font-semibold">{pillar.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {pillar.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
