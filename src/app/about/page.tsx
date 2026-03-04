"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/Button";

export default function AboutPage() {
  // Unique page identifier for analytics/tracking
  const pageName = "about";
  
  useEffect(() => {
    document.body.setAttribute('data-page', pageName);
    return () => document.body.removeAttribute('data-page');
  }, []);
  
  return (
    <div className="bg-deep-black">
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-3xl sm:text-5xl">THE KORA AIDEN STORY</h1>
            <p className="mt-6 text-sm leading-7 tracking-[0.12em] text-light-gray/70">
              Where fire meets fashion—KORA AIDEN is built on bold innovation, premium quality, and
              the power of individuality.
            </p>
            <div className="mt-10 grid gap-6">
              <div className="rounded-3xl border border-white/10 bg-black/20 p-7">
                <div className="text-xs font-semibold tracking-[0.2em] text-neon-green">MISSION</div>
                <div className="mt-3 text-sm leading-7 text-light-gray/70">
                  Empowering through bold, innovative design.
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-black/20 p-7">
                <div className="text-xs font-semibold tracking-[0.2em] text-neon-green">VALUES</div>
                <div className="mt-3 text-sm leading-7 text-light-gray/70">
                  Quality, Innovation, Individuality.
                </div>
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-black/30">
            <Image
              src="/logo.png"
              alt="Brand story"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-10 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-neon-green/10 via-transparent to-black/50" />
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/20">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-2xl sm:text-3xl">MEET AIDEN</h2>
          </div>
          <div className="grid gap-10 md:grid-cols-[260px_1fr] md:items-center">
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-black/30" />
            <div>
              <div className="text-sm leading-7 tracking-[0.12em] text-light-gray/70">
                Aiden is the fiery force behind KORA AIDEN—blending luxury craftsmanship with street
                culture energy.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-2xl sm:text-3xl">MILESTONES</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { year: "2022", text: "Concept ignites and first prototypes are born." },
            { year: "2023", text: "Signature collections refine the KORA AIDEN edge." },
            { year: "2024", text: "A new era—bespoke, bridal, and ready-to-wear expand." },
          ].map((m) => (
            <div key={m.year} className="rounded-3xl border border-white/10 bg-black/20 p-8">
              <div className="text-xs font-semibold tracking-[0.2em] text-neon-green">{m.year}</div>
              <div className="mt-4 text-sm leading-7 text-light-gray/70">{m.text}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/gallery">
            <Button>Explore Our Work</Button>
          </Link>
        </div>
      </section>

      {/* Creative Clicking Options */}
      <section className="border-y border-white/10 bg-black/20">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl">CONNECT WITH US</h2>
            <p className="mt-4 text-sm tracking-[0.12em] text-light-gray/70">
              Multiple ways to reach out and collaborate
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-4">
            <a 
              href="https://wa.me/2348133571613?text=Hi!%20I%27d%20like%20to%20know%20more%20about%20KORA%20AIDEN."
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-3xl border border-white/10 bg-deep-black/60 p-6 hover:border-neon-green/50 transition-all cursor-pointer text-center block"
            >
              <div className="mx-auto h-10 w-10 items-center justify-center rounded-full border border-neon-green/40 text-neon-green shadow-neon flex">
                💬
              </div>
              <h3 className="mt-4 text-sm font-semibold">WhatsApp</h3>
              <p className="mt-2 text-xs leading-6 text-light-gray/70">
                Quick questions
              </p>
            </a>

            <Link href="/contact" className="group rounded-3xl border border-white/10 bg-deep-black/60 p-6 hover:border-neon-green/50 transition-all cursor-pointer text-center block">
              <div className="mx-auto h-10 w-10 items-center justify-center rounded-full border border-neon-green/40 text-neon-green shadow-neon flex">
                📧
              </div>
              <h3 className="mt-4 text-sm font-semibold">Email</h3>
              <p className="mt-2 text-xs leading-6 text-light-gray/70">
                Detailed inquiries
              </p>
            </Link>

            <Link href="/bespoke" className="group rounded-3xl border border-white/10 bg-deep-black/60 p-6 hover:border-neon-green/50 transition-all cursor-pointer text-center block">
              <div className="mx-auto h-10 w-10 items-center justify-center rounded-full border border-neon-green/40 text-neon-green shadow-neon flex">
                ✨
              </div>
              <h3 className="mt-4 text-sm font-semibold">Bespoke</h3>
              <p className="mt-2 text-xs leading-6 text-light-gray/70">
                Custom creations
              </p>
            </Link>

            <Link href="/gallery" className="group rounded-3xl border border-white/10 bg-deep-black/60 p-6 hover:border-neon-green/50 transition-all cursor-pointer text-center block">
              <div className="mx-auto h-10 w-10 items-center justify-center rounded-full border border-neon-green/40 text-neon-green shadow-neon flex">
                �️
              </div>
              <h3 className="mt-4 text-sm font-semibold">Gallery</h3>
              <p className="mt-2 text-xs leading-6 text-light-gray/70">
                View all pieces
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
