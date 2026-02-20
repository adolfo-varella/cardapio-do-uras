import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Favorite {
  productId: string;
  addedAt: number;
}

const FAVORITES_KEY = "@doçuras_da_angel/favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Map<string, Favorite>>(new Map());
  const [loading, setLoading] = useState(true);

  // Load favorites from storage
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const stored = await AsyncStorage.getItem(FAVORITES_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setFavorites(new Map(parsed));
        }
      } catch (error) {
        console.error("Failed to load favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  // Save favorites to storage
  const saveFavorites = useCallback(async (newFavorites: Map<string, Favorite>) => {
    try {
      const serialized = Array.from(newFavorites.entries());
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(serialized));
    } catch (error) {
      console.error("Failed to save favorites:", error);
    }
  }, []);

  const toggleFavorite = useCallback(
    (productId: string) => {
      setFavorites((prev) => {
        const newFavorites = new Map(prev);
        if (newFavorites.has(productId)) {
          newFavorites.delete(productId);
        } else {
          newFavorites.set(productId, {
            productId,
            addedAt: Date.now(),
          });
        }
        saveFavorites(newFavorites);
        return newFavorites;
      });
    },
    [saveFavorites]
  );

  const isFavorite = useCallback(
    (productId: string) => {
      return favorites.has(productId);
    },
    [favorites]
  );

  const getFavoritesList = useCallback(() => {
    return Array.from(favorites.values());
  }, [favorites]);

  return {
    favorites,
    loading,
    toggleFavorite,
    isFavorite,
    getFavoritesList,
  };
}
