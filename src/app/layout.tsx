import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { CartDrawer } from "@/components/CartDrawer";
import { SizePreferenceBar } from "@/components/SizePreferenceBar";
import { ToasterProvider } from "@/components/ToasterProvider";

const fontHeading = Orbitron({
  variable: "--font-heading",
  subsets: ["latin"],
});

const fontBody = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KORA AIDEN",
  description: "With Aiden the Fiery one, you shine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontHeading.variable} ${fontBody.variable} min-h-screen bg-deep-black font-body text-light-gray antialiased`}
      >
        <Navbar />
        <main className="pt-16">
          <SizePreferenceBar />
          {children}
        </main>
        <Footer />
        <ToasterProvider />
        <CartDrawer />
      </body>
    </html>
  );
}
