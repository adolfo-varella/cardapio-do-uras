import { useState } from "react";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useCartContext } from "@/lib/cart-context";
import { useAuth } from "@/hooks/use-auth";
import { useCoupons } from "@/hooks/use-coupons";
import { useNotifications } from "@/hooks/use-notifications";
import { useWhatsApp } from "@/hooks/use-whatsapp";
import { trpc } from "@/lib/trpc";
import * as Haptics from "expo-haptics";
import { cn } from "@/lib/utils";

export default function CheckoutScreen() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { items, total, clearCart } = useCartContext();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { appliedCoupon, error: couponError, applyCoupon, removeCoupon, calculateDiscount } = useCoupons();
  const { sendOrderConfirmationNotification } = useNotifications();
  const { sendOrderConfirmation } = useWhatsApp();
  const createOrderMutation = trpc.orders.create.useMutation();

  const discount = calculateDiscount(total);
  const finalTotal = total - discount;

  const handleApplyCoupon = () => {
    if (applyCoupon(couponCode)) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setCouponCode("");
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const handleConfirmOrder = async () => {
    if (!name.trim() || !phone.trim()) {
      Alert.alert("Campos obrigatórios", "Por favor, preencha nome e telefone");
      return;
    }

    if (!isAuthenticated) {
      Alert.alert("Autenticação", "Por favor, faça login para continuar");
      return;