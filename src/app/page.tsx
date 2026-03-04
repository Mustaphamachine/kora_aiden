"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Award, Crown, Palette, Sparkles, Zap } from "lucide-react";

import collectionsData from "@/data/collections.json";
import { MainShell } from "@/components/MainShell";
import { Button } from "@/components/ui/Button";
import type { MediaItem } from "@/components/Lightbox";

type CollectionsJson = {
  collections: {
    bespoke: { media: MediaItem[] };
    readyToWear: { media: MediaItem[] };
    customBridal: { media: MediaItem[] };
  };
  gallery: Array<MediaItem & { collection: string }>;
};

function Reveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function pickCurated<T>(arr: T[], count: number) {
  if (!arr.length) return [];
  const step = Math.max(1, Math.floor(arr.length / count));
  const out: T[] = [];
  for (let i = 0; i < arr.length && out.length < count; i += step) out.push(arr[i]);
  return out;
}

function interleave<T>(primary: T[], secondary: T[], total: number, primaryEvery = 2) {
  const out: T[] = [];
  let p = 0;
  let s = 0;
  while (out.length < total && (p < primary.length || s < secondary.length)) {
    const takePrimary = out.length % (primaryEvery + 1) !== primaryEvery;
    if (takePrimary && p < primary.length) out.push(primary[p++]);
    else if (s < secondary.length) out.push(secondary[s++]);
    else if (p < primary.length) out.push(primary[p++]);
  }
  return out.slice(0, total);
}

