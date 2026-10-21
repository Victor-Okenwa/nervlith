"use client"

import { motion } from "motion/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language/language-provider"

export function ProblemSection() {
  const { t } = useLanguage()
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
            {t.problem.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-balance sm:text-4xl">
            {t.problem.title}
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            {t.problem.body}
          </p>
        </motion.div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {t.problem.points.map((point, index) => (
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
