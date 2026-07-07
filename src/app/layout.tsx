import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
      className={`${doran.variable} antialiased`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
