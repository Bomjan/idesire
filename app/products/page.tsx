"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { products, categories, Category } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import ScrollReveal3D from "@/components/ScrollReveal3D";

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
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-0 overflow-x-auto">
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

      {/* Grid */}
      <section className="bg-white min-h-screen py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
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
      {/* Header */}
      <section className="bg-black pt-28 pb-16 px-6">
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
