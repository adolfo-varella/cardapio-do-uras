import { ScrollView, Text, View, Pressable, Alert, ActivityIndicator } from "react-native";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { trpc } from "@/lib/trpc";
import * as Haptics from "expo-haptics";

export default function ProfileScreen() {
  const router = useRouter();
  const { user, isAuthenticated, loading, logout } = useAuth();
  const { data: orders, isLoading: ordersLoading } = trpc.orders.list.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  const handleLogout = async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await logout();
    router.replace("/(tabs)");
  };

  const handleLogin = () => {
    router.push("/(tabs)");
  };

  if (loading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <ActivityIndicator size="large" color="#D4A574" />
      </ScreenContainer>
    );
  }

  if (!isAuthenticated) {
    return (
      <ScreenContainer className="p-6">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 gap-6 justify-center">
            <View className="items-center gap-2">
              <Text className="text-3xl font-bold text-foreground">
                Bem-vindo!
              </Text>
              <Text className="text-base text-muted text-center">
                Faça login para acessar seu histórico de pedidos e perfil
              </Text>
            </View>

            <Pressable
              onPress={handleLogin}
              className="bg-primary rounded-lg py-4 items-center justify-center"
              style={({ pressed }) => ({
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <Text className="text-white font-bold text-lg">Fazer Login</Text>
            </Pressable>
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {/* User Info */}
          <View className="bg-surface rounded-lg p-4 gap-2">
            <Text className="text-lg font-bold text-foreground">
              Meu Perfil
            </Text>
            <View className="border-t border-border pt-3 mt-2">
              <Text className="text-sm text-muted mb-1">Nome</Text>
              <Text className="text-base font-semibold text-foreground">
                {user?.name || "Usuário"}
              </Text>
            </View>
            {user?.email && (
              <View className="border-t border-border pt-3 mt-2">
                <Text className="text-sm text-muted mb-1">Email</Text>
                <Text className="text-base font-semibold text-foreground">
                  {user.email}
                </Text>
              </View>
            )}
          </View>

          {/* Orders History */}
          <View className="gap-3">
            <Text className="text-lg font-bold text-foreground">
              Histórico de Pedidos
            </Text>

            {ordersLoading ? (
              <ActivityIndicator size="small" color="#D4A574" />
            ) : orders && orders.length > 0 ? (
              <View className="gap-2">
                {orders.map((order) => (
                  <View
                    key={order.id}
                    className="bg-surface rounded-lg p-4 border border-border"
                  >
                    <View className="flex-row justify-between items-start mb-2">
                      <View className="flex-1">
                        <Text className="text-sm font-semibold text-foreground">
                          Pedido #{order.id}
                        </Text>
                        <Text className="text-xs text-muted mt-1">
                          {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                        </Text>
                      </View>
                      <View className="bg-primary/10 rounded-full px-3 py-1">
                        <Text className="text-xs font-semibold text-primary">
                          {order.status}
                        </Text>
                      </View>
                    </View>

                    <View className="border-t border-border pt-2 mt-2">
                      <Text className="text-sm text-muted mb-1">
                        {typeof order.items === "string"
                          ? JSON.parse(order.items).length
                          : (order.items as any).length}{" "}
                        item(ns)
                      </Text>
                      <Text className="text-base font-bold text-foreground">
                        R$ {parseFloat(order.totalPrice as any).toFixed(2)}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <View className="bg-surface rounded-lg p-4 items-center justify-center py-8">
                <Text className="text-muted text-center">
                  Nenhum pedido realizado ainda
                </Text>
              </View>
            )}
          </View>

          {/* Logout Button */}
          <Pressable
            onPress={handleLogout}
            className="bg-error rounded-lg py-3 items-center justify-center mt-4"
            style={({ pressed }) => ({
              opacity: pressed ? 0.8 : 1,
            })}
          >
            <Text className="text-white font-bold">Sair</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
