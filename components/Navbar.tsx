"use client";

import Link from "next/link";
import { useState } from "react";
import { useScrolled } from "@/hooks/useScrolled";
import { useCart } from "@/lib/cart-context";

export default function Navbar() {
  const scrolled = useScrolled(20);
  const { totalItems, toggleCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/92 backdrop-blur-xl border-b border-white/08"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">
          <Link
            href="/"
            className="font-bebas text-white text-xl tracking-wider leading-none"
          >
            iDesire
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="nav-link text-[12px] font-semibold text-white/60 hover:text-white uppercase tracking-widest transition-colors font-syne"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleCart}
              className="relative p-1 text-white/60 hover:text-white transition-colors"
              aria-label="Open cart"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-apple-blue text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center leading-none">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-1 text-white/60 hover:text-white transition-colors"
              aria-label="Open menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-black flex flex-col">
          <div className="px-6 h-12 flex items-center justify-between border-b border-white/10">
            <span className="font-bebas text-white text-xl tracking-wider">iDesire</span>
            <button onClick={() => setMobileOpen(false)} className="p-1 text-white/50 hover:text-white" aria-label="Close">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col px-8 pt-14 gap-10">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="font-bebas text-white hover:text-apple-blue transition-colors"
                style={{ fontSize: "3.5rem", lineHeight: 0.95 }}
              >
                {l.label.toUpperCase()}
              </Link>
            ))}
          </nav>
          <div className="mt-auto px-8 pb-12">
            <p className="font-syne text-xs text-white/20 uppercase tracking-widest">
              Thimphu, Bhutan
            </p>
          </div>
        </div>
      )}
    </>
  );
}
