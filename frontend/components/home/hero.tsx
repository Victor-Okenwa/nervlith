"use client"

import { motion } from "motion/react"
import ConnectWallet from "@/components/ConnectWallet"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { HeroGrid } from "@/components/home/hero-grid"
import { cn } from "cn"

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
}

export function Hero() {
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
              CKB-Native
            </Badge>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="mt-6 font-display text-4xl font-semibold tracking-tight text-balance sm:text-6xl"
          >
            Build. Govern. Belong.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-2xl text-base text-muted-foreground text-pretty sm:text-lg"
          >
            Nervlith (formally Mint Gate) is a{" "}
            <span className="text-foreground">CKB-native</span> DAO launcher.
            It replaces a centralized forum with cells the chain can verify:
            a gate fee, a membership card, a DID passport, and votes that
            never share a single mutable cell.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
            <ConnectWallet size="lg" />
            <a
              href="#protocol"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              See the protocol
            </a>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="mt-10 font-display text-xs tracking-[0.28em] text-muted-foreground uppercase"
          >
            On CKB · In cells · Without a server of record
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
