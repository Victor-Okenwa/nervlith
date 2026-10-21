"use client"

import { motion } from "motion/react"
import ConnectWallet from "@/components/ConnectWallet"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { HeroGrid } from "@/components/home/hero-grid"
import { useLanguage } from "@/components/language/language-provider"
import { cn } from "cn"

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
}

export function Hero() {
  const { t } = useLanguage()

  return (
    <section
      id="top"
      className="relative isolate min-h-[calc(100vh-3.5rem)] overflow-hidden"
    >
      <HeroGrid />
      <div className="relative mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-6xl flex-col justify-center px-4 py-20 sm:px-6">
        <motion.div
          className="max-w-3xl"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.div variants={fadeUp}>
            <Badge
              variant="outline"
              className="border-primary/40 bg-primary/10 text-primary"
            >
              {t.hero.badge}
            </Badge>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="mt-6 font-display text-4xl font-semibold tracking-tight text-balance sm:text-6xl"
          >
            {t.hero.title}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-2xl text-base text-muted-foreground text-pretty sm:text-lg"
          >
            Nervlith{" "}
            <span className="rounded-md bg-foreground px-1.5 py-0.5 text-sm text-background sm:text-base">
              {t.hero.formalName}
            </span>{" "}
            {t.hero.leadBefore}{" "}
            <span className="text-foreground">{t.hero.ckbNative}</span>{" "}
            {t.hero.leadAfter}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
            <ConnectWallet size="lg" />
            <a
              href="#protocol"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              {t.hero.seeProtocol}
            </a>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="mt-10 font-display text-xs tracking-[0.28em] text-muted-foreground uppercase"
          >
            {t.hero.kicker}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