export default function HomePage() {
  // Unique page identifier for analytics/tracking
  const pageName = "home";
  
  useEffect(() => {
    document.body.setAttribute('data-page', pageName);
    return () => document.body.removeAttribute('data-page');
  }, []);
  const data = collectionsData as unknown as CollectionsJson;
  const gallery = useMemo(() => data.gallery ?? [], [data]);

  const bespoke = useMemo(() => data.collections?.bespoke?.media ?? [], [data]);
  const nonBespoke = useMemo(
    () => gallery.filter((g) => g.collection !== "bespoke"),
    [gallery]
  );

  const heroItems = useMemo(() => {
    const a = pickCurated(bespoke, 4);
    const b = pickCurated(nonBespoke, 6);
    return interleave(a, b, 6, 1);
  }, [bespoke, nonBespoke]);

  const signature = useMemo(() => {
    const a = pickCurated(bespoke, 10);
    const b = pickCurated(nonBespoke, 20);
    return interleave(a, b, 12, 1);
  }, [bespoke, nonBespoke]);

  const latest = useMemo(() => {
    // Get only videos from bespoke collection for latest drops
    const bespokeVideos = bespoke.filter(item => item.type === 'video');
    return bespokeVideos.slice(0, 4); // Take first 4 videos
  }, [bespoke]);

  const [heroIndex, setHeroIndex] = useState(0);
  useEffect(() => {
    if (!heroItems.length) return;
    const id = window.setInterval(
      () => setHeroIndex((i) => (i + 1) % heroItems.length),
      5200
    );
    return () => window.clearInterval(id);
  }, [heroItems.length]);

  const hero = heroItems[heroIndex];
  const rtwBg = data.collections?.readyToWear?.media?.[0] ?? heroItems[0];
  const bridalBg = data.collections?.customBridal?.media?.[0] ?? heroItems[1];

  return (
    <MainShell>
      <div className="bg-deep-black">
        <section className="relative h-[92vh] min-h-[680px] overflow-hidden">
          <div className="absolute inset-0">
            {hero?.type === "video" ? (
              <video autoPlay loop muted playsInline className="h-full w-full object-cover">
                <source src={hero.src} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={hero?.src ?? "/logo.png"}
                alt={hero?.alt ?? "KORA AIDEN"}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 bg-gradient-to-b from-neon-green/25 via-transparent to-black/85" />
          </div>

          <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-4 text-center sm:px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <div className="relative mx-auto h-24 w-72 sm:h-28 sm:w-80">
                <Image
                  src="/logo.png"
                  alt="KORA AIDEN"
                  fill
                  priority
                  sizes="320px"
                  className="object-contain"
                />
              </div>
              <p className="mx-auto mt-6 max-w-2xl text-base tracking-[0.12em] text-light-gray/90 sm:text-lg">
                With Aiden the Fiery one, you shine.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/ready-to-wear">
                  <Button className="bg-neon-green text-deep-black hover:bg-neon-green/90">Shop Now</Button>
                </Link>
              </div>
            </motion.div>

            <div className="absolute bottom-7 left-1/2 -translate-x-1/2">
              <div className="kora-scroll-indicator inline-flex h-10 w-10 items-center justify-center rounded-full border border-neon-green/40 text-neon-green shadow-neon">
                ↓
              </div>
            </div>
          </div>
        </section>

        <section id="signature" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Reveal>
            <div className="mb-10 text-center">
              <h2 className="text-2xl sm:text-3xl">SIGNATURE CREATIONS</h2>
              <p className="mt-3 text-sm tracking-[0.12em] text-light-gray/70">
                Where Craftsmanship Meets Vision
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {signature.map((m) => (
                <div
                  key={m.src}
                  className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-black/30 hover:border-neon-green/70 hover:shadow-neon transition"
                >
                  {m.type === "video" ? (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                    >
                      <source src={m.src} type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      src={m.src}
                      alt={m.alt ?? m.title ?? ""}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          <Reveal>
            <div className="mb-8 text-center">
              <h2 className="text-2xl sm:text-3xl">CHOOSE YOUR JOURNEY</h2>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <Link
                href="/ready-to-wear"
                className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-black/30 hover:border-neon-green/70 hover:shadow-neon transition"
              >
                <div className="absolute inset-0">
                  {rtwBg?.type === "image" ? (
                    <Image
                      src={rtwBg.src}
                      alt={rtwBg.alt ?? "Ready-to-wear"}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <video autoPlay loop muted playsInline className="h-full w-full object-cover opacity-90">
                      <source src={rtwBg?.src ?? ""} type="video/mp4" />
                    </video>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                </div>
                <div className="relative p-8 sm:p-10">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-neon-green/40 text-neon-green shadow-neon">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div className="mt-5">
                    <h3 className="text-xl">INSTANT STYLES</h3>
                    <p className="mt-2 text-sm tracking-[0.12em] text-light-gray/70">
                      Ready-to-Wear Collection
                    </p>
                  </div>
                  <div className="mt-7 inline-flex rounded-full bg-neon-green px-6 py-3 text-sm font-semibold text-deep-black shadow-neon">
                    Shop Now
                  </div>
                </div>
              </Link>
            </Reveal>

            <Reveal>
              <Link
                href="/custom-bridal"
                className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-black/30 hover:border-neon-green/70 hover:shadow-neon transition"
              >
                <div className="absolute inset-0">
                  {bridalBg?.type === "image" ? (
                    <Image
                      src={bridalBg.src}
                      alt={bridalBg.alt ?? "Custom bridal"}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <video autoPlay loop muted playsInline className="h-full w-full object-cover opacity-90">
                      <source src={bridalBg?.src ?? ""} type="video/mp4" />
                    </video>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                </div>
                <div className="relative p-8 sm:p-10">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-neon-green/40 text-neon-green shadow-neon">
                    <Crown className="h-5 w-5" />
                  </div>
                  <div className="mt-5">
                    <h3 className="text-xl">CUSTOM DREAMS</h3>
                    <p className="mt-2 text-sm tracking-[0.12em] text-light-gray/70">
                      Bespoke & Bridal Atelier
                    </p>
                  </div>
                  <div className="mt-7 inline-flex rounded-full bg-neon-green px-6 py-3 text-sm font-semibold text-deep-black shadow-neon">
                    Begin Journey
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>

        <section className="border-y border-white/10 bg-black/20">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <Reveal>
              <div className="mb-10 text-center">
                <h2 className="text-2xl sm:text-3xl">WHY CHOOSE KORA AIDEN</h2>
              </div>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-3">
              <Reveal>
                <div className="rounded-3xl border border-white/10 bg-deep-black/60 p-8">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-neon-green/40 text-neon-green shadow-neon">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg">Fiery Innovation</h3>
                  <p className="mt-3 text-sm leading-7 text-light-gray/70">
                    Bold designs that ignite confidence
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <div className="rounded-3xl border border-white/10 bg-deep-black/60 p-8">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-neon-green/40 text-neon-green shadow-neon">
                    <Award className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg">Premium Materials</h3>
                  <p className="mt-3 text-sm leading-7 text-light-gray/70">
                    Globally sourced, locally perfected
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <div className="rounded-3xl border border-white/10 bg-deep-black/60 p-8">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-neon-green/40 text-neon-green shadow-neon">
                    <Palette className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg">Signature Edge</h3>
                  <p className="mt-3 text-sm leading-7 text-light-gray/70">
                    Where luxury meets street culture
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Reveal>
            <div className="flex items-end justify-between gap-6">
              <div>
                <h2 className="text-2xl sm:text-3xl">LATEST DROPS</h2>
                <p className="mt-3 text-sm tracking-[0.12em] text-light-gray/70">
                  Fresh pieces across every collection
                </p>
              </div>
              <Link
                href="/gallery"
                className="text-xs font-semibold tracking-[0.2em] text-neon-green hover:text-light-gray"
              >
                VIEW ALL
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {latest.map((m) => (
              <Reveal key={m.src}>
                <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-black/30 hover:border-neon-green/70 hover:shadow-neon transition">
                  {m.type === "video" ? (
                    <video autoPlay loop muted playsInline className="h-full w-full object-cover">
                      <source src={m.src} type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      src={m.src}
                      alt={m.alt ?? m.title ?? ""}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-3 left-3 right-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="text-xs font-semibold tracking-[0.18em] text-light-gray">
                      {m.title ?? ""}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="bg-black">
          <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl">READY TO SHINE?</h2>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/contact">
                  <Button>Start Custom Order</Button>
                </Link>
                <Link href="/ready-to-wear">
                  <Button variant="outline">Explore RTW</Button>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </MainShell>
  );
}
