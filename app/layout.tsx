import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://waliandua.tomohon.go.id"),
  title: "Kelurahan Walian Dua | Portal Resmi Kota Tomohon",
  description:
    "Situs resmi Pemerintahan Kelurahan Walian Dua, Kecamatan Tomohon Selatan, Kota Tomohon, Sulawesi Utara. Pelayanan administrasi kependudukan mandiri, transparansi publik, dan kearifan Minahasa Sitou Timou Tumou Tou.",
  keywords: [
    "Walian Dua",
    "Kelurahan Walian Dua",
    "Tomohon Selatan",
    "Kota Tomohon",
    "Sulawesi Utara",
    "Pelayanan Kelurahan",
    "Lurah Marlon Taroreh",
    "GMIM Bukit Zaitun Walian Dua",
    "TIFF Tomohon",
    "Perkebunan Wawo",
  ],
  authors: [{ name: "Pemerintah Kelurahan Walian Dua" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/images/logo-tomohon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Kelurahan Walian Dua - Kecamatan Tomohon Selatan, Kota Tomohon",
    description:
      "Portal Resmi Informasi, Layanan Publik, dan Profil Wilayah Kelurahan Walian Dua, Kota Tomohon, Sulawesi Utara.",
    images: [
      {
        url: "/images/tomohon-overview.jpg",
        width: 1280,
        height: 800,
        alt: "Kelurahan Walian Dua Kota Tomohon",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
