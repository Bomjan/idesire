"use client";

import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";

export default function CartDrawer() {
  const { state, closeCart, removeItem, updateQuantity, totalPrice, totalItems } =
    useCart();

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
        className={`fixed inset-0 z-[70] bg-black/40 ${
          state.isOpen ? "overlay-open" : "overlay-closed"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-[80] h-full w-full sm:w-[420px] bg-white shadow-2xl flex flex-col ${
          state.isOpen ? "cart-drawer-open" : "cart-drawer-closed"
        }`}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-apple-silver/50 flex items-center justify-between">
          <div>
            <h2 className="font-syne font-semibold text-lg text-apple-dark">
              Your Cart
            </h2>
            {totalItems > 0 && (
              <p className="text-[12px] text-apple-mid mt-0.5">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </p>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-apple-gray text-apple-dark transition-colors"
            aria-label="Close cart"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-apple-mid px-8 text-center">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                className="opacity-30"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <div>
                <p className="font-medium text-apple-dark">Your cart is empty</p>
                <p className="text-sm mt-1">
                  Add products to get started
                </p>
              </div>
              <button
                onClick={closeCart}
                className="text-sm text-apple-blue hover:underline mt-2"
              >
                Continue Shopping →
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-apple-silver/40">
              {state.items.map((item) => (
                <li key={item.id} className="flex gap-4 px-6 py-5">
                  <div className="relative w-20 h-20 rounded-xl bg-apple-gray flex-shrink-0 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-apple-dark leading-tight">
                      {item.name}
                    </p>
                    <p className="text-[12px] text-apple-mid mt-0.5">
                      {formatPrice(item.price)}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-6 h-6 rounded-full border border-apple-silver flex items-center justify-center text-apple-dark hover:bg-apple-gray transition-colors text-sm"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="text-[13px] font-medium w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-6 h-6 rounded-full border border-apple-silver flex items-center justify-center text-apple-dark hover:bg-apple-gray transition-colors text-sm"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <p className="text-[13px] font-semibold text-apple-dark">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-apple-mid hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      >
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

        {/* Footer — checkout */}
        {state.items.length > 0 && (
          <div className="border-t border-apple-silver/50 px-6 py-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-apple-mid">Total</span>
              <span className="font-syne font-semibold text-lg text-apple-dark">
                {formatPrice(totalPrice)}
              </span>
            </div>

            <a
              href={`https://wa.me/97517000000?text=${whatsappMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1db954] text-white font-semibold rounded-full py-3.5 text-sm transition-colors"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.557 4.126 1.532 5.86L.057 23.804a.5.5 0 0 0 .614.666l6.184-1.62A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.93 9.93 0 0 1-5.163-1.445l-.371-.22-3.843 1.007 1.027-3.746-.242-.386A9.935 9.935 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              Checkout via WhatsApp
            </a>

            <p className="text-center text-[11px] text-apple-mid">
              We&apos;ll confirm availability & delivery within 24hrs
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
