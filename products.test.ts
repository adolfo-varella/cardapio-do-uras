import { describe, it, expect } from "vitest";
import { products, categories, getProductsByCategory, getProductById } from "./products";

describe("Products Data", () => {
  it("should have all categories defined", () => {
    expect(categories).toBeDefined();
    expect(categories.length).toBeGreaterThan(0);
    expect(categories[0]).toHaveProperty("id");
    expect(categories[0]).toHaveProperty("name");
  });

  it("should have all products defined", () => {
    expect(products).toBeDefined();
    expect(products.length).toBe(28);
  });

  it("should have correct product structure", () => {
    const product = products[0];
    expect(product).toHaveProperty("id");
    expect(product).toHaveProperty("name");
    expect(product).toHaveProperty("category");
    expect(product).toHaveProperty("price");
    expect(typeof product.price).toBe("number");
    expect(product.price).toBeGreaterThan(0);
  });

  it("should filter products by category", () => {
    const balaProducts = getProductsByCategory("balas");
    expect(balaProducts.length).toBe(7);
    expect(balaProducts.every((p) => p.category === "balas")).toBe(true);
  });

  it("should get product by id", () => {
    const product = getProductById("1");
    expect(product).toBeDefined();
    expect(product?.id).toBe("1");
    expect(product?.name).toBe("Tradicional");
  });

  it("should return undefined for non-existent product", () => {
    const product = getProductById("999");
    expect(product).toBeUndefined();
  });

  it("should have correct number of products per category", () => {
    const cocadas = getProductsByCategory("cocadas");
    expect(cocadas.length).toBe(3);

    const mousse = getProductsByCategory("mousse");
    expect(mousse.length).toBe(3);

    const trufa = getProductsByCategory("trufa");
    expect(trufa.length).toBe(1);
  });
});
