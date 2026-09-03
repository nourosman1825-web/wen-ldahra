import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import localFont from "next/font/local";
import QueryProvider from "./lib/QueryProvider";

const prociono = localFont({
    src: "./fonts/Prociono-Regular.ttf",
    variable: "--font-prociono",
    weight: "400",
});

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
            <body className={`${prociono.variable} antialiased bg-gray-50 text-gray-900 min-h-screen`}>
                <QueryProvider>
                    <Navbar />
                    {children}
                    <Footer />
                </QueryProvider>
            </body>
        </html>
    );
}