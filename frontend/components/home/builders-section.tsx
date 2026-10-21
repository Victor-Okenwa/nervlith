"use client"

import { motion } from "motion/react"
import { BuilderHandle } from "@/components/home/builder-handle"
import { useLanguage } from "@/components/language/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const builders = [
  {
    handle: "truthixify",
    href: "https://github.com/truthixify",
  },
  {
    handle: "AnihDev",
    href: "https://github.com/anihdev",
  },
]

export function BuildersSection() {
  const { t } = useLanguage()

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
            {t.builders.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-balance sm:text-4xl">
            {t.builders.title}
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            {t.builders.body}
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
                  <p className="text-sm text-muted-foreground">{t.builders.roles[index]}</p>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  {t.builders.bios[index]}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
