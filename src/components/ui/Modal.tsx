"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

export function Modal({
  open,
  onClose,
  title,
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100]">
      <button
        type="button"
        className="absolute inset-0 bg-black/80"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          className={cn(
            "relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-deep-black shadow-neon",
            className
          )}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="text-xs font-semibold tracking-[0.2em] text-light-gray">
              {title ?? ""}
            </div>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 hover:border-neon-green/60 hover:shadow-neon transition"
              onClick={onClose}
              aria-label="Close"
            >
              <X className="h-5 w-5 text-light-gray" />
            </button>
          </div>
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>,
    document.body
  );
}
