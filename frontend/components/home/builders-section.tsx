"use client"

import { motion } from "motion/react"
import { BuilderHandle } from "@/components/home/builder-handle"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const builders = [
  {
    handle: "truthixify",
    href: "https://github.com/truthixify",
    role: "DID:CKB · Vellum",
    body: "Reference dashboard and SDK for did:ckb — claim, resolve, profile, rotate, deactivate, and migrate from did:plc. Nervlith uses that passport as the member across communities.",
  },
  {
    handle: "AnihDev",
    href: "https://github.com/anihdev",
    role: "Intent-cell governance",
    body: "CKB-native voting where each ballot is an independent intent cell, aggregated without collecting signatures again. Democracy and legislative modes in Nervlith follow this pattern.",
  },
]

export function BuildersSection() {
  return (
    <section id="builders" className="scroll-mt-16 border-t border-border/60">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="max-w-2xl"
        >
          <p className="font-display text-xs tracking-[0.24em] text-primary uppercase">
            Builders
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-balance sm:text-4xl">
            Standing on cell-native work.
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            Nervlith is a launcher. The identity and governance primitives come
            from CKB builders who already proved the patterns on chain.
          </p>
        </motion.div>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {builders.map((builder, index) => (
            <motion.div
              key={builder.handle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full ring-1 ring-primary/15">
                <CardHeader>
                  <CardTitle className="font-display text-2xl">
                    <BuilderHandle
                      handle={builder.handle}
                      href={builder.href}
                      className="px-2 py-1 text-lg"
                    />
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{builder.role}</p>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  {builder.body}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
