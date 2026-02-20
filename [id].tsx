import { ScrollView, Text, View, Pressable } from "react-native";
import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useCartContext } from "@/lib/cart-context";
import { getProductById } from "@/lib/data/products";
import * as Haptics from "expo-haptics";
import { cn } from "@/lib/utils";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { addToCart } = useCartContext();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const product = id ? getProductById(id) : null;

  if (!product) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text className="text-foreground text-lg">Produto não encontrado</Text>
      </ScreenContainer>
    );
  }

  const handleAddToCart = async () => {
    setIsAdding(true);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    addToCart(product, quantity);
    setTimeout(() => {
      router.back();
    }, 300);
  };

  const handleIncrement = () => {
    setQuantity((q) => q + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  const totalPrice = product.price * quantity;

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="flex-1 px-4 py-6 gap-6">
          {/* Product Image/Icon */}
          <View className="w-full h-64 bg-primary/10 rounded-2xl items-center justify-center">
            <Text className="text-8xl">🍰</Text>
          </View>

          {/* Product Info */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">
              {product.name}
            </Text>
            <Text className="text-sm text-muted">
              Categoria: {product.category}
            </Text>
          </View>

          {/* Price */}
          <View className="bg-surface rounded-xl p-4 gap-2">
            <Text className="text-sm text-muted">Preço unitário</Text>
            <Text className="text-3xl font-bold text-primary">
              R$ {product.price.toFixed(2)}
            </Text>
          </View>

          {/* Quantity Selector */}
          <View className="bg-surface rounded-xl p-4">
            <Text className="text-sm text-muted mb-3">Quantidade</Text>
            <View className="flex-row items-center gap-4">
              <Pressable
                onPress={handleDecrement}
                className={cn(
                  "w-12 h-12 rounded-lg items-center justify-center border-2 border-primary",
                  quantity === 1 && "opacity-50"
                )}
              >
                <Text className="text-xl font-bold text-primary">−</Text>
              </Pressable>

              <View className="flex-1 items-center">
                <Text className="text-2xl font-bold text-foreground">
                  {quantity}
                </Text>
              </View>

              <Pressable
                onPress={handleIncrement}
                className="w-12 h-12 rounded-lg items-center justify-center border-2 border-primary"
              >
                <Text className="text-xl font-bold text-primary">+</Text>
              </Pressable>
            </View>
          </View>

          {/* Total */}
          <View className="bg-primary/10 rounded-xl p-4 gap-1">
            <Text className="text-sm text-muted">Total</Text>
            <Text className="text-2xl font-bold text-primary">
              R$ {totalPrice.toFixed(2)}
            </Text>
          </View>

          {/* Spacer */}
          <View className="flex-1" />

          {/* Add to Cart Button */}
          <Pressable
            onPress={handleAddToCart}
            disabled={isAdding}
            className={cn(
              "bg-primary rounded-xl py-4 items-center justify-center",
              isAdding && "opacity-70"
            )}
          >
            <Text className="text-white font-bold text-lg">
              Adicionar ao Carrinho
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
