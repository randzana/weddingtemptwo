import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Inter, Alex_Brush, Amiri } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-elegant",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const alexBrush = Alex_Brush({
  variable: "--font-script",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

const amiri = Amiri({
  variable: "--font-arabic",
  subsets: ["arabic", "latin"],
  display: "swap",
  weight: ["400", "700"],
});

const doran = localFont({
  src: "../../public/fonts/Doran-Bold.otf",
  variable: "--font-doran",
  display: "swap",
});

export const metadata: Metadata = {
  title: "دییە و کاردۆ — بانگهێشتنامەی دەستنیشانکردن",
  description:
    "شەرەفمەندین بە بانگهێشتکردنی ئێوە بۆ بەشداریکردن لە ئاهەنگی دەستنیشانکردنی دییە و کاردۆ. لەگەڵمان بن بۆ بەسەربردنی ڕۆژێکی پڕ لە خۆشەویستی، شادی، و یادگاری بیرنەچوونەوە.",
  keywords: ["دەستنیشانکردن", "بانگهێشتنامە", "دییە", "کاردۆ", "ئاهەنگ"],
  openGraph: {
    title: "دییە و کاردۆ — بانگهێشتنامەی دەستنیشانکردن",
    description: "خۆشەویستی لەگەڵ دییە و کاردۆ بەرز ڕابگرە",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ckb"
      dir="rtl"
      className={`${playfair.variable} ${cormorant.variable} ${inter.variable} ${alexBrush.variable} ${amiri.variable} ${doran.variable} antialiased`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
