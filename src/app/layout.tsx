import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Inter, Alex_Brush, Amiri } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Imane & Mahdi — Wedding Invitation",
  description:
    "You are cordially invited to celebrate the union of Imane & Mahdi. Join us for a day filled with love, joy, and unforgettable memories.",
  keywords: ["wedding", "invitation", "Imane", "Mahdi", "celebration"],
  openGraph: {
    title: "Imane & Mahdi — Wedding Invitation",
    description: "Celebrate love with Imane & Mahdi",
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
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${inter.variable} ${alexBrush.variable} ${amiri.variable} antialiased`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
