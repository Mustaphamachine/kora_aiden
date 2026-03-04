"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect } from "react";

import collectionsData from "@/data/collections.json";
import type { MediaItem } from "@/components/Lightbox";
import { MediaGallery } from "@/components/MediaGallery";
import { Button } from "@/components/ui/Button";
import { MainShell } from "@/components/MainShell";

type CollectionsJson = {
  collections: {
    customBridal: { media: MediaItem[] };
  };
};

export default function CustomBridalPage() {
  // Unique page identifier for analytics/tracking
  const pageName = "custom-bridal";
  
  useEffect(() => {
    document.body.setAttribute('data-page', pageName);
    return () => document.body.removeAttribute('data-page');
  }, []);
  
  const data = collectionsData as unknown as CollectionsJson;
  const items = data.collections?.customBridal?.media ?? [];
  const hero = items[0];

  return (
    <MainShell>
      <div className="bg-deep-black">
        <section className="relative h-[70vh] min-h-[560px] overflow-hidden">
          <div className="absolute inset-0">
            {hero?.type === "video" ? (
              <video autoPlay loop muted playsInline className="h-full w-full object-cover">
                <source src={hero.src} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={hero?.src ?? "/logo.png"}
                alt={hero?.alt ?? "Custom bridal"}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black/65" />
            <div className="absolute inset-0 bg-gradient-to-b from-neon-green/15 via-transparent to-black/85" />
          </div>

          <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-14 sm:px-6">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-3xl sm:text-5xl"
            >
              CUSTOM MADE & BRIDALS
            </motion.h1>
            <p className="mt-4 max-w-2xl text-sm tracking-[0.12em] text-light-gray/75 sm:text-base">
              Your Vision, Our Artistry
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <MediaGallery items={items} masonry />
        </section>

        <section className="border-y border-white/10 bg-black/20">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <div className="mb-10 text-center">
              <h2 className="text-2xl sm:text-3xl">SERVICES</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-4">
              {["Wedding Gowns", "Custom Eveningwear", "Bespoke Tailoring", "Personalized Design"].map(
                (s) => (
                  <div
                    key={s}
                    className="rounded-3xl border border-white/10 bg-deep-black/60 p-7 text-center"
                  >
                    <div className="text-xs font-semibold tracking-[0.18em] text-light-gray">
                      {s}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-2xl sm:text-3xl">PROCESS</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {[
              "Book Consultation",
              "Design Session",
              "Fittings & Refinements",
              "Final Creation",
            ].map((step, i) => (
              <div key={step} className="rounded-3xl border border-white/10 bg-black/20 p-8">
                <div className="text-xs font-semibold tracking-[0.2em] text-neon-green">
                  {i + 1}
                </div>
                <div className="mt-4 text-sm font-semibold tracking-[0.16em] text-light-gray">
                  {step}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-black/20">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <div className="mb-10 text-center">
              <h2 className="text-2xl sm:text-3xl">TESTIMONIALS</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[1, 2, 3].slice(0, 3).map((n) => (
                <div key={n} className="rounded-3xl border border-white/10 bg-deep-black/60 p-8">
                  <div className="text-sm leading-7 text-light-gray/70">
                    “A breathtaking experience—crafted with precision and pure vision.”
                  </div>
                  <div className="mt-6 text-xs font-semibold tracking-[0.18em] text-light-gray">
                    Client {n}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl">INQUIRE ABOUT CUSTOM SERVICES</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm tracking-[0.12em] text-light-gray/70">
              Send details about your event, timeline, and inspiration.
            </p>
          </div>

          <form className="mt-10 space-y-4" name="custom-bridal" method="post">
            <input type="hidden" name="form-name" value="custom-bridal" />
            <input
              className="h-11 w-full rounded-full border border-white/10 bg-black/30 px-4 text-sm text-light-gray placeholder:text-light-gray/40 focus:outline-none focus:ring-2 focus:ring-neon-green"
              name="name"
              placeholder="Name"
              required
            />
            <input
              className="h-11 w-full rounded-full border border-white/10 bg-black/30 px-4 text-sm text-light-gray placeholder:text-light-gray/40 focus:outline-none focus:ring-2 focus:ring-neon-green"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
            <textarea
              className="min-h-36 w-full rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-light-gray placeholder:text-light-gray/40 focus:outline-none focus:ring-2 focus:ring-neon-green"
              name="message"
              placeholder="Tell us what you’re envisioning..."
              required
            />
            <div className="flex justify-center">
              <Button type="submit">Submit Inquiry</Button>
            </div>
          </form>

          <div className="mt-8 flex justify-center">
            <Link href="/contact">
              <Button variant="outline">Open Full Contact Form</Button>
            </Link>
          </div>
        </section>

        {/* Creative Clicking Options */}
        <section className="border-y border-white/10 bg-black/20">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl">BRIDAL CONSULTATION</h2>
              <p className="mt-4 text-sm tracking-[0.12em] text-light-gray/70">
                Choose your preferred way to connect
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3">
              <a 
                href="https://wa.me/2348133571613?text=Hi!%20I%27m%20interested%20in%20a%20custom%20bridal%20piece."
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-3xl border border-white/10 bg-deep-black/60 p-8 hover:border-neon-green/50 transition-all cursor-pointer text-center block"
              >
                <div className="mx-auto h-12 w-12 items-center justify-center rounded-full border border-neon-green/40 text-neon-green shadow-neon flex text-xl">
                  💍
                </div>
                <h3 className="mt-5 text-lg font-semibold">WhatsApp Bride</h3>
                <p className="mt-3 text-sm leading-7 text-light-gray/70">
                  Instant consultation for your special day
                </p>
                <div className="mt-4 text-xs font-medium text-neon-green">
                  Chat now →
                </div>
              </a>

              <a 
                href="https://wa.me/2348133571613?text=Hi!%20I%27d%20like%20to%20schedule%20a%20bridal%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-3xl border border-white/10 bg-deep-black/60 p-8 hover:border-neon-green/50 transition-all cursor-pointer text-center block"
              >
                <div className="mx-auto h-12 w-12 items-center justify-center rounded-full border border-neon-green/40 text-neon-green shadow-neon flex text-xl">
                  📅
                </div>
                <h3 className="mt-5 text-lg font-semibold">Schedule Fitting</h3>
                <p className="mt-3 text-sm leading-7 text-light-gray/70">
                  Book your personalized bridal consultation
                </p>
                <div className="mt-4 text-xs font-medium text-neon-green">
                  Book now →
                </div>
              </a>

              <Link href="/bespoke" className="group rounded-3xl border border-white/10 bg-deep-black/60 p-8 hover:border-neon-green/50 transition-all cursor-pointer text-center block">
                <div className="mx-auto h-12 w-12 items-center justify-center rounded-full border border-neon-green/40 text-neon-green shadow-neon flex text-xl">
                  👗
                </div>
                <h3 className="mt-5 text-lg font-semibold">View Gallery</h3>
                <p className="mt-3 text-sm leading-7 text-light-gray/70">
                  Explore our bespoke bridal creations
                </p>
                <div className="mt-4 text-xs font-medium text-neon-green">
                  View pieces →
                </div>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MainShell>
  );
}
