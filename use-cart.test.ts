import { describe, it, expect } from "vitest";
import type { Product } from "@/lib/data/products";
import type { CartItem } from "./use-cart";

describe("Cart Logic", () => {
  const mockProduct: Product = {
    id: "1",
    name: "Test Product",
    category: "test",
    price: 10.0,
  };

  const mockProduct2: Product = {
    id: "2",
    name: "Test Product 2",
    category: "test",
    price: 5.0,
  };

  it("should calculate total price correctly", () => {
    const items: CartItem[] = [
      { product: mockProduct, quantity: 2 },
      { product: mockProduct2, quantity: 3 },
    ];

    const total = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    expect(total).toBe(35.0); // (10 * 2) + (5 * 3)
  });

  it("should calculate item count correctly", () => {
    const items: CartItem[] = [
      { product: mockProduct, quantity: 2 },
      { product: mockProduct2, quantity: 3 },
    ];

    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    expect(itemCount).toBe(5);
  });

  it("should add product to cart", () => {
    let items: CartItem[] = [];

    const addToCart = (product: Product, quantity: number = 1) => {
      const existingItem = items.find((item) => item.product.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        items.push({ product, quantity });
      }
    };

    addToCart(mockProduct, 1);
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(1);

    addToCart(mockProduct, 2);
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(3);
  });

  it("should remove product from cart", () => {
    let items: CartItem[] = [
      { product: mockProduct, quantity: 1 },
      { product: mockProduct2, quantity: 2 },
    ];

    const removeFromCart = (productId: string) => {
      items = items.filter((item) => item.product.id !== productId);
    };

    removeFromCart("1");
    expect(items).toHaveLength(1);
    expect(items[0].product.id).toBe("2");
  });

  it("should update product quantity", () => {
    let items: CartItem[] = [{ product: mockProduct, quantity: 1 }];

    const updateQuantity = (productId: string, quantity: number) => {
      if (quantity <= 0) {
        items = items.filter((item) => item.product.id !== productId);
      } else {
        const item = items.find((item) => item.product.id === productId);
        if (item) {
          item.quantity = quantity;
        }
      }
    };

    updateQuantity("1", 5);
    expect(items[0].quantity).toBe(5);

    updateQuantity("1", 0);
    expect(items).toHaveLength(0);
  });

  it("should handle empty cart", () => {
    const items: CartItem[] = [];

    const total = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    expect(total).toBe(0);
    expect(itemCount).toBe(0);
    expect(items).toHaveLength(0);
  });
});
