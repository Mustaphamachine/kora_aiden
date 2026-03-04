"use client";

import { useMemo, useState } from "react";

import collectionsData from "@/data/collections.json";
import { MainShell } from "@/components/MainShell";
import { MediaGallery } from "@/components/MediaGallery";
import type { MediaItem } from "@/components/Lightbox";

type CollectionsJson = {
  gallery: Array<MediaItem & { collection: string }>;
};

type Filter = "all" | "bespoke" | "readyToWear" | "customBridal";

export default function GalleryPage() {
  const data = collectionsData as unknown as CollectionsJson;
  const all = useMemo(() => data.gallery ?? [], [data]);

  const [filter, setFilter] = useState<Filter>("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const base = filter === "all" ? all : all.filter((m) => m.collection === filter);
    return base;
  }, [all, filter]);

  const pageSize = 24;
  const visible = filtered.slice(0, page * pageSize);
  const canLoadMore = visible.length < filtered.length;

  return (
    <MainShell>
      <div className="bg-deep-black">
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="mb-10 text-center">
            <h1 className="text-3xl sm:text-5xl">GALLERY</h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm tracking-[0.12em] text-light-gray/70">
              All collections. Images and videos combined.
            </p>
          </div>

          <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
            {[
              { key: "all", label: "All" },
              { key: "bespoke", label: "Bespoke" },
              { key: "readyToWear", label: "Ready-to-Wear" },
              { key: "customBridal", label: "Custom/Bridal" },
            ].map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => {
                  setFilter(f.key as Filter);
                  setPage(1);
                }}
                className={`h-10 rounded-full border px-4 text-xs font-semibold tracking-[0.14em] transition ${
                  filter === (f.key as Filter)
                    ? "border-neon-green text-neon-green shadow-neon"
                    : "border-white/10 text-light-gray/70 hover:border-neon-green/50"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <MediaGallery items={visible} columnsClassName="grid-cols-2 md:grid-cols-4" />

          {canLoadMore && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setPage((p) => p + 1)}
                className="h-11 rounded-full border border-neon-green/40 px-6 text-sm font-semibold tracking-[0.14em] text-neon-green hover:border-neon-green hover:shadow-neon transition"
              >
                Load More
              </button>
            </div>
          )}
        </section>
      </div>
    </MainShell>
  );
}
