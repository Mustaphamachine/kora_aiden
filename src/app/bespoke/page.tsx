"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PencilRuler, Sparkles, Users, MessageCircle, Calendar, Palette } from "lucide-react";
import { useEffect } from "react";

import collectionsData from "@/data/collections.json";
import type { MediaItem } from "@/components/Lightbox";
import { MediaGallery } from "@/components/MediaGallery";
import { Button } from "@/components/ui/Button";
import { MainShell } from "@/components/MainShell";

type CollectionsJson = {
  collections: {
    bespoke: { media: MediaItem[] };
  };
};

export default function BespokePage() {
  // Unique page identifier for analytics/tracking
  const pageName = "bespoke";
  
  useEffect(() => {
    document.body.setAttribute('data-page', pageName);
    return () => document.body.removeAttribute('data-page');
  }, []);
  
  const data = collectionsData as unknown as CollectionsJson;
  const items = data.collections?.bespoke?.media ?? [];
  const hero = items[0];

  return (
    <MainShell>
      <div className="bg-deep-black">
        <section className="relative h-[70vh] min-h-[520px] overflow-hidden">
          <div className="absolute inset-0">
            {hero?.type === "video" ? (
              <video autoPlay loop muted playsInline className="h-full w-full object-cover">
                <source src={hero.src} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={hero?.src ?? "/logo.png"}
                alt={hero?.alt ?? "Bespoke"}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black/65" />
            <div className="absolute inset-0 bg-gradient-to-b from-neon-green/20 via-transparent to-black/85" />
          </div>

          <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-14 sm:px-6">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-3xl sm:text-5xl"
            >
              BESPOKE ATELIER
            </motion.h1>
            <p className="mt-4 max-w-2xl text-sm tracking-[0.12em] text-light-gray/75 sm:text-base">
              Individually Crafted Excellence
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <MediaGallery items={items} columnsClassName="grid-cols-1 md:grid-cols-3" />
        </section>

        <section className="border-y border-white/10 bg-black/20">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <div className="mb-10 text-center">
              <h2 className="text-2xl sm:text-3xl">PROCESS</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-deep-black/60 p-8">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-neon-green/40 text-neon-green shadow-neon">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg">Consultation</h3>
                <p className="mt-3 text-sm leading-7 text-light-gray/70">
                  A private session to capture your vision, fit, and intent.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-deep-black/60 p-8">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-neon-green/40 text-neon-green shadow-neon">
                  <PencilRuler className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg">Design</h3>
                <p className="mt-3 text-sm leading-7 text-light-gray/70">
                  Sketches, fabrics, and form—refined into a singular statement.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-deep-black/60 p-8">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-neon-green/40 text-neon-green shadow-neon">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg">Creation</h3>
                <p className="mt-3 text-sm leading-7 text-light-gray/70">
                  Expert construction with fittings and finishing detail.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
          <h2 className="text-2xl sm:text-3xl">REQUEST PRIVATE COMMISSION</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm tracking-[0.12em] text-light-gray/70">
            Ready to begin? Send your request and we’ll respond with next steps.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/contact">
              <Button>Request Private Commission</Button>
            </Link>
          </div>
        </section>
      </div>
    </MainShell>
  );
}
