"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useScrolled } from "@/hooks/useScrolled";
import { useCart } from "@/lib/cart-context";

const IconBag = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const IconGrid = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
  </svg>
);

const IconSliders = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" />
    <circle cx="9" cy="6" r="2" fill="currentColor" stroke="none" />
    <circle cx="15" cy="12" r="2" fill="currentColor" stroke="none" />
    <circle cx="9" cy="18" r="2" fill="currentColor" stroke="none" />
  </svg>
);

const IconBook = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const IconDots = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
  </svg>
);

const pillLinks = [
  { href: "/products", label: "Shop", icon: <IconBag /> },
  { href: "/compare", label: "Compare", icon: <IconSliders /> },
  { href: "/stories", label: "Stories", icon: <IconBook /> },
];

const overflowLinks = [
  { href: "/support", label: "Support" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const scrolled = useScrolled(20);
  const { totalItems, toggleCart } = useCart();
  const [sheetOpen, setSheetOpen] = useState(false);
  const pathname = usePathname();

  const allDesktopLinks = [...pillLinks, ...overflowLinks];

  return (
    <>
      {/* ── Top bar ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-black/92 backdrop-blur-xl border-b border-white/08" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">
          <Link href="/" className="font-bebas text-white text-xl tracking-wider leading-none">
            iDesire
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {allDesktopLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="nav-link text-[12px] font-semibold text-white/60 hover:text-white uppercase tracking-widest transition-colors font-syne"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Cart */}
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
        </div>
      </header>

      {/* ── Mobile pill nav ── */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-1 bg-black/70 backdrop-blur-2xl border border-white/12 rounded-full px-2 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">

          {pillLinks.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-full transition-all duration-200 ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                <span className={`transition-colors ${active ? "text-apple-blue" : ""}`}>
                  {l.icon}
                </span>
                <span className="font-syne text-[9px] uppercase tracking-widest leading-none">
                  {l.label}
                </span>
              </Link>
            );
          })}

          {/* Divider */}
          <div className="w-px h-7 bg-white/10 mx-1" />

          {/* Cart */}
          <button
            onClick={toggleCart}
            className="relative flex flex-col items-center gap-1 px-4 py-2 rounded-full text-white/40 hover:text-white/70 transition-colors"
            aria-label="Cart"
          >
            <IconBag />
            <span className="font-syne text-[9px] uppercase tracking-widest leading-none">Cart</span>
            {totalItems > 0 && (
              <span className="absolute top-1.5 right-2.5 bg-apple-blue text-white text-[8px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full leading-none">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </button>

          {/* More (···) */}
          <button
            onClick={() => setSheetOpen(true)}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-full transition-all duration-200 ${
              sheetOpen ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70"
            }`}
            aria-label="More"
          >
            <IconDots />
            <span className="font-syne text-[9px] uppercase tracking-widest leading-none">More</span>
          </button>
        </div>
      </div>

      {/* ── Overflow sheet ── */}
      {/* Backdrop */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          sheetOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSheetOpen(false)}
      />

      {/* Sheet panel */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 z-[45] transition-transform duration-300 ease-out ${
          sheetOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="bg-[#0a0a0a] border-t border-white/10 rounded-t-3xl pt-3 pb-10 px-6">
          {/* Handle */}
          <div className="w-10 h-1 bg-white/15 rounded-full mx-auto mb-8" />

          <nav className="flex flex-col gap-1">
            {overflowLinks.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setSheetOpen(false)}
                  className={`flex items-center justify-between px-4 py-4 rounded-2xl transition-colors ${
                    active ? "bg-white/08 text-white" : "text-white/50 hover:bg-white/05 hover:text-white"
                  }`}
                >
                  <span className="font-bebas text-3xl leading-none tracking-wide">{l.label}</span>
                  {active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-apple-blue" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 pt-6 border-t border-white/06">
            <p className="font-syne text-[10px] uppercase tracking-[0.3em] text-white/20 text-center">
              Wangchhu Lam, Thimphu · Bhutan
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
