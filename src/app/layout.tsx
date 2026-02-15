import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Purandhara Everest Academy | Best School in Dang, Nepal",
    template: "%s | Purandhara Everest Academy"
  },
  description: "Purandhara Everest Academy in Babai-3, Hanspur Dang offers world-class education with modern facilities. High SEE results, experienced teachers, and safe environment.",
  keywords: ["Best school in Dang", "School in Babai", "Secondary school Dang", "Purandhara Everest Academy", "Quality Education Nepal"],
  authors: [{ name: "PEA Admin" }],
  creator: "Purandhara Everest Academy",
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    type: "website",
    locale: "en_NP",
    url: "https://purandharaeverestacademy.edu.np",
    siteName: "Purandhara Everest Academy",
    title: "Purandhara Everest Academy | Excellence in Education",
    description: "Shaping the future through quality education in Babai-3, Hanspur Dang.",
    images: [{ url: "/images/hero1.webp" }]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
