"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import { Lightbox, type MediaItem } from "@/components/Lightbox";
import { VideoPlayer } from "@/components/VideoPlayer";

export function MediaGallery({
  items,
  columnsClassName = "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
  masonry,
}: {
  items: MediaItem[];
  columnsClassName?: string;
  masonry?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const normalized = useMemo(() => items ?? [], [items]);

  return (
    <>
      <div
        className={cn(
          "grid gap-4",
          columnsClassName,
          masonry ? "[grid-auto-rows:12px]" : ""
        )}
      >
        {normalized.map((m, i) => {
          const cardClass = cn(
            "group relative overflow-hidden rounded-2xl border border-white/10 bg-black/30",
            "hover:border-neon-green/60 hover:shadow-neon transition"
          );

          return (
            <button
              key={m.src}
              type="button"
              className={cn(cardClass, masonry ? "row-span-20" : "aspect-[4/5]")}
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
            >
              {m.type === "video" ? (
                <VideoPlayer src={m.src} autoplayOnHover className="h-full w-full" />
              ) : (
                <Image
                  src={m.src}
                  alt={m.alt ?? m.title ?? ""}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                />
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="pointer-events-none absolute bottom-3 left-3 right-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <div className="text-left text-xs font-semibold tracking-[0.18em] text-light-gray">
                  {m.title ?? ""}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <Lightbox
        open={open}
        onClose={() => setOpen(false)}
        items={normalized}
        index={index}
        onIndexChange={setIndex}
      />
    </>
  );
}
