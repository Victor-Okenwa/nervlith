import { cn } from "cn"

export function Logo({
  className,
  title,
}: {
  className?: string
  title?: string
}) {
  return (
    <svg
      viewBox="0 0 37 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-8 w-auto", className)}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      <rect x="1" y="1" width="8" height="50" rx="4" className="fill-foreground" />
      <rect x="29" y="1" width="8" height="15" rx="4" className="fill-primary" />
      <rect x="29" y="36" width="8" height="15" rx="4" className="fill-primary" />
      <path
        d="M2.17499 7.13385C0.973777 5.59636 1.24638 3.37621 2.78386 2.17499C4.32134 0.97378 6.5415 1.24638 7.74271 2.78386L22.7368 21.9754C23.938 23.5129 23.6654 25.7331 22.1279 26.9343C20.5905 28.1355 18.3703 27.8629 17.1691 26.3254L9.67204 16.7296L2.17499 7.13385Z"
        className="fill-foreground"
      />
      <path d="M33.25 14V38" strokeWidth="0.5" className="stroke-primary" />
    </svg>
  )
}
