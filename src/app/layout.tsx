import { Inter, Libre_Bodoni, Merriweather } from "next/font/google";
import "./globals.css";
import "./liquidGlass.css";

// Fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const libreBodoni = Libre_Bodoni({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre-bodoni",
});
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["900"],
  variable: "--font-merriweather",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      className={`${merriweather.variable} ${inter.variable} ${libreBodoni.variable} bg-white text-foreground scroll-smooth overflow-y-scroll [scrollbar-gutter:stable]`}
    >
      <body>{children}</body>
    </html>
  );
}
