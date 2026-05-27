"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";
import { Product } from "./products";

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; product: Product }
  | { type: "REMOVE_ITEM"; id: string }
  | { type: "UPDATE_QUANTITY"; id: string; quantity: number }
  | { type: "TOGGLE_CART" }
  | { type: "CLOSE_CART" };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.id === action.product.id);
      if (existing) {
        return {
          ...state,
          isOpen: true,
          items: state.items.map((i) =>
            i.id === action.product.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return {
        ...state,
        isOpen: true,
        items: [...state.items, { ...action.product, quantity: 1 }],
      };
    }
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items:
          action.quantity <= 0
            ? state.items.filter((i) => i.id !== action.id)
            : state.items.map((i) =>
                i.id === action.id ? { ...i, quantity: action.quantity } : i
              ),
      };
    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };
    case "CLOSE_CART":
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

interface CartContextType {
  state: CartState;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleCart: () => void;
  closeCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
  });

  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = state.items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        state,
        addItem: (product) => dispatch({ type: "ADD_ITEM", product }),
        removeItem: (id) => dispatch({ type: "REMOVE_ITEM", id }),
        updateQuantity: (id, quantity) =>
          dispatch({ type: "UPDATE_QUANTITY", id, quantity }),
        toggleCart: () => dispatch({ type: "TOGGLE_CART" }),
        closeCart: () => dispatch({ type: "CLOSE_CART" }),
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
