"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/Button";
import { SizeSelector, type Size } from "@/components/ui/SizeSelector";
import { useUIStore } from "@/store/ui";
import { useCartStore } from "@/store/cart";

export function CartDrawer() {
  const open = useUIStore((s) => s.cartOpen);
  const close = useUIStore((s) => s.closeCart);

  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const setSize = useCartStore((s) => s.setSize);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            className="fixed inset-0 z-[90] bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            aria-label="Close cart"
          />
          <motion.aside
            className="fixed right-0 top-0 z-[100] h-full w-[90vw] max-w-md border-l border-white/10 bg-deep-black"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
          >
            <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
              <div className="text-xs font-semibold tracking-[0.2em] text-light-gray">
                CART ({items.length})
              </div>
              <button
                type="button"
                className="h-10 rounded-full border border-white/10 px-4 text-xs font-semibold tracking-[0.14em] text-light-gray hover:border-neon-green/60 hover:shadow-neon transition"
                onClick={close}
              >
                CLOSE
              </button>
            </div>

            <div className="h-[calc(100%-64px)] overflow-auto p-4">
              {items.length === 0 ? (
                <div className="rounded-3xl border border-white/10 bg-black/20 p-8 text-center">
                  <div className="text-sm tracking-[0.12em] text-light-gray/70">
                    Your cart is empty. Start shining!
                  </div>
                  <div className="mt-6 flex justify-center">
                    <Link href="/ready-to-wear" onClick={close}>
                      <Button>Explore RTW</Button>
                    </Link>
                  </div>
                </div>
              ) : (
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
                          <div className="mt-3">
                            <div className="text-xs tracking-[0.14em] text-light-gray/60">SIZE</div>
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

                  <div className="grid gap-3 pt-2">
                    <Link href="/cart" onClick={close}>
                      <Button className="w-full">View Cart</Button>
                    </Link>
                    <Button variant="outline" className="w-full" onClick={close}>
                      Continue Shopping
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
