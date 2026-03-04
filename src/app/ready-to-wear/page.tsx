"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import toast from "react-hot-toast";

import collectionsData from "@/data/collections.json";
import type { MediaItem } from "@/components/Lightbox";
import { MainShell } from "@/components/MainShell";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { SizeSelector, type Size } from "@/components/ui/SizeSelector";
import { useCartStore } from "@/store/cart";
import { usePreferencesStore } from "@/store/preferences";

type CollectionsJson = {
  collections: {
    readyToWear: { media: MediaItem[] };
  };
};

type Category = "All" | "Tops" | "Bottoms" | "Dresses" | "Outerwear";

type Product = {
  id: string;
  name: string;
  imageSrc: string;
  category: Category;
};

function inferCategoryFromTitle(title: string): Category {
  const t = title.toLowerCase();
  if (t.includes("dress") || t.includes("gown")) return "Dresses";
  if (t.includes("jacket") || t.includes("coat") || t.includes("outer")) return "Outerwear";
  if (t.includes("pant") || t.includes("trouser") || t.includes("bottom")) return "Bottoms";
  if (t.includes("top") || t.includes("shirt")) return "Tops";
  return "All";
}

export default function ReadyToWearPage() {
  // Unique page identifier for analytics/tracking
  const pageName = "ready-to-wear";
  
  useEffect(() => {
    document.body.setAttribute('data-page', pageName);
    return () => document.body.removeAttribute('data-page');
  }, []);
  
  const data = collectionsData as unknown as CollectionsJson;
  const media = useMemo(() => data.collections?.readyToWear?.media ?? [], [data]);
  const hero = media[0];
  const addItem = useCartStore((s) => s.addItem);
  const preferredSize = usePreferencesStore((s) => s.sizePreference) as Size;

  const products: Product[] = useMemo(() => {
    const images = media.filter((m) => m.type === "image");
    return images.map((m, idx) => {
      const name = (m.title || m.alt || `Piece ${idx + 1}`).toString();
      return {
        id: `rtw-${idx}-${m.src}`,
        name,
        imageSrc: m.src,
        category: inferCategoryFromTitle(name),
      };
    });
  }, [media]);

  const [category, setCategory] = useState<Category>("All");
  const [size, setSize] = useState<string>("All");
  const [sort, setSort] = useState<string>("Featured");

  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [quickViewId, setQuickViewId] = useState<string | null>(null);
  const [quickSize, setQuickSize] = useState<Size>(preferredSize);

  const filtered = useMemo(() => {
    let out = products;
    if (category !== "All") out = out.filter((p) => p.category === category);
    if (size !== "All") out = out;

    if (sort === "New") out = out.slice().reverse();
    return out;
  }, [products, category, size, sort]);

  const activeProduct = useMemo(
    () => filtered.find((p) => p.id === quickViewId) ?? null,
    [filtered, quickViewId]
  );

  return (
    <MainShell>
      <div className="bg-deep-black">
        <section className="relative h-[60vh] min-h-[460px] overflow-hidden">
          <div className="absolute inset-0">
            {hero?.type === "image" ? (
              <Image
                src={hero.src}
                alt={hero.alt ?? "Ready to wear"}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full bg-black" />
            )}
            <div className="absolute inset-0 bg-black/65" />
            <div className="absolute inset-0 bg-gradient-to-b from-neon-green/15 via-transparent to-black/85" />
          </div>

          <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-14 sm:px-6">
            <h1 className="text-3xl sm:text-5xl">READY-TO-WEAR SERIES</h1>
            <p className="mt-4 max-w-2xl text-sm tracking-[0.12em] text-light-gray/75 sm:text-base">
              Contemporary Excellence, Instantly Yours
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-16 sm:px-6 md:grid-cols-[260px_1fr]">
          <aside className="rounded-3xl border border-white/10 bg-black/20 p-6">
            <div className="text-xs font-semibold tracking-[0.2em] text-light-gray">FILTERS</div>

            <div className="mt-6 space-y-6">
              <div>
                <div className="text-xs tracking-[0.2em] text-light-gray/70">CATEGORIES</div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {(["All", "Tops", "Bottoms", "Dresses", "Outerwear"] as Category[]).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCategory(c)}
                      className={`h-10 rounded-full border px-3 text-xs font-semibold tracking-[0.12em] transition ${
                        category === c
                          ? "border-neon-green text-neon-green shadow-neon"
                          : "border-white/10 text-light-gray/70 hover:border-neon-green/50"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs tracking-[0.2em] text-light-gray/70">SIZE</div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {["All", "XS", "S", "M", "L", "XL"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      className={`h-10 rounded-full border px-3 text-xs font-semibold tracking-[0.12em] transition ${
                        size === s
                          ? "border-neon-green text-neon-green shadow-neon"
                          : "border-white/10 text-light-gray/70 hover:border-neon-green/50"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs tracking-[0.2em] text-light-gray/70">SORT</div>
                <select
                  className="mt-3 h-11 w-full rounded-full border border-white/10 bg-black/30 px-4 text-sm text-light-gray focus:outline-none focus:ring-2 focus:ring-neon-green"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  {["Featured", "New"].map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </aside>

          <div>
            <div className="mb-6 flex items-end justify-between">
              <div className="text-xs tracking-[0.2em] text-light-gray/70">
                {filtered.length} ITEMS
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {filtered.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  imageSrc={p.imageSrc}
                  onQuickView={() => {
                    setQuickViewId(p.id);
                    setQuickSize(preferredSize);
                    setQuickViewOpen(true);
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        <Modal
          open={quickViewOpen}
          onClose={() => setQuickViewOpen(false)}
          title={activeProduct?.name ?? "Quick View"}
        >
          {activeProduct ? (
            <div className="grid gap-6 md:grid-cols-2 md:items-start">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                <Image
                  src={activeProduct.imageSrc}
                  alt={activeProduct.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div>
                <div className="mt-6">
                  <div className="text-xs tracking-[0.2em] text-light-gray/70">SIZE</div>
                  <div className="mt-3">
                    <SizeSelector value={quickSize} onChange={setQuickSize} />
                  </div>
                </div>

                <div className="mt-8 grid gap-3">
                  <Button
                    onClick={() => {
                      addItem({
                        id: activeProduct.id,
                        name: activeProduct.name,
                        imageSrc: activeProduct.imageSrc,
                        size: quickSize,
                      });
                      toast.success("Added to cart", { icon: "" });
                      setQuickViewOpen(false);
                    }}
                  >
                    Add to Cart
                  </Button>
                  <Button variant="outline" onClick={() => setQuickViewOpen(false)}>
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-sm tracking-[0.12em] text-light-gray/70">No product found.</div>
          )}
        </Modal>

        {/* Creative Clicking Options */}
        <section className="border-y border-white/10 bg-black/20">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl">READY TO WEAR</h2>
              <p className="mt-4 text-sm tracking-[0.12em] text-light-gray/70">
                Multiple ways to get your perfect piece
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-4">
              <Link href="/gallery" className="group rounded-3xl border border-white/10 bg-deep-black/60 p-6 hover:border-neon-green/50 transition-all cursor-pointer text-center block">
                <div className="mx-auto h-10 w-10 items-center justify-center rounded-full border border-neon-green/40 text-neon-green shadow-neon flex">
                  �️
                </div>
                <h3 className="mt-4 text-sm font-semibold">View Gallery</h3>
                <p className="mt-2 text-xs leading-6 text-light-gray/70">
                  Browse full collection
                </p>
              </Link>

              <a 
                href="https://wa.me/2348133571613?text=Hi!%20I%27m%20interested%20in%20ready-to-wear%20pieces."
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-3xl border border-white/10 bg-deep-black/60 p-6 hover:border-neon-green/50 transition-all cursor-pointer text-center block"
              >
                <div className="mx-auto h-10 w-10 items-center justify-center rounded-full border border-neon-green/40 text-neon-green shadow-neon flex">
                  💬
                </div>
                <h3 className="mt-4 text-sm font-semibold">Quick Order</h3>
                <p className="mt-2 text-xs leading-6 text-light-gray/70">
                  WhatsApp for fast service
                </p>
              </a>

              <button 
                onClick={() => {
                  // Find and click cart button if it exists
                  const cartButton = document.querySelector('[data-cart-button]') as HTMLButtonElement;
                  if (cartButton) cartButton.click();
                  else toast('Cart feature coming soon!');
                }}
                className="group rounded-3xl border border-white/10 bg-deep-black/60 p-6 hover:border-neon-green/50 transition-all cursor-pointer text-center w-full"
              >
                <div className="mx-auto h-10 w-10 items-center justify-center rounded-full border border-neon-green/40 text-neon-green shadow-neon flex">
                  🛒
                </div>
                <h3 className="mt-4 text-sm font-semibold">View Cart</h3>
                <p className="mt-2 text-xs leading-6 text-light-gray/70">
                  Check your selections
                </p>
              </button>

              <Link href="/bespoke" className="group rounded-3xl border border-white/10 bg-deep-black/60 p-6 hover:border-neon-green/50 transition-all cursor-pointer text-center block">
                <div className="mx-auto h-10 w-10 items-center justify-center rounded-full border border-neon-green/40 text-neon-green shadow-neon flex">
                  ✨
                </div>
                <h3 className="mt-4 text-sm font-semibold">Custom Fit</h3>
                <p className="mt-2 text-xs leading-6 text-light-gray/70">
                  Get it tailored for you
                </p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MainShell>
  );
}
