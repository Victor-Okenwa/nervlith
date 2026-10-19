"use client"

import { motion, useReducedMotion } from "motion/react"

export function HeroGrid() {
  const reduceMotion = useReducedMotion()

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,color-mix(in_srgb,var(--primary)_18%,transparent),transparent_70%)]" />
      <motion.div
        className="absolute -inset-[20%] opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, color-mix(in srgb, var(--border) 80%, transparent) 1px, transparent 1px),
            linear-gradient(to bottom, color-mix(in srgb, var(--border) 80%, transparent) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 70% 65% at 50% 35%, black 15%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 65% at 50% 35%, black 15%, transparent 72%)",
        }}
        animate={
          reduceMotion
            ? undefined
            : { backgroundPosition: ["0px 0px", "56px 56px"] }
        }
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -inset-[30%] opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, color-mix(in srgb, var(--primary) 45%, transparent) 1px, transparent 1px),
            linear-gradient(to bottom, color-mix(in srgb, var(--primary) 45%, transparent) 1px, transparent 1px)
          `,
          backgroundSize: "112px 112px",
          maskImage:
            "radial-gradient(ellipse 55% 50% at 50% 30%, black 0%, transparent 68%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 55% 50% at 50% 30%, black 0%, transparent 68%)",
        }}
        animate={
          reduceMotion
            ? undefined
            : { backgroundPosition: ["0px 0px", "-112px 112px"] }
        }
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      {!reduceMotion ? (
        <>
          <motion.span
            className="absolute top-[28%] left-[18%] size-1.5 rounded-full bg-primary shadow-[0_0_18px_var(--primary)]"
            animate={{ opacity: [0.25, 1, 0.25], scale: [1, 1.4, 1] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            className="absolute top-[42%] right-[22%] size-1.5 rounded-full bg-primary shadow-[0_0_18px_var(--primary)]"
            animate={{ opacity: [0.2, 0.9, 0.2], scale: [1, 1.35, 1] }}
            transition={{
              duration: 4.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8,
            }}
          />
          <motion.span
            className="absolute top-[58%] left-[46%] size-1 rounded-full bg-primary shadow-[0_0_14px_var(--primary)]"
            animate={{ opacity: [0.15, 0.85, 0.15] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.4,
            }}
          />
        </>
      ) : null}
    </div>
  )
}
