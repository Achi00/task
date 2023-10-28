import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import { Inter } from "next/font/google";
import "../globals.css";

export const metadata = {
  title: "Background Removal",
  description: "Remove background from images",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-white`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
