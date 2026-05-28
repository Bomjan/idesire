"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { products, formatPrice, Category } from "@/lib/products";

function ProductDropdown({
  slotIndex,
  categoryProducts,
  slots,
  selectedCategory,
  onSelect,
}: {
  slotIndex: number;
  categoryProducts: typeof products;
  slots: (string | null)[];
  selectedCategory: string;
  onSelect: (index: number, id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const available = categoryProducts.filter(
    (p) => !slots.includes(p.id) || slots[slotIndex] === p.id
  );

  return (
    <div ref={ref} className="relative w-full">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center justify-between px-4 py-3 border font-syne text-xs uppercase tracking-widest transition-colors ${
          open
            ? "border-apple-blue/60 text-white bg-white/05"
            : "border-white/15 text-white/40 bg-white/03 hover:border-white/30 hover:text-white/70"
        }`}
      >
        <span>Select {selectedCategory}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <polyline points="2 4 6 8 10 4" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 z-50 bg-[#111] border border-white/15 border-t-0 shadow-2xl max-h-60 overflow-y-auto scrollbar-dark">
          {available.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                onSelect(slotIndex, p.id);
                setOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/06 transition-colors text-left group"
            >
              <div className="relative w-9 h-9 shrink-0">
                <Image src={p.image} alt={p.name} fill className="object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="min-w-0">
                <p className="font-syne text-white/80 text-xs group-hover:text-white transition-colors leading-snug truncate">
                  {p.name}
                </p>
                <p className="font-syne text-apple-blue text-[10px] mt-0.5">{formatPrice(p.price)}</p>
              </div>
            </button>
          ))}
          {available.length === 0 && (
            <p className="font-syne text-white/25 text-xs px-4 py-4 text-center uppercase tracking-widest">
              All devices selected
            </p>
          )}
        </div>
      )}
    </div>
  );
}

type Spec = { label: string; key: string };

const specsByCategory: Record<string, Spec[]> = {
  iPhone: [
    { label: "Price", key: "price" },
    { label: "Chip", key: "chip" },
    { label: "Display", key: "display" },
    { label: "Camera", key: "camera" },
    { label: "Battery", key: "battery" },
    { label: "Storage", key: "storage" },
    { label: "5G", key: "5g" },
    { label: "Face ID", key: "faceId" },
  ],
  Mac: [
    { label: "Price", key: "price" },
    { label: "Chip", key: "chip" },
    { label: "Display", key: "display" },
    { label: "RAM", key: "ram" },
    { label: "Storage", key: "storage" },
    { label: "Battery life", key: "battery" },
    { label: "Ports", key: "ports" },
    { label: "Weight", key: "weight" },
  ],
  iPad: [
    { label: "Price", key: "price" },
    { label: "Chip", key: "chip" },
    { label: "Display", key: "display" },
    { label: "Apple Pencil", key: "pencil" },
    { label: "Storage", key: "storage" },
    { label: "Cellular", key: "cellular" },
    { label: "Face ID", key: "faceId" },
    { label: "Weight", key: "weight" },
  ],
  Accessories: [
    { label: "Price", key: "price" },
    { label: "Features", key: "features" },
    { label: "Battery life", key: "battery" },
    { label: "Connectivity", key: "connectivity" },
  ],
};

const specsData: Record<string, Record<string, string>> = {
  "iphone-16-pro": {
    chip: "A18 Pro",
    display: "6.3″ Super Retina XDR ProMotion",
    camera: "48MP Fusion + 48MP Ultra Wide + 12MP 5× Tele",
    battery: "Up to 33 hrs video",
    storage: "256GB – 1TB",
    "5g": "Yes",
    faceId: "Yes",
  },
  "iphone-16": {
    chip: "A18",
    display: "6.1″ Super Retina XDR",
    camera: "48MP Fusion + 12MP Ultra Wide",
    battery: "Up to 22 hrs video",
    storage: "128GB – 512GB",
    "5g": "Yes",
    faceId: "Yes",
  },
  "iphone-15": {
    chip: "A16 Bionic",
    display: "6.1″ Super Retina XDR",
    camera: "48MP Main + 12MP Ultra Wide",
    battery: "Up to 20 hrs video",
    storage: "128GB – 512GB",
    "5g": "Yes",
    faceId: "Yes",
  },
  "macbook-air-m3": {
    chip: "Apple M3",
    display: "13.6″ or 15.3″ Liquid Retina",
    ram: "8GB – 24GB",
    storage: "256GB – 2TB SSD",
    battery: "Up to 18 hrs",
    ports: "2× Thunderbolt / USB 4, MagSafe",
    weight: "1.24 kg",
  },
  "macbook-pro-m4": {
    chip: "Apple M4 / M4 Pro / M4 Max",
    display: "14″ or 16″ Liquid Retina XDR",
    ram: "16GB – 128GB",
    storage: "512GB – 8TB SSD",
    battery: "Up to 24 hrs",
    ports: "3× Thunderbolt 5, HDMI, SD card, MagSafe",
    weight: "1.55 kg (14″)",
  },
  "imac-m3": {
    chip: "Apple M3",
    display: "24″ 4.5K Retina",
    ram: "8GB – 24GB",
    storage: "256GB – 2TB SSD",
    battery: "—",
    ports: "2× Thunderbolt / USB 4, 2× USB 3",
    weight: "4.48 kg",
  },
  "ipad-pro-m4": {
    chip: "Apple M4",
    display: "11″ or 13″ Ultra Retina XDR OLED",
    pencil: "Apple Pencil Pro",
    storage: "256GB – 2TB",
    cellular: "Optional (5G)",
    faceId: "Yes",
    weight: "444 g (11″ Wi-Fi)",
  },
  "ipad-air-m2": {
    chip: "Apple M2",
    display: "11″ or 13″ Liquid Retina",
    pencil: "Apple Pencil Pro",
    storage: "128GB – 1TB",
    cellular: "Optional (5G)",
    faceId: "Yes",
    weight: "462 g (11″ Wi-Fi)",
  },
  "ipad-mini": {
    chip: "Apple A17 Pro",
    display: "8.3″ Liquid Retina",
    pencil: "Apple Pencil Pro",
    storage: "128GB – 512GB",
    cellular: "Optional (5G)",
    faceId: "Yes",
    weight: "293 g (Wi-Fi)",
  },
  "apple-watch-s10": {
    features: "Crash/fall detection, ECG, Blood Oxygen, Sleep tracking",
    battery: "Up to 18 hrs",
    connectivity: "GPS + Cellular (optional)",
  },
  "airpods-pro-2": {
    features: "Active Noise Cancellation, Adaptive Audio, Hearing Aid",
    battery: "Up to 6 hrs (30 hrs with case)",
    connectivity: "Bluetooth 5.3, H2 chip",
  },
  "airpods-4": {
    features: "Active Noise Cancellation, Personalised Spatial Audio",
    battery: "Up to 5 hrs (30 hrs with case)",
    connectivity: "Bluetooth 5.3, H2 chip",
  },
};

const CATEGORY_ORDER: Category[] = ["iPhone", "Mac", "iPad", "Accessories"];

export default function ComparePage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("iPhone");
  const [slots, setSlots] = useState<(string | null)[]>([null, null, null]);

  const categoryProducts = products.filter((p) => p.category === selectedCategory);
  const specs = specsByCategory[selectedCategory] ?? [];

  function selectProduct(slotIndex: number, productId: string) {
    setSlots((prev) => {
      const next = [...prev];
      next[slotIndex] = productId;
      return next;
    });
  }

  function clearSlot(slotIndex: number) {
    setSlots((prev) => {
      const next = [...prev];
      next[slotIndex] = null;
      return next;
    });
  }

  function changeCategory(cat: Category) {
    setSelectedCategory(cat);
    setSlots([null, null, null]);
  }

  const selectedProducts = slots.map((id) => (id ? products.find((p) => p.id === id) ?? null : null));

  function getSpec(productId: string, key: string) {
    if (key === "price") {
      const p = products.find((x) => x.id === productId);
      return p ? formatPrice(p.price) : "—";
    }
    return specsData[productId]?.[key] ?? "—";
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-black pt-28 pb-12 px-4 sm:px-6 border-b border-white/08">
        <div className="max-w-7xl mx-auto">
          <p className="font-syne text-[11px] uppercase tracking-[0.3em] text-apple-blue mb-4">Compare</p>
          <h1 className="font-bebas text-white leading-none mb-4" style={{ fontSize: "clamp(3.5rem,10vw,8rem)" }}>
            FIND YOUR<br />PERFECT APPLE
          </h1>
          <p className="font-syne text-white/50 max-w-md text-sm leading-relaxed">
            Pick up to three devices side-by-side to see exactly how they stack up.
          </p>
        </div>
      </section>

      {/* Category picker */}
      <section className="bg-black border-b border-white/08 sticky top-12 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-0 overflow-x-auto scrollbar-hide">
          {CATEGORY_ORDER.map((cat) => (
            <button
              key={cat}
              onClick={() => changeCategory(cat)}
              className={`font-syne text-[11px] uppercase tracking-widest px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? "border-apple-blue text-white"
                  : "border-transparent text-white/40 hover:text-white/70"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-black py-8 sm:py-10">
        {/* Horizontally scrollable wrapper on mobile */}
        <div className="overflow-x-auto px-4 sm:px-6 scrollbar-dark">
          <div className="min-w-[340px] sm:min-w-0 max-w-7xl mx-auto">

            {/* Slot selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {slots.map((slotId, i) => {
                const product = selectedProducts[i];
                // hide third slot on mobile
                if (i === 2) return (
                  <div key={i} className="hidden sm:flex border border-white/10 p-5 min-h-[200px] flex-col items-center justify-center text-center relative">
                    {product ? (
                      <>
                        <button onClick={() => clearSlot(i)} className="absolute top-3 right-3 text-white/30 hover:text-white transition-colors font-syne text-lg leading-none" aria-label="Remove">×</button>
                        <div className="relative w-20 h-20 mb-4">
                          <Image src={product.image} alt={product.name} fill className="object-contain" />
                        </div>
                        <p className="font-bebas text-white text-lg leading-tight">{product.name}</p>
                        <p className="font-syne text-apple-blue text-xs mt-1">{formatPrice(product.price)}</p>
                      </>
                    ) : (
                      <>
                        <div className="w-12 h-12 border border-dashed border-white/15 flex items-center justify-center mb-5">
                          <span className="text-white/20 text-2xl leading-none">+</span>
                        </div>
                        <p className="font-syne text-white/30 text-xs mb-4 uppercase tracking-widest">Add device</p>
                        <ProductDropdown slotIndex={i} categoryProducts={categoryProducts} slots={slots} selectedCategory={selectedCategory} onSelect={selectProduct} />
                      </>
                    )}
                  </div>
                );

                return (
                  <div key={i} className="border border-white/10 p-3 sm:p-5 min-h-[160px] sm:min-h-[200px] flex flex-col items-center justify-center text-center relative">
                    {product ? (
                      <>
                        <button onClick={() => clearSlot(i)} className="absolute top-2 right-2 sm:top-3 sm:right-3 text-white/30 hover:text-white transition-colors font-syne text-lg leading-none" aria-label="Remove">×</button>
                        <div className="relative w-14 h-14 sm:w-20 sm:h-20 mb-3 sm:mb-4">
                          <Image src={product.image} alt={product.name} fill className="object-contain" />
                        </div>
                        <p className="font-bebas text-white text-base sm:text-lg leading-tight">{product.name}</p>
                        <p className="font-syne text-apple-blue text-[10px] sm:text-xs mt-1">{formatPrice(product.price)}</p>
                      </>
                    ) : (
                      <>
                        <div className="w-10 h-10 sm:w-12 sm:h-12 border border-dashed border-white/15 flex items-center justify-center mb-3 sm:mb-5">
                          <span className="text-white/20 text-xl leading-none">+</span>
                        </div>
                        <p className="font-syne text-white/30 text-[10px] sm:text-xs mb-3 sm:mb-4 uppercase tracking-widest">Add device</p>
                        <ProductDropdown slotIndex={i} categoryProducts={categoryProducts} slots={slots} selectedCategory={selectedCategory} onSelect={selectProduct} />
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Spec rows */}
            {selectedProducts.some(Boolean) && (
              <div className="divide-y divide-white/06">
                {specs.map((spec) => (
                  <div key={spec.key} className="grid grid-cols-[100px_1fr_1fr] sm:grid-cols-[180px_1fr_1fr_1fr] gap-3 sm:gap-4 py-4 sm:py-5 items-start">
                    <p className="font-syne text-white/35 text-[10px] sm:text-xs uppercase tracking-widest pt-0.5">{spec.label}</p>
                    {slots.map((slotId, i) => {
                      if (i === 2) return (
                        <p key={i} className={`hidden sm:block font-syne text-sm leading-snug ${slotId ? "text-white/80" : "text-white/15"}`}>
                          {slotId ? getSpec(slotId, spec.key) : "—"}
                        </p>
                      );
                      return (
                        <p key={i} className={`font-syne text-xs sm:text-sm leading-snug ${slotId ? "text-white/80" : "text-white/15"}`}>
                          {slotId ? getSpec(slotId, spec.key) : "—"}
                        </p>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}

            {!selectedProducts.some(Boolean) && (
              <div className="text-center py-16 sm:py-20 border-t border-white/06">
                <p className="font-bebas text-white/20 text-2xl sm:text-3xl">Select devices above to compare</p>
              </div>
            )}

          </div>
        </div>

        {/* Mobile: nudge about 3rd slot */}
        <p className="sm:hidden font-syne text-[10px] text-white/20 uppercase tracking-widest text-center mt-6">
          Use a wider screen to compare 3 devices
        </p>
      </section>
    </>
  );
}
