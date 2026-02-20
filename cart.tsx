import { ScrollView, Text, View, Pressable, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useCartContext } from "@/lib/cart-context";
import * as Haptics from "expo-haptics";
import { cn } from "@/lib/utils";

export default function CartScreen() {
  const router = useRouter();
  const { items, total, removeFromCart, updateQuantity, itemCount } = useCartContext();

  const handleCheckout = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push("./checkout");
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  if (items.length === 0) {
    return (
      <ScreenContainer className="bg-background items-center justify-center">
        <View className="gap-4 items-center">
          <Text className="text-5xl">🛒</Text>
          <Text className="text-2xl font-bold text-foreground">
            Carrinho Vazio
          </Text>
          <Text className="text-muted text-center">
            Adicione produtos para começar sua compra
          </Text>
          <Pressable
            onPress={() => router.back()}
            className="bg-primary rounded-lg px-6 py-3 mt-4"
          >
            <Text className="text-white font-semibold">Voltar ao Cardápio</Text>
          </Pressable>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="bg-background">
      <View className="flex-1 px-4 pt-4">
        {/* Header */}
        <Text className="text-2xl font-bold text-foreground mb-4">
          Seu Carrinho
        </Text>

        {/* Items List */}
        <FlatList
          data={items}
          keyExtractor={(item) => item.product.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View className="bg-surface rounded-lg p-4 mb-3 flex-row items-center justify-between">
              <View className="flex-1 gap-1">
                <Text className="text-base font-semibold text-foreground">
                  {item.product.name}
                </Text>
                <Text className="text-sm text-muted">
                  R$ {item.product.price.toFixed(2)} cada
                </Text>
              </View>

              {/* Quantity Controls */}
              <View className="flex-row items-center gap-2 mr-4">
                <Pressable
                  onPress={() =>
                    updateQuantity(item.product.id, item.quantity - 1)
                  }
                  className="w-8 h-8 rounded-md bg-primary/10 items-center justify-center"
                >
                  <Text className="text-primary font-bold">−</Text>
                </Pressable>

                <Text className="w-6 text-center font-semibold text-foreground">
                  {item.quantity}
                </Text>

                <Pressable
                  onPress={() =>
                    updateQuantity(item.product.id, item.quantity + 1)
                  }
                  className="w-8 h-8 rounded-md bg-primary/10 items-center justify-center"
                >
                  <Text className="text-primary font-bold">+</Text>
                </Pressable>
              </View>

              {/* Subtotal and Remove */}
              <View className="items-end gap-2">
                <Text className="font-bold text-primary">
                  R$ {(item.product.price * item.quantity).toFixed(2)}
                </Text>
                <Pressable
                  onPress={() => handleRemoveItem(item.product.id)}
                  className="px-2 py-1 rounded-md bg-error/10"
                >
                  <Text className="text-error text-xs font-semibold">
                    Remover
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
        />

        {/* Spacer */}
        <View className="flex-1" />

        {/* Summary */}
        <View className="bg-surface rounded-lg p-4 mb-4 gap-3">
          <View className="flex-row justify-between items-center border-b border-border pb-3">
            <Text className="text-muted">Itens ({itemCount})</Text>
            <Text className="text-foreground font-semibold">
              R$ {total.toFixed(2)}
            </Text>
          </View>

          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-bold text-foreground">Total</Text>
            <Text className="text-2xl font-bold text-primary">
              R$ {total.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Checkout Button */}
        <Pressable
          onPress={handleCheckout}
          className="bg-primary rounded-lg py-4 items-center justify-center mb-4"
        >
          <Text className="text-white font-bold text-lg">
            Finalizar Compra
          </Text>
        </Pressable>

        {/* Continue Shopping Button */}
        <Pressable
          onPress={() => router.back()}
          className="bg-surface border border-border rounded-lg py-3 items-center justify-center mb-4"
        >
          <Text className="text-foreground font-semibold">
            Continuar Comprando
          </Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}
