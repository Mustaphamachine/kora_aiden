"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Modal } from "@/components/ui/Modal";
import { VideoPlayer } from "@/components/VideoPlayer";

export type MediaItem = {
  type: "image" | "video";
  src: string;
  alt?: string;
  title?: string;
};

export function Lightbox({
  open,
  onClose,
  items,
  index,
  onIndexChange,
}: {
  open: boolean;
  onClose: () => void;
  items: MediaItem[];
  index: number;
  onIndexChange: (next: number) => void;
}) {
  const item = items[index];
  const hasPrev = index > 0;
  const hasNext = index < items.length - 1;

  return (
    <Modal open={open} onClose={onClose} title={item?.title ?? ""} className="max-w-5xl">
      <div className="relative">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-black">
          {item?.type === "video" ? (
            <VideoPlayer src={item.src} className="h-full w-full" />
          ) : item ? (
            <Image
              src={item.src}
              alt={item.alt ?? item.title ?? ""}
              fill
              sizes="(max-width: 768px) 100vw, 900px"
              className="object-contain"
            />
          ) : null}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            className={cn(
              "inline-flex h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition",
              hasPrev
                ? "border-white/10 text-light-gray hover:border-neon-green/60 hover:shadow-neon"
                : "border-white/5 text-light-gray/30 cursor-not-allowed"
            )}
            onClick={() => hasPrev && onIndexChange(index - 1)}
            disabled={!hasPrev}
          >
            <ChevronLeft className="h-4 w-4" />
            Prev
          </button>

          <div className="text-xs tracking-[0.2em] text-light-gray/60">
            {items.length ? `${index + 1} / ${items.length}` : ""}
          </div>

          <button
            type="button"
            className={cn(
              "inline-flex h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition",
              hasNext
                ? "border-white/10 text-light-gray hover:border-neon-green/60 hover:shadow-neon"
                : "border-white/5 text-light-gray/30 cursor-not-allowed"
            )}
            onClick={() => hasNext && onIndexChange(index + 1)}
            disabled={!hasNext}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Modal>
  );
}
