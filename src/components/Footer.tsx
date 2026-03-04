import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-deep-black">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="space-y-4">
          <h3 className="font-heading text-xs tracking-[0.2em] text-light-gray">ABOUT KORA AIDEN</h3>
          <p className="text-sm leading-7 text-light-gray/70">
            A fashion house where fire meets vision—crafted to empower, provoke, and let you shine.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="font-heading text-xs tracking-[0.2em] text-light-gray">COLLECTIONS</h3>
          <div className="flex flex-col gap-2 text-sm">
            <Link className="text-light-gray/70 hover:text-neon-green transition" href="/bespoke">
              Bespoke
            </Link>
            <Link className="text-light-gray/70 hover:text-neon-green transition" href="/ready-to-wear">
              Ready-to-Wear
            </Link>
            <Link className="text-light-gray/70 hover:text-neon-green transition" href="/custom-bridal">
              Custom/Bridal
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-heading text-xs tracking-[0.2em] text-light-gray">SUPPORT</h3>
          <div className="flex flex-col gap-2 text-sm">
            <Link className="text-light-gray/70 hover:text-neon-green transition" href="/contact">
              Contact
            </Link>
            <span className="text-light-gray/70">Shipping</span>
            <span className="text-light-gray/70">Returns</span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-heading text-xs tracking-[0.2em] text-light-gray">FOLLOW</h3>
          <div className="flex items-center gap-3">
            <a
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neon-green/30 text-neon-green hover:border-neon-green hover:shadow-neon transition"
              href="#"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neon-green/30 text-neon-green hover:border-neon-green hover:shadow-neon transition"
              href="#"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neon-green/30 text-neon-green hover:border-neon-green hover:shadow-neon transition"
              href="#"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>

          <form className="mt-4 flex gap-2" name="newsletter" method="post">
            <input
              className="h-11 w-full rounded-full border border-white/10 bg-black/30 px-4 text-sm text-light-gray placeholder:text-light-gray/40 focus:outline-none focus:ring-2 focus:ring-neon-green"
              placeholder="Email address"
              type="email"
              name="email"
            />
            <button
              type="submit"
              className="h-11 rounded-full bg-neon-green px-5 text-sm font-semibold text-deep-black shadow-neon hover:shadow-neon-lg transition"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="mx-auto max-w-6xl px-4 text-center text-xs tracking-[0.12em] text-light-gray/60 sm:px-6">
          © 2024 KORA AIDEN. With Aiden the Fiery one, you shine.
        </div>
      </div>
    </footer>
  );
}
