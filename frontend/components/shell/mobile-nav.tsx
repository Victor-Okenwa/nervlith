"use client"

import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { useEffect, useId, useRef, useState, type ReactNode } from "react"
import { Button } from "@/components/ui/button"

export function MobileNav({
  label,
  closeLabel,
  children,
}: {
  label: string
  closeLabel: string
  children: ReactNode
}) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const panelId = useId()
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)")
    function onChange() {
      if (query.matches) setOpen(false)
    }
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    if (!open) return
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return
      setOpen(false)
      buttonRef.current?.focus()
    }
    function onPointerDown(event: PointerEvent) {
      const target = event.target
      if (!(target instanceof Element)) return
      if (target.closest("[data-mobile-nav]")) return
      if (target.closest("[data-slot^='select-']")) return
      setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("pointerdown", onPointerDown)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("pointerdown", onPointerDown)
    }
  }, [open])

  return (
    <>
      <Button
        ref={buttonRef}
        type="button"
        variant="ghost"
        size="icon"
        className="md:hidden"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? closeLabel : label}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X /> : <Menu />}
      </Button>
      {open ? (
        <div
          id={panelId}
          role="region"
          aria-label={label}
          className="absolute inset-x-0 top-full z-40 border-b border-border bg-background md:hidden"
          onClick={(event) => {
            if (event.target instanceof Element && event.target.closest("a")) {
              setOpen(false)
            }
          }}
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:px-6">
            {children}
          </div>
        </div>
      ) : null}
    </>
  )
}
