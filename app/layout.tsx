import type { Metadata, Viewport } from "next";
import { Inter_Tight, Montserrat } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Preloader } from "@/components/layout/Preloader";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  style: ["normal", "italic"],
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Ecully Charbon — Hamburguer na brasa em Perdizes",
    template: "%s · Ecully Charbon",
  },
  description: site.description,
  keywords: [
    "hamburgueria",
    "hambúrguer artesanal",
    "Black Angus",
    "Perdizes",
    "São Paulo",
    "Ecully Charbon",
    "restaurante",
    "carvão",
    "Mibrasa",
  ],
  authors: [{ name: "Ecully Charbon" }],
  category: "restaurant",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.name,
    title: "Ecully Charbon — Hamburguer na brasa em Perdizes",
    description: site.description,
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ecully Charbon — primitivo no fogo, contemporâneo no sabor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ecully Charbon — Hamburguer na brasa em Perdizes",
    description: site.description,
    images: ["/opengraph-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0A09",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: site.name,
  alternateName: "Charbon",
  description: site.description,
  url: site.url,
  image: [`${site.url}/images/ambiente.webp`, `${site.url}/images/fogo.webp`],
  logo: `${site.url}/brand/charbon-logo-light.png`,
  telephone: "+55-11-3871-1993",
  priceRange: "$$$",
  servesCuisine: ["Hamburgueria", "Contemporânea", "Carnes na brasa"],
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "17:00",
      closes: "23:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "16:00",
      closes: "23:00",
    },
  ],
  hasMenu: `${site.url}/cardapio`,
  acceptsReservations: "True",
  sameAs: [site.socials.instagram, site.socials.facebook],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${interTight.variable}`}>
      <body>
        <a
          href="#conteudo"
          className="sr-only z-[130] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-full focus:bg-creme focus:px-5 focus:py-3 focus:text-xs focus:uppercase focus:tracking-[0.2em] focus:text-carvao"
        >
          Pular para o conteúdo
        </a>

        <SmoothScroll>
          <Preloader />
          <Header />
          <main id="conteudo">{children}</main>
          <Footer />
        </SmoothScroll>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
