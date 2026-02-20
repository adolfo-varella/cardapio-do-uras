import React, { createContext, useContext } from "react";
import { useCart } from "@/hooks/use-cart";
import type { CartItem } from "@/hooks/use-cart";
import type { Product } from "@/lib/data/products";

interface CartContextType {
  items: CartItem[];
  isLoading: boolean;
  total: number;
  itemCount: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const cart = useCart();

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within CartProvider");
  }
  return context;
}
