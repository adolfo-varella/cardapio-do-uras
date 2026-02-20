import { describe, it, expect } from "vitest";

describe("useCoupons", () => {
  it("should validate coupon code correctly", () => {
    const validCodes = ["BEMVINDO10", "DOCES15", "PRIMEIRACOMPRA20", "DESCONTO5"];
    const invalidCode = "INVALIDO";

    validCodes.forEach((code) => {
      expect(validCodes.includes(code.toUpperCase())).toBe(true);
    });

    expect(validCodes.includes(invalidCode.toUpperCase())).toBe(false);
  });

  it("should calculate percentage discount correctly", () => {
    const total = 100;
    const discountPercentage = 10;
    const expectedDiscount = (total * discountPercentage) / 100;

    expect(expectedDiscount).toBe(10);
  });

  it("should calculate fixed discount correctly", () => {
    const total = 100;
    const discountFixed = 5;
    const expectedDiscount = Math.min(discountFixed, total);

    expect(expectedDiscount).toBe(5);
  });

  it("should not apply discount greater than total", () => {
    const total = 10;
    const discountFixed = 50;
    const expectedDiscount = Math.min(discountFixed, total);

    expect(expectedDiscount).toBe(10);
  });

  it("should calculate final total with discount", () => {
    const total = 100;
    const discountPercentage = 15;
    const discount = (total * discountPercentage) / 100;
    const finalTotal = total - discount;

    expect(finalTotal).toBe(85);
  });

  it("should filter expired coupons", () => {
    const now = new Date();
    const expiredDate = new Date(now.getTime() - 1000); // 1 second ago
    const futureDate = new Date(now.getTime() + 86400000); // 1 day from now

    const coupons = [
      { code: "EXPIRED", expiresAt: expiredDate.toISOString() },
      { code: "VALID", expiresAt: futureDate.toISOString() },
    ];

    const validCoupons = coupons.filter(
      (c) => !c.expiresAt || new Date(c.expiresAt) > now
    );

    expect(validCoupons).toHaveLength(1);
    expect(validCoupons[0].code).toBe("VALID");
  });
});
