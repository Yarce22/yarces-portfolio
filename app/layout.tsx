import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Alejandro Mira | Desarrollador de Software",
    template: "%s | Alejandro Mira",
  },
  description:
    "Desarrollador de Software Full Stack especializado en soluciones web y backend modernas, escalables y de alto rendimiento.",
  icons: {
    icon: "/logo_AM.svg",
    apple: "/logo_AM.svg",
  },
  openGraph: {
    images: ["/og-image.png"],
    locale: "es_CO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${jetbrainsMono.variable} ${spaceGrotesk.variable} ${inter.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
