import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Simplified import for speed
import "./globals.css";
import Header from "@/components/Header";

// Keeping it simple with Inter for now
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Charpak Ltd | Premium Thermoformed Packaging",
  description: "Market leaders in design-led thermoformed packaging solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
