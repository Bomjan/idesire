"use client";

import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";

export default function CartDrawer() {
  const { state, closeCart, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  const whatsappMessage = () => {
    const lines = state.items
      .map((i) => `• ${i.name} ×${i.quantity} — ${formatPrice(i.price * i.quantity)}`)
      .join("\n");
    const msg = `Hello iDesire! 🛍️\n\nI'd like to order:\n${lines}\n\nTotal: ${formatPrice(totalPrice)}\n\nPlease confirm availability and delivery.`;
    return encodeURIComponent(msg);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          state.isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Cart panel */}
      <aside
        className={`
          fixed z-[80] bg-[#0a0a0a] flex flex-col
          border-t border-white/10
          shadow-[0_-12px_48px_rgba(0,0,0,0.6)]
          transition-transform duration-[380ms] ease-[cubic-bezier(0.32,0.72,0,1)]

          bottom-0 left-0 right-0 rounded-t-[28px] max-h-[88vh]

          sm:top-0 sm:right-0 sm:bottom-auto sm:left-auto
          sm:h-full sm:w-[420px] sm:rounded-none sm:max-h-none
          sm:border-t-0 sm:border-l sm:border-white/08
          sm:shadow-[-12px_0_48px_rgba(0,0,0,0.5)]

          ${state.isOpen
            ? "translate-y-0 sm:translate-x-0"
            : "translate-y-full sm:translate-y-0 sm:translate-x-full"
          }
        `}
      >
        {/* Drag handle — mobile only */}
        <div className="sm:hidden flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-10 h-1 rounded-full bg-white/15" />
        </div>

        {/* Header */}
        <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-white/08 flex items-center justify-between shrink-0">
          <div>
            <h2 className="font-bebas text-white text-2xl tracking-wide leading-none">
              Your Cart
            </h2>
            {totalItems > 0 && (
              <p className="font-syne text-[11px] text-white/40 mt-1 uppercase tracking-widest">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </p>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-full border border-white/10 hover:border-white/25 text-white/40 hover:text-white transition-colors"
            aria-label="Close cart"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto scrollbar-dark">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-5 px-8 text-center py-16">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-white/15">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <div>
                <p className="font-bebas text-white text-2xl tracking-wide">Cart is empty</p>
                <p className="font-syne text-xs text-white/35 mt-1">Add products to get started</p>
              </div>
              <button
                onClick={closeCart}
                className="font-syne text-[11px] uppercase tracking-widest text-apple-blue hover:text-white transition-colors"
              >
                Continue Shopping →
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-white/06">
              {state.items.map((item) => (
                <li key={item.id} className="flex gap-3 sm:gap-4 px-5 sm:px-6 py-4 sm:py-5">
                  {/* Image */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white/06 shrink-0 overflow-hidden border border-white/08">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-syne text-[13px] font-semibold text-white leading-tight truncate">
                      {item.name}
                    </p>
                    <p className="font-syne text-[11px] text-apple-blue mt-0.5">
                      {formatPrice(item.price)}
                    </p>

                    {/* Quantity */}
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:border-white/40 hover:text-white transition-colors text-sm leading-none"
                        aria-label="Decrease"
                      >
                        −
                      </button>
                      <span className="font-syne text-[13px] font-medium text-white w-4 text-center tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:border-white/40 hover:text-white transition-colors text-sm leading-none"
                        aria-label="Increase"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Price + remove */}
                  <div className="flex flex-col items-end justify-between shrink-0">
                    <p className="font-syne text-[13px] font-semibold text-white tabular-nums">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-white/25 hover:text-red-400 transition-colors p-0.5"
                      aria-label="Remove item"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        <path d="M10 11v6M14 11v6" />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="border-t border-white/08 px-5 sm:px-6 py-5 sm:py-6 space-y-4 shrink-0 bg-black/40">
            <div className="flex justify-between items-center">
              <span className="font-syne text-xs uppercase tracking-widest text-white/40">Total</span>
              <span className="font-bebas text-white text-2xl tracking-wide tabular-nums leading-none">
                {formatPrice(totalPrice)}
              </span>
            </div>

            <a
              href={`https://wa.me/97517000000?text=${whatsappMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1db954] active:scale-[0.97] text-white font-syne font-semibold rounded-full py-3.5 text-sm transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.557 4.126 1.532 5.86L.057 23.804a.5.5 0 0 0 .614.666l6.184-1.62A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.93 9.93 0 0 1-5.163-1.445l-.371-.22-3.843 1.007 1.027-3.746-.242-.386A9.935 9.935 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              Checkout via WhatsApp
            </a>

            <p className="text-center font-syne text-[10px] uppercase tracking-widest text-white/25">
              We'll confirm availability & delivery within 24hrs
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
