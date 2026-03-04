"use client";

import { PageTransition } from "@/components/PageTransition";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

export function MainShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageTransition>{children}</PageTransition>
      <FloatingWhatsApp />
    </>
  );
}
