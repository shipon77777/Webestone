import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import Footer from "@/components/Footer";
import WhatsAppChat from "@/components/WhatsAppChat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WeBestOne - Your Guide in Automated World",
  description: "High-end web agency specializing in AI-powered SEO, AEO, and GEO.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <BackgroundEffects />
        <Header />
        {children}
        <Footer />
        <WhatsAppChat />
      </body>
    </html>
  );
}
