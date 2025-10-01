import type { Metadata } from "next";
import { Inter, Libre_Bodoni } from "next/font/google";
import "./globals.css";

// Fonts
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const libreBodoni = Libre_Bodoni({
  variable: "--font-libre-bodoni",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "88 Barbershop",
  description: "Look sharp. Feel Fresh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${libreBodoni.variable} bg-bg1 text-text antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
