import { Logo } from "@/components/brand/logo"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 py-8 sm:flex-row sm:items-center sm:px-6">
        <div className="flex items-center gap-2.5 text-sm">
          <Logo className="h-5" />
          <span className="font-display font-medium">Nervlith</span>
          <span className="text-muted-foreground">CKB-Native</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Build · Govern · Belong
        </p>
      </div>
    </footer>
  )
}
