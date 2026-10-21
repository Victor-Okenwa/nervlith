"use client"

import { motion } from "motion/react"
import { Fingerprint, Landmark, Vote } from "lucide-react"
import { useLanguage } from "@/components/language/language-provider"

const icons = [Landmark, Vote, Fingerprint]

export function ProtocolSection() {
  const { t } = useLanguage()
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
            {t.protocol.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-balance sm:text-4xl">
            {t.protocol.title}
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            {t.protocol.body}
          </p>
        </motion.div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {t.protocol.pillars.map((pillar, index) => {
            const Icon = icons[index]
            return (
            <motion.article
              key={pillar.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className="flex flex-col gap-4"
            >
              <div className="flex size-10 items-center justify-center rounded-2xl bg-secondary text-primary ring-1 ring-border">
                <Icon className="size-5" />
              </div>
              <h3 className="font-display text-xl font-semibold">{pillar.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {pillar.body}
              </p>
            </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
