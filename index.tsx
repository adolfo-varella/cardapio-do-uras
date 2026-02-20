import { ScrollView, Text, View, FlatList, Image, Pressable } from "react-native";
import { useState, useMemo } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { ProductCard } from "@/components/product-card";
import { useCartContext } from "@/lib/cart-context";
import { categories, getProductsByCategory } from "@/lib/data/products";
import type { Product } from "@/lib/data/products";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";

export default function HomeScreen() {
  const router = useRouter();
  const { addToCart, itemCount } = useCartContext();
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);

  const products = useMemo(
    () => getProductsByCategory(selectedCategory),
    [selectedCategory]
  );

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <ScreenContainer className="bg-background">
      {/* Header */}
      <View className="px-4 pt-4 pb-2 border-b border-border">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-1">
            <Text className="text-2xl font-bold text-foreground">
              Doçuras da Angel
            </Text>
            <Text className="text-sm text-muted">Confeitaria Premium</Text>
          </View>
          {/* Cart Icon */}
          <Pressable
            onPress={() => router.push("./cart")}
            className="bg-primary rounded-full w-12 h-12 items-center justify-center relative"
          >
            <Text className="text-xl">🛒</Text>
            {itemCount > 0 && (
              <View className="absolute -top-2 -right-2 bg-error rounded-full w-6 h-6 items-center justify-center">
                <Text className="text-white text-xs font-bold">{itemCount}</Text>
              </View>
            )}
          </Pressable>
        </View>

        {/* Category Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row"
          contentContainerStyle={{ paddingVertical: 8 }}
        >
          {categories.map((category) => (
            <Pressable
              key={category.id}
              onPress={() => handleCategoryChange(category.id)}
              className={`px-4 py-2 rounded-full mr-2 ${
                selectedCategory === category.id
                  ? "bg-primary"
                  : "bg-surface border border-border"
              }`}
            >
              <Text
                className={`text-sm font-semibold ${
                  selectedCategory === category.id
                    ? "text-white"
                    : "text-foreground"
                }`}
              >
                {category.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Products Grid */}
      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`./product/${item.id}`)}
            className="flex-1"
          >
            <ProductCard product={item} onAddToCart={handleAddToCart} />
          </Pressable>
        )}
        contentContainerStyle={{ paddingVertical: 8 }}
        scrollEnabled={false}
      />
    </ScreenContainer>
  );
}
