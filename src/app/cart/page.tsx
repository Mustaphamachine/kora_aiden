"use client";

import Image from "next/image";
import Link from "next/link";

import { MainShell } from "@/components/MainShell";
import { Button } from "@/components/ui/Button";
import { SizeSelector, type Size } from "@/components/ui/SizeSelector";
import { useCartStore } from "@/store/cart";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const setSize = useCartStore((s) => s.setSize);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <MainShell>
      <div className="bg-deep-black">
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="mb-10 text-center">
            <h1 className="text-3xl sm:text-5xl">CART</h1>
          </div>

          {items.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-black/20 p-10 text-center">
              <div className="text-sm tracking-[0.12em] text-light-gray/70">
                Your cart is empty. Start shining!
              </div>
              <div className="mt-8 flex justify-center gap-3">
                <Link href="/ready-to-wear">
                  <Button>Continue Shopping</Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-[1fr_320px]">
              <div className="space-y-4">
                {items.map((i) => (
                  <div
                    key={i.key}
                    className="flex gap-4 rounded-3xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="relative h-24 w-20 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                      {i.imageSrc ? (
                        <Image
                          src={i.imageSrc}
                          alt={i.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="text-xs font-semibold tracking-[0.18em] text-light-gray">
                          {i.name}
                        </div>
                        <div className="mt-4">
                          <div className="text-xs tracking-[0.2em] text-light-gray/60">SIZE</div>
                          <div className="mt-2">
                            <SizeSelector
                              value={((i.size as Size) ?? "M") as Size}
                              onChange={(next) => setSize(i.key, next)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 p-1">
                          <button
                            type="button"
                            className="h-9 w-9 rounded-full text-light-gray hover:bg-white/5"
                            onClick={() => setQuantity(i.key, i.quantity - 1)}
                            aria-label="Decrease"
                          >
                            -
                          </button>
                          <div className="min-w-8 text-center text-sm text-light-gray">
                            {i.quantity}
                          </div>
                          <button
                            type="button"
                            className="h-9 w-9 rounded-full text-light-gray hover:bg-white/5"
                            onClick={() => setQuantity(i.key, i.quantity + 1)}
                            aria-label="Increase"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          className="text-xs font-semibold tracking-[0.16em] text-neon-green hover:text-light-gray"
                          onClick={() => removeItem(i.key)}
                        >
                          REMOVE
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="h-fit rounded-3xl border border-white/10 bg-black/20 p-6">
                <div className="text-xs font-semibold tracking-[0.2em] text-light-gray">SUMMARY</div>
                <div className="mt-8 grid gap-3">
                  <Button>Checkout</Button>
                  <Link href="/gallery">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </MainShell>
  );
}
