"use client";

import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  const whatsappUrl = "https://wa.me/2348133571613?text=Hi!%20I'm%20interested%20in%20KORA%20AIDEN%20pieces.";
  
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 transition-all duration-300 hover:scale-110 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute bottom-full right-0 mb-2 hidden w-max rounded-lg bg-gray-900 px-3 py-2 text-sm text-white group-hover:block">
        Chat with us on WhatsApp
      </span>
    </a>
  );
}
