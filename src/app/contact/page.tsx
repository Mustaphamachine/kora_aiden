import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  return (
    <div className="bg-deep-black">
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mb-10 text-center">
          <h1 className="text-3xl sm:text-5xl">CONTACT</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm tracking-[0.12em] text-light-gray/70">
            Share your vision—bespoke, RTW, or custom bridal.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            className="rounded-3xl border border-white/10 bg-black/20 p-8"
          >
            <input type="hidden" name="form-name" value="contact" />

            <div className="grid gap-4">
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
              <input
                className="h-11 w-full rounded-full border border-white/10 bg-black/30 px-4 text-sm text-light-gray placeholder:text-light-gray/40 focus:outline-none focus:ring-2 focus:ring-neon-green"
                name="phone"
                placeholder="Phone"
              />
              <select
                className="h-11 w-full rounded-full border border-white/10 bg-black/30 px-4 text-sm text-light-gray focus:outline-none focus:ring-2 focus:ring-neon-green"
                name="service"
                defaultValue="Bespoke"
              >
                <option value="Bespoke">Bespoke</option>
                <option value="RTW">RTW</option>
                <option value="Custom/Bridal">Custom/Bridal</option>
              </select>
              <textarea
                className="min-h-36 w-full rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-light-gray placeholder:text-light-gray/40 focus:outline-none focus:ring-2 focus:ring-neon-green"
                name="message"
                placeholder="Message"
                required
              />

              <Button type="submit">Submit</Button>
            </div>
          </form>

          <div className="rounded-3xl border border-white/10 bg-black/20 p-8">
            <div className="text-xs font-semibold tracking-[0.2em] text-light-gray">CONTACT INFO</div>
            <div className="mt-4 space-y-2 text-sm text-light-gray/70">
              <div>Address: (placeholder)</div>
              <div>Phone: (placeholder)</div>
              <div>Email: (placeholder)</div>
              <div>Social: (placeholder)</div>
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
              <div className="flex h-64 items-center justify-center text-sm tracking-[0.12em] text-light-gray/50">
                Google Maps Embed Placeholder
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
