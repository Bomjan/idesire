"use client";

import Image from "next/image";
import { Product, formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import Tilt3D from "./Tilt3D";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addItem } = useCart();

  const whatsappInquiry = () => {
    const msg = `Hello iDesire! 👋\n\nI'm interested in the *${product.name}* (${formatPrice(product.price)}).\n\nPlease share availability and any offers.\n\nThank you!`;
    return `https://wa.me/97517000000?text=${encodeURIComponent(msg)}`;
  };

  return (
    <Tilt3D intensity={8} perspective={1000} scale={1.02} shine className="">
      <article className="group cursor-pointer">
        {/* Image block — no border, no rounding, image IS the card */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[#f0f0f0]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Badge */}
          {product.badge && (
            <span className="absolute top-3 left-3 bg-black text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 z-10 font-syne">
              {product.badge}
            </span>
          )}

          {/* Add to Cart — always visible on mobile, hover-reveal on desktop */}
          <div className="absolute inset-0 bg-black/0 sm:group-hover:bg-black/25 transition-all duration-400 flex items-end p-3 sm:p-4">
            <button
              onClick={(e) => { e.preventDefault(); addItem(product); }}
              className="w-full bg-white text-black text-[10px] sm:text-[11px] font-bold uppercase tracking-widest py-2.5 sm:py-3 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all duration-300 hover:bg-apple-gray active:scale-[0.97] font-syne"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Text below — no box, just clean typography */}
        <div className="pt-3 pb-1">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="font-syne text-[10px] uppercase tracking-[0.18em] text-apple-mid mb-1">
                {product.category}
              </p>
              <h3 className="font-sf font-semibold text-black text-[14px] leading-snug tracking-[-0.01em]">
                {product.name}
              </h3>
              <p className="font-sf text-black text-[13px] font-normal mt-0.5" style={{ color: "#6e6e73" }}>
                {formatPrice(product.price)}
              </p>
            </div>

            {/* WhatsApp icon — minimal */}
            <a
              href={whatsappInquiry()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-shrink-0 mt-0.5 text-apple-mid hover:text-black transition-colors"
              title="Inquire via WhatsApp"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.557 4.126 1.532 5.86L.057 23.804a.5.5 0 0 0 .614.666l6.184-1.62A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.93 9.93 0 0 1-5.163-1.445l-.371-.22-3.843 1.007 1.027-3.746-.242-.386A9.935 9.935 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
            </a>
          </div>
        </div>
      </article>
    </Tilt3D>
  );
}
