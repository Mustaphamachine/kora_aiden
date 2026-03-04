import { cn } from "@/lib/utils";

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-6 w-6 animate-spin rounded-full border-2 border-neon-green/30 border-t-neon-green shadow-neon",
        className
      )}
      aria-label="Loading"
      role="status"
    />
  );
}
