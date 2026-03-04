"use client";

import { usePathname } from "next/navigation";

import { SizeSelector, type Size } from "@/components/ui/SizeSelector";
import { usePreferencesStore } from "@/store/preferences";

export function SizePreferenceBar() {
  const pathname = usePathname();
  const size = usePreferencesStore((s) => s.sizePreference);
  const setSize = usePreferencesStore((s) => s.setSizePreference);

  if (pathname === "/") return null;

  return (
    <div className="sticky top-16 z-40 border-b border-white/10 bg-deep-black/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="text-xs font-semibold tracking-[0.2em] text-light-gray/80">
          SIZE PREFERENCE
        </div>
        <div className="max-w-sm">
          <SizeSelector value={size as Size} onChange={(v) => setSize(v)} />
        </div>
      </div>
    </div>
  );
}
