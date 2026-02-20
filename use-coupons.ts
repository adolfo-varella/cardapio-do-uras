import { useState, useCallback } from "react";

export interface Coupon {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  expiresAt?: string;
}

// Mock coupons - in production these would come from the backend
const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: "BEMVINDO10",
    discountType: "percentage",
    discountValue: 10,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    code: "DOCES15",
    discountType: "percentage",
    discountValue: 15,
    expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    code: "PRIMEIRACOMPRA20",
    discountType: "percentage",
    discountValue: 20,
    expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    code: "DESCONTO5",
    discountType: "fixed",
    discountValue: 5,
    expiresAt: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export function useCoupons() {
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateCoupon = useCallback((code: string): Coupon | null => {
    const coupon = AVAILABLE_COUPONS.find(
      (c) => c.code.toUpperCase() === code.toUpperCase()
    );

    if (!coupon) {
      setError("Cupom inválido");
      return null;
    }

    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
      setError("Cupom expirado");
      return null;
    }

    setError(null);
    return coupon;
  }, []);

  const applyCoupon = useCallback((code: string): boolean => {
    const coupon = validateCoupon(code);
    if (coupon) {
      setAppliedCoupon(coupon);
      return true;
    }
    return false;
  }, [validateCoupon]);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    setError(null);
  }, []);

  const calculateDiscount = useCallback(
    (total: number): number => {
      if (!appliedCoupon) return 0;

      if (appliedCoupon.discountType === "percentage") {
        return (total * appliedCoupon.discountValue) / 100;
      } else {
        return Math.min(appliedCoupon.discountValue, total);
      }
    },
    [appliedCoupon]
  );

  const getAvailableCoupons = useCallback(() => {
    return AVAILABLE_COUPONS.filter((c) => {
      if (c.expiresAt && new Date(c.expiresAt) < new Date()) {
        return false;
      }
      return true;
    });
  }, []);

  return {
    appliedCoupon,
    error,
    applyCoupon,
    removeCoupon,
    calculateDiscount,
    getAvailableCoupons,
  };
}
