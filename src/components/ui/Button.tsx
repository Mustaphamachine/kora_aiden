import * as React from "react";

import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "outline";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-green focus-visible:ring-offset-2 focus-visible:ring-offset-deep-black disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" &&
          "bg-neon-green text-deep-black shadow-neon hover:shadow-neon-lg",
        variant === "outline" &&
          "border border-neon-green text-neon-green hover:bg-neon-green/10",
        className
      )}
      {...props}
    />
  );
}
