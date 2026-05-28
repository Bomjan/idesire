import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "iDesire — Bhutan's Premier Apple Store",
  description:
    "iDesire is Bhutan's premier destination for Apple devices. Shop the latest iPhone, Mac, iPad, Apple Watch, and AirPods in Thimphu.",
  keywords: ["Apple", "Bhutan", "iPhone", "MacBook", "iPad", "Thimphu", "iDesire"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="flex flex-col min-h-full">
        <CartProvider>
          <Navbar />
          <main className="flex-1 pb-28 md:pb-0">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
