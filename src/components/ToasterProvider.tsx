"use client";

import { Toaster } from "react-hot-toast";

export function ToasterProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: "#0A0A0A",
          color: "#E5E5E5",
          border: "1px solid rgba(158, 255, 0, 0.35)",
        },
      }}
    />
  );
}
