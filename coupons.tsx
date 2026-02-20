import { ScrollView, Text, View, Pressable } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useCoupons } from "@/hooks/use-coupons";
import * as Haptics from "expo-haptics";
import { useState } from "react";

export default function CouponsScreen() {
  const { getAvailableCoupons, applyCoupon, appliedCoupon } = useCoupons();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const availableCoupons = getAvailableCoupons();

  const handleCopyCoupon = async (code: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleApplyCoupon = async (code: string) => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    applyCoupon(code);
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-4">
          {/* Header */}
          <View className="mb-4">
            <Text className="text-2xl font-bold text-foreground">Cupons Disponíveis</Text>
            <Text className="text-sm text-muted mt-1">
              {availableCoupons.length} cupom(ns) ativo(s)
            </Text>
          </View>

          {/* Active Coupon Banner */}
          {appliedCoupon && (
            <View className="bg-success/10 border border-success rounded-lg p-4">
              <Text className="text-sm font-semibold text-success mb-1">
                Cupom Aplicado ✅
              </Text>
              <Text className="text-lg font-bold text-success">{appliedCoupon.code}</Text>
              <Text className="text-xs text-muted mt-2">
                {appliedCoupon.discountType === "percentage"
                  ? `${appliedCoupon.discountValue}% de desconto`
                  : `R$ ${appliedCoupon.discountValue.toFixed(2)} de desconto`}
              </Text>
            </View>
          )}

          {/* Coupons List */}
          {availableCoupons.length > 0 ? (
            <View className="gap-3">
              {availableCoupons.map((coupon) => (
                <View
                  key={coupon.code}
                  className="bg-surface rounded-lg p-4 border border-border"
                >
                  {/* Coupon Code */}
                  <View className="flex-row justify-between items-start mb-3">
                    <View className="flex-1">
                      <Text className="text-sm text-muted mb-1">Código</Text>
                      <Text className="text-lg font-bold text-primary font-mono">
                        {coupon.code}
                      </Text>
                    </View>
                    <Pressable
                      onPress={() => handleCopyCoupon(coupon.code)}
                      className="bg-primary/10 rounded-lg px-3 py-2"
                    >
                      <Text className="text-xs font-semibold text-primary">
                        {copiedCode === coupon.code ? "Copiado!" : "Copiar"}
                      </Text>
                    </Pressable>
                  </View>

                  {/* Discount Info */}
                  <View className="bg-background rounded-lg p-3 mb-3">
                    <Text className="text-sm text-muted mb-1">Desconto</Text>
                    <Text className="text-lg font-bold text-success">
                      {coupon.discountType === "percentage"
                        ? `${coupon.discountValue}%`
                        : `R$ ${coupon.discountValue.toFixed(2)}`}
                    </Text>
                  </View>

                  {/* Expiration */}
                  {coupon.expiresAt && (
                    <View className="mb-3">
                      <Text className="text-xs text-muted">
                        Válido até:{" "}
                        {new Date(coupon.expiresAt).toLocaleDateString("pt-BR")}
                      </Text>
                    </View>
                  )}

                  {/* Apply Button */}
                  <Pressable
                    onPress={() => handleApplyCoupon(coupon.code)}
                    disabled={appliedCoupon?.code === coupon.code}
                    className={`rounded-lg py-2 items-center justify-center ${
                      appliedCoupon?.code === coupon.code
                        ? "bg-success/20"
                        : "bg-primary"
                    }`}
                  >
                    <Text
                      className={`font-semibold text-sm ${
                        appliedCoupon?.code === coupon.code
                          ? "text-success"
                          : "text-white"
                      }`}
                    >
                      {appliedCoupon?.code === coupon.code
                        ? "Aplicado"
                        : "Aplicar Cupom"}
                    </Text>
                  </Pressable>
                </View>
              ))}
            </View>
          ) : (
            <View className="flex-1 items-center justify-center gap-3">
              <Text className="text-4xl">🎟️</Text>
              <Text className="text-lg font-semibold text-foreground">
                Nenhum Cupom Disponível
              </Text>
              <Text className="text-sm text-muted text-center">
                Fique atento para novas promoções!
              </Text>
            </View>
          )}

          {/* Tips Section */}
          <View className="bg-primary/10 rounded-lg p-4 mt-4">
            <Text className="text-sm font-semibold text-primary mb-2">💡 Dicas</Text>
            <Text className="text-xs text-muted leading-relaxed">
              • Copie o código do cupom{"\n"}
              • Vá para o checkout{"\n"}
              • Cole o código no campo "Cupom de Desconto"{"\n"}
              • Clique em "Aplicar" para ativar o desconto
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
