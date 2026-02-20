import { ScrollView, Text, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/hooks/use-auth";

export default function DashboardScreen() {
  const { user, isAuthenticated } = useAuth();

  // Mock data for dashboard
  const dashboardData = {
    todaySales: 1250.50,
    todayOrders: 8,
    monthlyRevenue: 15430.00,
    topProduct: "Brigadeiro Premium",
    topCoupon: "DOCES15",
    totalCustomers: 45,
    averageOrderValue: 156.31,
  };

  const weeklyData = [
    { day: "Seg", sales: 1200 },
    { day: "Ter", sales: 1450 },
    { day: "Qua", sales: 980 },
    { day: "Qui", sales: 1650 },
    { day: "Sex", sales: 1900 },
    { day: "Sab", sales: 2100 },
    { day: "Dom", sales: 1250 },
  ];

  const maxSales = Math.max(...weeklyData.map((d) => d.sales));

  if (!isAuthenticated) {
    return (
      <ScreenContainer className="p-6">
        <View className="flex-1 items-center justify-center gap-4">
          <Text className="text-4xl">🔒</Text>
          <Text className="text-lg font-bold text-foreground">
            Acesso Restrito
          </Text>
          <Text className="text-sm text-muted text-center">
            Apenas administradores podem acessar o dashboard
          </Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-4">
          {/* Header */}
          <View className="mb-2">
            <Text className="text-2xl font-bold text-foreground">Dashboard</Text>
            <Text className="text-sm text-muted mt-1">
              Relatório de vendas e desempenho
            </Text>
          </View>

          {/* Today's Summary */}
          <View className="grid grid-cols-2 gap-3">
            <View className="bg-primary/10 rounded-lg p-4">
              <Text className="text-xs text-muted mb-1">Vendas Hoje</Text>
              <Text className="text-2xl font-bold text-primary">
                R$ {dashboardData.todaySales.toFixed(2)}
              </Text>
              <Text className="text-xs text-muted mt-1">
                {dashboardData.todayOrders} pedidos
              </Text>
            </View>

            <View className="bg-success/10 rounded-lg p-4">
              <Text className="text-xs text-muted mb-1">Receita Mensal</Text>
              <Text className="text-2xl font-bold text-success">
                R$ {dashboardData.monthlyRevenue.toFixed(2)}
              </Text>
              <Text className="text-xs text-muted mt-1">
                {dashboardData.totalCustomers} clientes
              </Text>
            </View>
          </View>

          {/* Key Metrics */}
          <View className="bg-surface rounded-lg p-4 gap-3">
            <Text className="text-lg font-bold text-foreground">
              Métricas Principais
            </Text>

            <View className="flex-row justify-between items-center py-2 border-b border-border">
              <Text className="text-sm text-muted">Ticket Médio</Text>
              <Text className="text-sm font-semibold text-foreground">
                R$ {dashboardData.averageOrderValue.toFixed(2)}
              </Text>
            </View>

            <View className="flex-row justify-between items-center py-2 border-b border-border">
              <Text className="text-sm text-muted">Produto Mais Vendido</Text>
              <Text className="text-sm font-semibold text-foreground">
                {dashboardData.topProduct}
              </Text>
            </View>

            <View className="flex-row justify-between items-center py-2">
              <Text className="text-sm text-muted">Cupom Mais Usado</Text>
              <Text className="text-sm font-semibold text-primary">
                {dashboardData.topCoupon}
              </Text>
            </View>
          </View>

          {/* Weekly Sales Chart */}
          <View className="bg-surface rounded-lg p-4 gap-3">
            <Text className="text-lg font-bold text-foreground">
              Vendas da Semana
            </Text>

            <View className="flex-row items-flex-end justify-between h-40 gap-2">
              {weeklyData.map((item) => (
                <View
                  key={item.day}
                  className="flex-1 items-center gap-2"
                >
                  <View
                    className="w-full bg-primary rounded-t-lg"
                    style={{
                      height: (item.sales / maxSales) * 120,
                    }}
                  />
                  <Text className="text-xs text-muted font-semibold">
                    {item.day}
                  </Text>
                  <Text className="text-xs text-foreground font-semibold">
                    R$ {(item.sales / 100).toFixed(0)}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Top Products */}
          <View className="bg-surface rounded-lg p-4 gap-3">
            <Text className="text-lg font-bold text-foreground">
              Produtos Populares
            </Text>

            {[
              { name: "Brigadeiro Premium", sales: 42 },
              { name: "Mousse de Chocolate", sales: 38 },
              { name: "Trufa Gourmet", sales: 35 },
            ].map((product, index) => (
              <View
                key={index}
                className="flex-row justify-between items-center py-2 border-b border-border"
              >
                <Text className="text-sm text-foreground">{product.name}</Text>
                <View className="flex-row items-center gap-2">
                  <View className="w-16 h-2 bg-border rounded-full overflow-hidden">
                    <View
                      className="h-full bg-primary"
                      style={{ width: `${(product.sales / 42) * 100}%` } as any}
                    />
                  </View>
                  <Text className="text-xs font-semibold text-foreground w-6 text-right">
                    {product.sales}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Footer Info */}
          <View className="bg-primary/10 rounded-lg p-3 mt-2">
            <Text className="text-xs text-primary font-semibold">
              💡 Dica: Ative mais cupons para aumentar as vendas!
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
