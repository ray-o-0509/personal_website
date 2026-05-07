import type { Metadata, Viewport } from "next";
import {
  Geist,
  Geist_Mono,
  Instrument_Serif,
  Noto_Sans_JP,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-jp",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const SITE_URL = "https://rayotsuka.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ray Otsuka｜大塚 嶺",
    template: "%s｜Ray Otsuka",
  },
  description:
    "Ray Otsuka｜大塚 嶺　ポートフォリオサイト。2005年生まれ。UI / UX デザインをしつつ、プログラミングでWEBサイトやアプリ制作をしている。",
  applicationName: "Ray Otsuka",
  authors: [{ name: "Ray Otsuka", url: SITE_URL }],
  creator: "Ray Otsuka",
  manifest: "/favicon/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      {
        rel: "mask-icon",
        url: "/favicon/safari-pinned-tab.svg",
        color: "#094b5e",
      },
    ],
  },
  openGraph: {
    type: "profile",
    url: SITE_URL,
    siteName: "Ray Otsuka｜大塚 嶺",
    title: "Ray Otsuka｜大塚 嶺",
    description:
      "Ray Otsuka｜大塚 嶺　ポートフォリオサイト。2005年生まれ。UI / UX デザインをしつつ、プログラミングでWEBサイトやアプリ制作をしている。",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ray_o_0509",
    creator: "@ray_o_0509",
    title: "Ray Otsuka｜大塚 嶺",
    description:
      "Ray Otsuka｜大塚 嶺　ポートフォリオサイト。2005年生まれ。UI / UX デザインをしつつ、プログラミングでWEBサイトやアプリ制作をしている。",
    images: ["/og-image.png"],
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  other: {
    "msapplication-TileColor": "#00aba9",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${notoSansJP.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
