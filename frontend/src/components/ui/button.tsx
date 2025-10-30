import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3.5 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-ring/20 focus-visible:ring-1 focus-visible:ring-offset-1 aria-invalid:ring-destructive/10 dark:aria-invalid:ring-destructive/20 font-medium!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-none hover:shadow-none",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 shadow-none",
        outline:
          "border border-border/50 bg-background shadow-none hover:bg-accent/50 hover:text-accent-foreground dark:bg-card/30 dark:border-border/40 dark:hover:bg-accent/30",
        secondary:
          "bg-secondary/80 text-secondary-foreground hover:bg-secondary/90 shadow-none",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/30",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-3 py-1.5 has-[>svg]:px-2.5",
        sm: "h-8 rounded-md gap-1.5 px-2.5 has-[>svg]:px-2 text-xs",
        lg: "h-10 rounded-md px-5 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button };
