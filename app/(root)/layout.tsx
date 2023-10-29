import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/common/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Background Removal",
  description: "Remove background from images",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-black text-white`}>
          <Navbar />
          <section className="pt-[70px]">
            <div className="w-full">{children}</div>
          </section>
        </body>
      </html>
    </ClerkProvider>
  );
}
