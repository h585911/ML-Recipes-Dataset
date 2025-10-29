import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground/60 selection:bg-primary/20 selection:text-primary-foreground dark:bg-input/20 ring-1 ring-black/15 dark:ring-white/13 h-9 w-full min-w-0 rounded-lg bg-background px-3 py-1.5 text-sm shadow-sm dark:shadow-sm dark:shadow-black/20 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40",
        "focus-visible:ring-ring/30 dark:focus-visible:ring-ring/40 focus-visible:ring-1 focus-visible:shadow-sm dark:focus-visible:shadow-sm dark:focus-visible:shadow-black/20 focus-visible:bg-background",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/30 aria-invalid:ring-destructive/20",
        className
      )}
      {...props}
    />
  )
}

export { Input }
