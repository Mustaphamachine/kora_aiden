"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { SizeSelector, type Size } from "@/components/ui/SizeSelector";
import { useCartStore } from "@/store/cart";
import { usePreferencesStore } from "@/store/preferences";

export function ProductCard({
  id,
  name,
  imageSrc,
  onQuickView,
  className,
}: {
  id: string;
  name: string;
  imageSrc: string;
  onQuickView?: () => void;
  className?: string;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const preferredSize = usePreferencesStore((s) => s.sizePreference) as Size;
  const [size, setSize] = useState<Size>(preferredSize);

  useEffect(() => {
    setSize(preferredSize);
  }, [preferredSize]);

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 hover:border-neon-green/70 hover:shadow-neon transition",
        className
      )}
    >
      <div className="relative aspect-[4/5]">
        <Image
          src={imageSrc}
          alt={name}
          fill
          sizes="(max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute inset-x-3 bottom-3 grid translate-y-2 gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {onQuickView ? (
            <Button variant="outline" className="w-full" onClick={onQuickView}>
              Quick View
            </Button>
          ) : null}
          <div className="rounded-2xl border border-white/10 bg-black/40 p-2">
            <SizeSelector value={size} onChange={setSize} />
          </div>
          <Button
            className="w-full"
            onClick={() => {
              addItem({ id, name, imageSrc, size });
              toast.success("Added to cart", { icon: "" });
            }}
          >
            Add to Cart
          </Button>
        </div>
      </div>
      <div className="p-4">
        <div className="text-xs font-semibold tracking-[0.18em] text-light-gray">{name}</div>
      </div>
    </div>
  );
}
