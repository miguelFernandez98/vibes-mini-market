import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
  variable: "--font-roboto",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mig-market.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mig Market | Tu tienda de confianza",
    template: "%s | Mig Market",
  },
  description:
    "Los mejores productos a los mejores precios. Encuentra electronics, ropa, joyeria y mas en Mig Market. Envio gratis en compras mayores a $50.",
  keywords: [
    "tienda online",
    "comprar productos",
    "electronics",
    "ropa",
    "joyeria",
    "envio gratis",
    "mejores precios",
    "Mig Market",
  ],
  authors: [{ name: "Mig Market" }],
  creator: "Mig Market",
  publisher: "Mig Market",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_US",
    url: siteUrl,
    siteName: "Mig Market",
    title: "Mig Market | Tu tienda de confianza",
    description:
      "Los mejores productos a los mejores precios. Encuentra electronics, ropa, joyeria y mas. Envio gratis en compras mayores a $50.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mig Market - Tu tienda de confianza",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mig Market | Tu tienda de confianza",
    description:
      "Los mejores productos a los mejores precios. Envio gratis en compras mayores a $50.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#00703C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={roboto.variable}>
      <head>
        <link rel="canonical" href={siteUrl} />
      </head>
      <body className={`${roboto.className} min-h-screen flex flex-col bg-[#f5f5f5]`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
