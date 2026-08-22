
// app/layout.tsx
// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Place Finder",
  description: "Discover the right place around you",
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-gray-900 min-h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  );
}