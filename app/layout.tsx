import type { Metadata } from "next";
import { DM_Sans, Outfit, Poppins } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Romeo Foundation | Every Mind Belongs",
  description:
    "The Romeo Foundation supports autistic individuals and their families across Ghana through early intervention, trauma-informed care, and community advocacy.",
  keywords: [
    "autism support Ghana",
    "autistic children foundation",
    "neurodiversity advocacy",
    "family navigation autism",
    "early intervention therapy",
    "sensory-informed care",
  ],
  authors: [{ name: "Romeo Owusu Ansah", url: "https://wa.me/233592945680" }],
  creator: "Romeo Foundation",
  publisher: "Romeo Foundation",
  robots: "index, follow",
  openGraph: {
    title: "Romeo Foundation | Every Mind Belongs",
    description: "Building an autism-informed world through care, guidance, and policy advocacy.",
    siteName: "Romeo Foundation",
    locale: "en_GH",
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
      className={`${dmSans.variable} ${outfit.variable} ${poppins.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
