import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ramadhanmubarok2026.vercel.app/"),
  title: {
    default: "Ramadhan 2026 - Digital Experience",
    template: "%s | muhsalfazi",
  },
  description:
    "Jadwal waktu sholat Ramadhan 1447 H / 2026 untuk seluruh kota di Indonesia. Tampilkan Subuh, Dzuhur, Ashar, Maghrib, dan Isya lengkap dengan tanggal Hijriyah dan countdown real-time.",
  keywords: [
    "jadwal sholat ramadhan 2026",
    "waktu sholat ramadhan 1447",
    "jadwal imsakiyah 2026",
    "waktu sholat indonesia",
    "jadwal sholat karawang",
    "jadwal sholat jakarta",
    "subuh dzuhur ashar maghrib isya",
    "ramadhan 1447 hijriyah",
    "imsakiyah ramadhan",
  ],
  authors: [{ name: "Jadwal Sholat Ramadhan 2026" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    title: "Jadwal Sholat Ramadhan 2026 | Waktu Sholat Indonesia",
    description:
      "Jadwal waktu sholat Ramadhan 1447 H untuk kota-kota di Indonesia dengan countdown real-time.",
    siteName: "Jadwal Sholat Ramadhan 2026",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jadwal Sholat Ramadhan 2026",
    description:
      "Jadwal waktu sholat Ramadhan 1447 H untuk kota-kota di Indonesia.",
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#050d1a",
};


import Navigation from "@/components/Navigation";
import SignatureFooter from "@/components/SignatureFooter";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Amiri:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>
          {children}
          <SignatureFooter />
          <Navigation />
        </ThemeProvider>
      </body>
    </html>
  );
}
