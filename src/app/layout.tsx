import { Inter, Libre_Bodoni } from "next/font/google";
import "./globals.css";
import "./liquidGlass.css";

// Fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const libreBodoni = Libre_Bodoni({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre-bodoni",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      className={`${inter.variable} ${libreBodoni.variable} bg-white text-foreground scroll-smooth overflow-y-scroll [scrollbar-gutter:stable]`}
    >
      <body>{children}</body>
    </html>
  );
}
