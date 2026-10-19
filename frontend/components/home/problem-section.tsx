"use client"

import { motion } from "motion/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const points = [
  {
    title: "Forums pretend to be governance",
    body: "Membership lives in a spreadsheet. Proposals live in Discord. The chain never sees who belonged, who voted, or what passed.",
  },
  {
    title: "Shared cells become bottlenecks",
    body: "If every vote mutates one poll cell, voters race, operators gatekeep, and the history is whatever the last writer left behind.",
  },
  {
    title: "Identity is rented",
    body: "Handles on a host are not passports. Leave the forum and the name, the card, and the reputation stay with the operator.",
  },
]

export function ProblemSection() {
  return (
    <section id="problem" className="scroll-mt-16 border-t border-border/60">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="max-w-2xl"
        >
          <p className="font-display text-xs tracking-[0.24em] text-primary uppercase">
            The problem
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-balance sm:text-4xl">
            DAOs should not depend on a room they do not own.
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            Nervlith exists because CKB already has the cell model for this.
            A community is not a website. It is a gate fee plus a governance
            model, written so the VM can check it.
          </p>
        </motion.div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {points.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Card className="h-full bg-card/80">
                <CardHeader>
                  <CardTitle className="font-display text-lg">
                    {point.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  {point.body}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
