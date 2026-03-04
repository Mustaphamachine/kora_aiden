"use client";

import { useRef } from "react";

import { cn } from "@/lib/utils";

export function VideoPlayer({
  src,
  className,
  poster,
  autoplayOnHover,
}: {
  src: string;
  className?: string;
  poster?: string;
  autoplayOnHover?: boolean;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);

  return (
    <video
      ref={ref}
      autoPlay={!autoplayOnHover}
      loop
      muted
      playsInline
      poster={poster}
      className={cn("h-full w-full object-cover", className)}
      onMouseEnter={() => {
        if (!autoplayOnHover) return;
        void ref.current?.play();
      }}
      onMouseLeave={() => {
        if (!autoplayOnHover) return;
        ref.current?.pause();
      }}
      onClick={() => {
        const v = ref.current;
        if (!v) return;
        if (v.paused) void v.play();
        else v.pause();
      }}
      controls={false}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
