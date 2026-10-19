"use client"

import { motion } from "motion/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BuilderHandle } from "@/components/home/builder-handle"

const projects = [
  {
    name: "CCC",
    href: "https://github.com/ckb-devrel/ccc",
    title: "Common Chains Connector",
    body: "Wallets, cells, and typed transaction builders. Nervlith speaks CKB through CCC instead of a custom RPC layer.",
  },
  {
    name: "DID:CKB · Vellum",
    href: "https://github.com/truthixify/vellum",
    title: "Identity that lives on CKB",
    body: "Create, resolve, rotate, deactivate, and migrate from did:plc. The DID is the passport across every Nervlith community.",
    handle: { name: "truthixify", href: "https://github.com/truthixify" },
  },
  {
    name: "Intent-cell governance",
    href: "https://github.com/anihdev/ckb-voting-dapp",
    title: "Votes as independent cells",
    body: "Democracy and legislative modes follow AnihDev’s pattern: each intent is its own cell. A tally reads them. The voter does not sign again.",
    handle: { name: "AnihDev", href: "https://github.com/anihdev" },
  },
]

export function IntegrationsSection() {
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
            Integrations
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-balance sm:text-4xl">
            Built on work already live on CKB.
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            Nervlith does not reinvent identity or voting. It composes the
            cell-native projects CKB builders already shipped, then adds the
            DAO launcher around them.
          </p>
        </motion.div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardDescription className="font-display tracking-wide text-primary">
                    {project.name}
                  </CardDescription>
                  <CardTitle className="font-display text-lg">
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary"
                    >
                      {project.title}
                    </a>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-muted-foreground">
                  <p>{project.body}</p>
                  {project.handle ? (
                    <p className="text-sm">
                      Pattern by{" "}
                      <BuilderHandle
                        handle={project.handle.name}
                        href={project.handle.href}
                      />
                    </p>
                  ) : null}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
