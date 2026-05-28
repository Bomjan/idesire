"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products, categories, Category, formatPrice, Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import ScrollReveal3D from "@/components/ScrollReveal3D";
import { useCart } from "@/lib/cart-context";

/* ── Full-screen editorial feed card ── */
function FeedCard({ product, index, total }: { product: Product; index: number; total: number }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  const whatsapp = `https://wa.me/97517000000?text=${encodeURIComponent(
    `Hello iDesire! 👋\n\nI'm interested in the *${product.name}* (${formatPrice(product.price)}).\n\nPlease share availability and any offers.`
  )}`;

  return (
    <div className="relative w-full h-full snap-start snap-always overflow-hidden bg-black flex flex-col">

      {/* ── Top bar: counter + category ── */}
      <div className="relative z-10 flex items-center justify-between px-5 pt-4 pb-2 shrink-0">
        <span className="font-syne text-[10px] uppercase tracking-[0.3em] text-white/30">
          {product.category}
        </span>
        <span className="font-syne text-[10px] text-white/20 tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* ── Giant background product name (decorative) ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="font-bebas text-white/[0.04] leading-none text-center px-2"
          style={{ fontSize: "clamp(4rem, 28vw, 10rem)", wordBreak: "break-word" }}
        >
          {product.name}
        </span>
      </div>

      {/* ── Product image — contained, exhibition style ── */}
      <div className="relative flex-1 mx-6 my-2">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain drop-shadow-[0_32px_64px_rgba(0,0,0,0.8)]"
          sizes="100vw"
          priority
        />
        {/* Subtle reflection */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* ── Badge ── */}
      {product.badge && (
        <span className="absolute top-14 left-5 z-10 font-syne text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 bg-apple-blue text-white">
          {product.badge}
        </span>
      )}

      {/* ── Bottom info panel ── */}
      <div className="relative z-10 shrink-0 px-5 pt-4 pb-6">

        {/* Thin rule */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1 bg-white/10" />
          <span className="font-syne text-[8px] uppercase tracking-[0.4em] text-white/20">iDesire</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <h2 className="font-bebas text-white leading-none" style={{ fontSize: "clamp(1.8rem, 7vw, 2.4rem)" }}>
          {product.name}
        </h2>
        <p className="font-syne text-white/40 text-[12px] mt-1 mb-5 leading-snug">
          {product.tagline}
        </p>

        {/* Price + actions row */}
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="font-syne text-white/30 text-[9px] uppercase tracking-widest mb-0.5">Price</p>
            <p className="font-bebas text-white text-2xl leading-none">{formatPrice(product.price)}</p>
          </div>

          <button
            onClick={handleAdd}
            className={`flex items-center gap-2 px-4 py-2.5 font-syne text-[10px] uppercase tracking-widest transition-all duration-300 ${
              added
                ? "bg-apple-blue text-white"
                : "bg-white text-black hover:bg-apple-gray"
            }`}
          >
            {added ? (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                Added
              </>
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                Add
              </>
            )}
          </button>

          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 border border-white/15 font-syne text-[10px] uppercase tracking-widest text-white/50 hover:border-white/40 hover:text-white transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.557 4.126 1.532 5.86L.057 23.804a.5.5 0 0 0 .614.666l6.184-1.62A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.93 9.93 0 0 1-5.163-1.445l-.371-.22-3.843 1.007 1.027-3.746-.242-.386A9.935 9.935 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Ask
          </a>
        </div>
      </div>
    </div>
  );
}

/* ── Products content ── */
function ProductsContent() {
  const searchParams = useSearchParams();
  const [active, setActive] = useState<"All" | Category>("All");

  useEffect(() => {
    const cat = searchParams.get("category") as Category | null;
    if (cat && (categories as string[]).includes(cat)) setActive(cat);
  }, [searchParams]);

  const filtered =
    active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <>
      {/* Filter bar */}
      <div className="sticky top-12 z-30 bg-white border-b border-black/08">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide">
            {(["All", ...categories] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat as typeof active)}
                className={`flex-shrink-0 px-5 py-3.5 text-[11px] font-bold uppercase tracking-widest transition-all duration-200 font-syne border-b-2 ${
                  active === cat
                    ? "border-black text-black"
                    : "border-transparent text-black/30 hover:text-black"
                }`}
              >
                {cat}
              </button>
            ))}
            <span className="ml-auto text-[11px] font-syne text-black/30 uppercase tracking-widest pr-2 flex-shrink-0">
              {filtered.length} items
            </span>
          </div>
        </div>
      </div>

      {/* Mobile: vertical snap feed */}
      {filtered.length > 0 ? (
        <div
          className="sm:hidden overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
          style={{ height: "calc(100dvh - 96px)" }}
        >
          {filtered.map((product, i) => (
            <FeedCard key={product.id} product={product} index={i} total={filtered.length} />
          ))}
        </div>
      ) : (
        <div className="sm:hidden text-center py-24 text-black/30">
          <p className="font-bebas text-4xl">No products found</p>
        </div>
      )}

      {/* Desktop: grid */}
      <section className="hidden sm:block bg-white min-h-screen py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
            {filtered.map((product, i) => (
              <ScrollReveal3D key={product.id} delay={Math.min(i * 55, 350)} rotateX={16}>
                <ProductCard product={product} />
              </ScrollReveal3D>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-24 text-black/30">
              <p className="font-bebas text-4xl">No products found</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default function ProductsPage() {
  return (
    <>
      {/* Header — hidden on mobile to maximise feed space */}
      <section className="hidden sm:block bg-black pt-28 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="font-syne text-[10px] font-semibold text-apple-blue uppercase tracking-[0.25em] mb-5 animate-fade-up">
            iDesire Store
          </p>
          <h1
            className="font-bebas text-white animate-fade-up-1 leading-[0.9] mb-5"
            style={{ fontSize: "clamp(4rem, 10vw, 8rem)" }}
          >
            ALL PRODUCTS
          </h1>
          <p className="font-syne text-white/35 text-[14px] animate-fade-up-2 max-w-sm">
            Genuine Apple devices. Every product with official warranty.
          </p>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="bg-white min-h-screen flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-black/10 border-t-black rounded-full animate-spin" />
          </div>
        }
      >
        <ProductsContent />
      </Suspense>
    </>
  );
}
