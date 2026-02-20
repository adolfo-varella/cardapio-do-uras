import { Pressable, Text, View, Image } from "react-native";
import { useState } from "react";
import * as Haptics from "expo-haptics";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/hooks/use-favorites";
import type { Product } from "@/lib/data/products";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

// Image map for categories
const imageMap: Record<string, any> = {
  bala: require("@/assets/images/bala.png"),
  cocadas: require("@/assets/images/cocadas.png"),
  brigadeiro: require("@/assets/images/brigadeiro.png"),
  bolo: require("@/assets/images/bolo.png"),
  mousse: require("@/assets/images/mousse.png"),
  trufa: require("@/assets/images/trufa.png"),
};

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isPressed, setIsPressed] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(product.id);

  const handleAddToCart = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onAddToCart(product);
  };

  const handleToggleFavorite = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    toggleFavorite(product.id);
  };

  const imageSource = product.imageCategory
    ? imageMap[product.imageCategory]
    : undefined;

  return (
    <View className="flex-1 bg-surface rounded-xl overflow-hidden m-2 shadow-sm border border-border">
      {/* Product Image with Favorite Button */}
      <View className="relative">
        {imageSource ? (
          <Image
            source={imageSource}
            className="w-full h-32 bg-muted"
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-32 bg-primary/10 items-center justify-center">
            <Text className="text-4xl">🍰</Text>
          </View>
        )}

        {/* Favorite Button */}
        <Pressable
          onPress={handleToggleFavorite}
          className="absolute top-2 right-2 bg-white/90 rounded-full w-8 h-8 items-center justify-center"
          style={({ pressed }) => ({
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <Text className="text-lg">{favorite ? "❤️" : "🤍"}</Text>
        </Pressable>
      </View>

      {/* Content */}
      <View className="p-3 flex-1 justify-between">
        {/* Product Name */}
        <Text className="text-sm font-semibold text-foreground mb-1 line-clamp-2">
          {product.name}
        </Text>

        {/* Price and Button */}
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-lg font-bold text-primary">
            R$ {product.price.toFixed(2)}
          </Text>

          {/* Add to Cart Button */}
          <Pressable
            onPress={handleAddToCart}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            className={cn(
              "bg-primary rounded-lg px-3 py-2",
              isPressed && "opacity-80"
            )}
          >
            <Text className="text-white font-semibold text-xs">
              Adicionar
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
