"use client"

import { motion } from "motion/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BuilderHandle } from "@/components/home/builder-handle"
import { useLanguage } from "@/components/language/language-provider"

const projects = [
  {
    href: "https://github.com/ckb-devrel/ccc",
  },
  {
    href: "https://github.com/truthixify/vellum",
    handle: { name: "truthixify", href: "https://github.com/truthixify" },
  },
  {
    href: "https://github.com/anihdev/ckb-voting-dapp",
    handle: { name: "AnihDev", href: "https://github.com/anihdev" },
  },
]

export function IntegrationsSection() {
  const { t } = useLanguage()

  return (
    <section id="integrations" className="scroll-mt-16 border-t border-border/60">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="max-w-2xl"
        >
          <p className="font-display text-xs tracking-[0.24em] text-primary uppercase">
            {t.integrations.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-balance sm:text-4xl">
            {t.integrations.title}
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            {t.integrations.body}
          </p>
        </motion.div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {t.integrations.projects.map((copy, index) => {
            const project = projects[index]
            return (
            <motion.div
              key={copy.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardDescription className="font-display tracking-wide text-primary">
                    {copy.name}
                  </CardDescription>
                  <CardTitle className="font-display text-lg">
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary"
                    >
                      {copy.title}
                    </a>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-muted-foreground">
                  <p>{copy.body}</p>
                  {project.handle ? (
                    <p className="text-sm">
                      {t.integrations.patternBy}{" "}
                      <BuilderHandle
                        handle={project.handle.name}
                        href={project.handle.href}
                      />
                    </p>
                  ) : null}
                </CardContent>
              </Card>
            </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
