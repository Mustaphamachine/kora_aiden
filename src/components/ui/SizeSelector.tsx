"use client";

import { cn } from "@/lib/utils";

const SIZES = ["XS", "S", "M", "L", "XL"] as const;

export type Size = (typeof SIZES)[number];

export function SizeSelector({
  value,
  onChange,
  className,
}: {
  value: Size;
  onChange: (next: Size) => void;
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-5 gap-2", className)}>
      {SIZES.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          className={cn(
            "h-10 rounded-full border px-3 text-xs font-semibold tracking-[0.12em] transition",
            value === s
              ? "border-neon-green text-neon-green shadow-neon"
              : "border-white/10 text-light-gray/70 hover:border-neon-green/50"
          )}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
