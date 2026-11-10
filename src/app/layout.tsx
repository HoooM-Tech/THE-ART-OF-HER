import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "THE ART OF HER — Issue 032 | A Private Birthday Editorial",
  description: "A private digital editorial publication celebrating thirty-two years of grace, memories, and love.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-ivory text-charcoal min-h-screen selection:bg-burgundy selection:text-ivory antialiased">
        {children}
      </body>
    </html>
  );
}

