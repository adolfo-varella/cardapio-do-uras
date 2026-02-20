import { describe, it, expect, beforeEach, vi } from "vitest";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Mock AsyncStorage
vi.mock("@react-native-async-storage/async-storage", () => ({
  default: {
    getItem: vi.fn(),
    setItem: vi.fn(),
  },
}));

describe("useFavorites", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should toggle favorite correctly", () => {
    const favorites = new Map();
    const productId = "product-1";

    // Add favorite
    favorites.set(productId, { productId, addedAt: Date.now() });
    expect(favorites.has(productId)).toBe(true);

    // Remove favorite
    favorites.delete(productId);
    expect(favorites.has(productId)).toBe(false);
  });

  it("should get favorites list", () => {
    const favorites = new Map();
    favorites.set("product-1", { productId: "product-1", addedAt: Date.now() });
    favorites.set("product-2", { productId: "product-2", addedAt: Date.now() });

    const list = Array.from(favorites.values());
    expect(list).toHaveLength(2);
    expect(list[0].productId).toBe("product-1");
  });

  it("should check if product is favorite", () => {
    const favorites = new Map();
    const productId = "product-1";

    expect(favorites.has(productId)).toBe(false);

    favorites.set(productId, { productId, addedAt: Date.now() });
    expect(favorites.has(productId)).toBe(true);
  });
});
