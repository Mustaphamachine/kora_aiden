"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/useMounted";
import { useCartStore } from "@/store/cart";
import { useUIStore } from "@/store/ui";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/bespoke", label: "BESPOKE" },
  { href: "/ready-to-wear", label: "READY-TO-WEAR" },
  { href: "/custom-bridal", label: "CUSTOM/BRIDAL" },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mounted = useMounted();
  const cartCount = useCartStore((s) => s.totalItems());
  const openCart = useUIStore((s) => s.openCart);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const headerClass = useMemo(
    () =>
      cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        isScrolled ? "bg-deep-black/95 backdrop-blur border-b border-white/10" : "bg-transparent"
      ),
    [isScrolled]
  );

  return (
    <header className={headerClass}>
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="relative flex items-center gap-3">
          <div className="relative h-8 w-28">
            <Image
              src="/logo.png"
              alt="KORA AIDEN"
              fill
              sizes="112px"
              className="object-contain"
              priority
            />
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group relative text-xs font-semibold tracking-[0.2em] text-light-gray/90 hover:text-light-gray transition-colors"
            >
              {l.label}
              <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-neon-green shadow-neon transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 hover:border-neon-green/60 hover:shadow-neon transition"
            aria-label="Search"
          >
            <Search className="h-5 w-5 text-light-gray" />
          </button>
          <button
            type="button"
            className="hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 hover:border-neon-green/60 hover:shadow-neon transition"
            aria-label="Account"
          >
            <User className="h-5 w-5 text-light-gray" />
          </button>
          <button
            type="button"
            className="relative hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 hover:border-neon-green/60 hover:shadow-neon transition"
            aria-label="Cart"
            onClick={openCart}
          >
            <ShoppingBag className="h-5 w-5 text-light-gray" />
            <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-neon-green px-1 text-[10px] font-bold text-deep-black">
              {mounted ? cartCount : 0}
            </span>
          </button>

          <button
            type="button"
            className="inline-flex md:hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 hover:border-neon-green/60 hover:shadow-neon transition"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5 text-light-gray" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 z-50 bg-black/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            />
            <motion.aside
              className="fixed right-0 top-0 z-50 h-full w-[84vw] max-w-sm bg-deep-black border-l border-white/10"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
            >
              <div className="flex h-16 items-center justify-between px-4">
                <span className="text-xs font-semibold tracking-[0.2em] text-light-gray">MENU</span>
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 hover:border-neon-green/60 hover:shadow-neon transition"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close"
                >
                  <X className="h-5 w-5 text-light-gray" />
                </button>
              </div>
              <div className="flex flex-col gap-1 px-4 pb-8">
                {navLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-3 py-3 text-sm font-semibold tracking-[0.2em] text-light-gray hover:bg-white/5 hover:text-neon-green transition"
                  >
                    {l.label}
                  </Link>
                ))}
                <Link
                  href="/cart"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 rounded-xl px-3 py-3 text-sm font-semibold tracking-[0.2em] text-light-gray hover:bg-white/5 hover:text-neon-green transition"
                >
                  CART
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
