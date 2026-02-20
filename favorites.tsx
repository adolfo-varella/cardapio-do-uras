import { ScrollView, Text, View, FlatList, Pressable } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { ProductCard } from "@/components/product-card";
import { useFavorites } from "@/hooks/use-favorites";
import { useCartContext } from "@/lib/cart-context";
import { products } from "@/lib/data/products";
import * as Haptics from "expo-haptics";

export default function FavoritesScreen() {
  const { getFavoritesList, toggleFavorite } = useFavorites();
  const { addToCart } = useCartContext();

  const favoritesList = getFavoritesList();
  const favoriteProducts = products.filter((p) =>
    favoritesList.some((f) => f.productId === p.id)
  );

  const handleAddToCart = (product: any) => {
    addToCart(product, 1);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  if (favoriteProducts.length === 0) {
    return (
      <ScreenContainer className="p-6">
        <View className="flex-1 items-center justify-center gap-4">
          <Text className="text-4xl">❤️</Text>
          <Text className="text-xl font-bold text-foreground">
            Nenhum Favorito
          </Text>
          <Text className="text-base text-muted text-center">
            Adicione produtos aos favoritos para vê-los aqui
          </Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-4">
      <View className="mb-4">
        <Text className="text-2xl font-bold text-foreground">Favoritos</Text>
        <Text className="text-sm text-muted mt-1">
          {favoriteProducts.length} produto(s) salvado(s)
        </Text>
      </View>

      <FlatList
        data={favoriteProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onAddToCart={handleAddToCart}
          />
        )}
        scrollEnabled={false}
      />
    </ScreenContainer>
  );
}
