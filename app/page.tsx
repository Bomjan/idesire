import Image from "next/image";
import Link from "next/link";
import { products, formatPrice } from "@/lib/products";
import HeroSection from "@/components/HeroSection";
import Tilt3D from "@/components/Tilt3D";
import ScrollReveal3D from "@/components/ScrollReveal3D";

const categoryBlocks = [
  {
    slug: "iPhone",
    label: "iPhone",
    sub: "The ultimate lineup.",
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=1000&q=85",
    span: "lg:col-span-2 lg:row-span-2",
    aspect: "aspect-[4/5] lg:aspect-auto lg:min-h-[560px]",
  },
  {
    slug: "Mac",
    label: "Mac",
    sub: "Built for what's next.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=85",
    span: "lg:col-span-2",
    aspect: "aspect-[16/9]",
  },
  {
    slug: "iPad",
    label: "iPad",
    sub: "Your canvas. Anywhere.",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=85",
    span: "lg:col-span-1",
    aspect: "aspect-[3/4]",
  },
  {
    slug: "Accessories",
    label: "Accessories",
    sub: "Complete the collection.",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=85",
    span: "lg:col-span-1",
    aspect: "aspect-[3/4]",
  },
];

const featuredProduct = products.find((p) => p.id === "macbook-air-m3")!;

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <HeroSection />

      {/* THE COLLECTION — editorial grid, no borders */}
      <section className="bg-white py-14 px-4 sm:py-20 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal3D className="flex items-end justify-between mb-10">
            <h2 className="font-bebas text-black" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 0.95 }}>
              THE COLLECTION
            </h2>
            <Link
              href="/products"
              className="font-syne text-[12px] font-semibold uppercase tracking-widest text-black/40 hover:text-black transition-colors hidden sm:block"
            >
              View All →
            </Link>
          </ScrollReveal3D>

          {/* Asymmetric editorial grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {categoryBlocks.map((cat, i) => (
              <ScrollReveal3D key={cat.slug} delay={i * 70} rotateX={14} className={cat.span}>
                <Link
                  href={`/products?category=${cat.slug}`}
                  className={`group relative block overflow-hidden bg-black w-full ${cat.aspect} h-full`}
                >
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.06] opacity-85 group-hover:opacity-100"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                    <p className="font-bebas text-white mb-0.5" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 0.95 }}>
                      {cat.label.toUpperCase()}
                    </p>
                    <p className="font-syne text-[12px] text-white/50 uppercase tracking-widest mb-4">
                      {cat.sub}
                    </p>
                    <span className="inline-flex items-center gap-2 font-syne text-[11px] font-bold uppercase tracking-widest text-white border-b border-white/40 pb-0.5 group-hover:border-white transition-colors">
                      Shop
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </ScrollReveal3D>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED — editorial spotlight */}
      <section className="bg-black py-14 px-4 sm:py-20 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal3D>
            <div className="grid md:grid-cols-2 gap-0 overflow-hidden">
              {/* Image — full bleed, no rounding */}
              <div className="relative min-h-[400px] md:min-h-[580px] bg-zinc-900 overflow-hidden animate-float">
                <Image
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  fill
                  className="object-cover opacity-90"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Text side */}
              <div className="bg-[#0a0a0a] flex flex-col justify-between p-7 sm:p-10 md:p-14 min-h-[280px] md:min-h-[320px]">
                <div>
                  <p className="font-syne text-[10px] font-semibold text-apple-blue uppercase tracking-[0.25em] mb-6">
                    Staff Pick · {featuredProduct.category}
                  </p>
                  <h2
                    className="font-bebas text-white leading-[0.92] mb-6"
                    style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}
                  >
                    {featuredProduct.name.toUpperCase()}
                  </h2>
                  <p className="font-syne text-white/40 text-[14px] leading-relaxed mb-8 max-w-xs">
                    {featuredProduct.tagline} Now at iDesire Thimphu.
                  </p>
                  <p className="font-bebas text-white text-4xl mb-10">
                    {formatPrice(featuredProduct.price)}
                  </p>
                </div>
                <div className="flex flex-col gap-3 w-full sm:max-w-xs">
                  <Link
                    href="/products"
                    className="inline-flex items-center justify-between bg-white text-black text-[12px] font-bold uppercase tracking-widest px-7 py-4 hover:bg-apple-gray active:scale-[0.97] transition-all font-syne"
                  >
                    Shop Mac
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <a
                    href={`https://wa.me/97517000000?text=${encodeURIComponent(`Hello iDesire! I'm interested in the ${featuredProduct.name}. Please share availability.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center border border-white/20 text-white text-[12px] font-semibold uppercase tracking-widest px-7 py-4 hover:border-white/50 active:scale-[0.97] transition-all font-syne"
                  >
                    Inquire via WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal3D>
        </div>
      </section>

      {/* WHY IDESIRE — bold numbered list on black */}
      <section className="bg-black py-14 px-4 sm:py-20 sm:px-6 border-t border-white/06">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal3D className="mb-16">
            <h2
              className="font-bebas text-white/10"
              style={{ fontSize: "clamp(4rem, 10vw, 8rem)", lineHeight: 0.9 }}
            >
              WHY IDESIRE
            </h2>
          </ScrollReveal3D>

          <div className="grid md:grid-cols-3 gap-0 border-t border-white/08">
            {[
              { n: "01", title: "AUTHORISED\nRESELLER", body: "Genuine Apple products with manufacturer warranty. No grey-market devices — ever." },
              { n: "02", title: "SAME-DAY\nSUPPORT", body: "Expert Bhutanese staff who know Apple products inside out. Walk in or call us." },
              { n: "03", title: "NATIONWIDE\nDELIVERY", body: "We ship to every dzongkhag. Fast, insured, and handled with care." },
            ].map((f, i) => (
              <ScrollReveal3D key={f.n} delay={i * 100} rotateX={20}>
                <div className="border-b md:border-b-0 md:border-r border-white/08 last:border-r-0 py-10 md:px-10 first:md:pl-0 last:md:pr-0 group hover:bg-white/[0.02] transition-colors">
                  <span className="font-bebas text-white/15 text-6xl block mb-6 group-hover:text-apple-blue transition-colors duration-300">
                    {f.n}
                  </span>
                  <h3
                    className="font-bebas text-white mb-4 whitespace-pre-line"
                    style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", lineHeight: 1 }}
                  >
                    {f.title}
                  </h3>
                  <p className="font-syne text-[13px] text-white/35 leading-relaxed">
                    {f.body}
                  </p>
                </div>
              </ScrollReveal3D>
            ))}
          </div>
        </div>
      </section>

      {/* NEW IN — horizontal product strip */}
      <section className="bg-white py-14 px-4 sm:py-20 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal3D className="flex items-end justify-between mb-10">
            <h2
              className="font-bebas text-black"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 0.95 }}
            >
              NEW IN
            </h2>
            <Link
              href="/products"
              className="font-syne text-[12px] font-semibold uppercase tracking-widest text-black/40 hover:text-black transition-colors hidden sm:block"
            >
              All Products →
            </Link>
          </ScrollReveal3D>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.filter((p) => p.badge === "New").slice(0, 4).map((product, i) => (
              <ScrollReveal3D key={product.id} delay={i * 70} rotateX={16}>
                <Tilt3D intensity={8} perspective={900} scale={1.02} shine>
                  <div className="group cursor-pointer">
                    <div className="relative aspect-[3/4] overflow-hidden bg-[#f0f0f0]">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                      <span className="absolute top-3 left-3 bg-black text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 font-syne">
                        New
                      </span>
                    </div>
                    <div className="pt-3">
                      <p className="font-syne text-[10px] uppercase tracking-[0.18em] text-apple-mid mb-1">
                        {product.category}
                      </p>
                      <p className="font-sf font-semibold text-black text-[14px] leading-snug tracking-[-0.01em]">
                        {product.name}
                      </p>
                      <p className="font-sf text-[13px] mt-0.5" style={{ color: "#6e6e73" }}>
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </div>
                </Tilt3D>
              </ScrollReveal3D>
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP — full black, massive type */}
      <section className="bg-black py-20 px-4 sm:py-28 sm:px-6 text-center overflow-hidden relative">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <ScrollReveal3D rotateX={12} className="relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2
              className="font-bebas text-white mb-6 leading-[0.9]"
              style={{ fontSize: "clamp(4rem, 12vw, 9rem)" }}
            >
              VISIT US IN THIMPHU
            </h2>
            <p className="font-syne text-white/35 text-[14px] mb-12 max-w-sm mx-auto">
              Come see the full lineup in person. Norzin Lam, Thimphu.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 bg-white text-black text-[12px] font-bold uppercase tracking-widest px-10 py-4 hover:bg-apple-gray active:scale-[0.97] transition-all font-syne"
              >
                Get Directions
              </Link>
              <a
                href="https://wa.me/97517000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 border border-white/25 text-white text-[12px] font-semibold uppercase tracking-widest px-10 py-4 hover:border-white active:scale-[0.97] transition-all font-syne"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </ScrollReveal3D>
      </section>
    </>
  );
}
