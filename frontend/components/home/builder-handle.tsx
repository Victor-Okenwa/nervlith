import { cn } from "cn"

export function BuilderHandle({
  handle,
  href,
  className,
}: {
  handle: string
  href: string
  className?: string
}) {
  const label = handle.startsWith("@") ? handle : `@${handle}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "rounded-md bg-primary/15 px-1.5 py-0.5 font-medium text-primary ring-1 ring-primary/30 transition-colors hover:bg-primary/25 hover:ring-primary/50",
        className
      )}
    >
      {label}
    </a>
  )
}
