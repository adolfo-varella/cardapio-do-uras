# 🧁 Doçuras da Angel - Cardápio Online

Aplicativo móvel premium de cardápio para venda de produtos de confeitaria com integração completa de backend, autenticação, cupons, favoritos e integração WhatsApp.

## 🚀 Características

- **📱 Interface Mobile First** - Design responsivo para iOS e Android via Expo
- **🛒 Carrinho de Compras** - Persistência local com AsyncStorage
- **🎟️ Sistema de Cupons** - 4 cupons pré-configurados com desconto
- **❤️ Favoritos** - Salve produtos favoritos para compra rápida
- **⭐ Avaliações** - Sistema de 1-5 estrelas com comentários
- **📊 Dashboard** - Relatórios de vendas e métricas
- **💬 WhatsApp** - Integração automática para confirmação de pedidos
- **👤 Autenticação** - Login OAuth com histórico de pedidos
- **🔐 Backend** - MySQL com Drizzle ORM e tRPC

## 📋 Requisitos

- **Node.js** 18+
- **pnpm** 9.12.0+
- **Expo Go** (para testar no celular)
- **MySQL** (para backend)

## 🛠️ Instalação

### 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/docuras-da-angel-app.git
cd docuras-da-angel-app
```

### 2. Instalar Dependências

```bash
pnpm install
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Backend
DATABASE_URL=mysql://user:password@localhost:3306/docuras_angel
NODE_ENV=development

# WhatsApp (seu número)
WHATSAPP_NUMBER=43988240581

# App Config
EXPO_PUBLIC_API_URL=http://localhost:3000
```

### 4. Configurar Banco de Dados

```bash
# Gerar e executar migrações
pnpm db:push
```

### 5. Iniciar o Projeto

```bash
# Terminal 1: Backend + Frontend
pnpm dev

# Terminal 2 (opcional): Apenas Metro (frontend)
pnpm dev:metro
```

## 📱 Acessar o App

### Via Navegador (Web)
```
http://localhost:8081
```

### Via Celular (Expo Go)
1. Baixe **Expo Go** na App Store ou Google Play
2. Abra o app e escaneie o código QR exibido no terminal
3. Ou use: `pnpm qr` para gerar código QR

## 🧪 Testes

```bash
# Executar todos os testes
pnpm test

# Modo watch
pnpm test --watch
```

**Cobertura de Testes:**
- ✅ 29 testes passando
- ✅ Carrinho de compras
- ✅ Cupons e descontos
- ✅ Favoritos
- ✅ Fluxo de checkout
- ✅ Autenticação

## 📁 Estrutura do Projeto

```
docuras-da-angel-app/
├── app/                          # Telas e rotas (Expo Router)
│   ├── (tabs)/                   # Abas principais
│   │   ├── index.tsx             # Home
│   │   ├── profile.tsx           # Perfil do usuário
│   │   ├── favorites.tsx         # Favoritos
│   │   ├── coupons.tsx           # Cupons disponíveis
│   │   ├── dashboard.tsx         # Dashboard de vendas
│   │   └── _layout.tsx           # Configuração de tabs
│   ├── checkout.tsx              # Tela de checkout
│   ├── product/[id].tsx          # Detalhe do produto
│   └── _layout.tsx               # Layout raiz
├── components/                   # Componentes reutilizáveis
│   ├── product-card.tsx          # Card de produto
│   ├── review-card.tsx           # Card de avaliação
│   └── screen-container.tsx      # Container com SafeArea
├── hooks/                        # Custom hooks
│   ├── use-cart.ts               # Gerenciar carrinho
│   ├── use-coupons.ts            # Gerenciar cupons
│   ├── use-favorites.ts          # Gerenciar favoritos
│   ├── use-reviews.ts            # Gerenciar avaliações
│   ├── use-notifications.ts      # Notificações locais
│   └── use-whatsapp.ts           # Integração WhatsApp
├── lib/                          # Utilitários
│   ├── data/products.ts          # Dados de produtos
│   ├── cart-context.tsx          # Context do carrinho
│   ├── trpc.ts                   # Cliente tRPC
│   └── utils.ts                  # Funções auxiliares
├── server/                       # Backend
│   ├── db.ts                     # Funções de banco de dados
│   ├── routers.ts                # Rotas tRPC
│   └── _core/index.ts            # Servidor Express
├── drizzle/                      # Migrações do banco
│   └── schema.ts                 # Schema do banco de dados
├── assets/images/                # Imagens e ícones
├── tailwind.config.js            # Configuração Tailwind
├── theme.config.js               # Paleta de cores
└── app.config.ts                 # Configuração do Expo
```

## 🎨 Paleta de Cores

| Cor | Hex | Uso |
|-----|-----|-----|
| Primária | `#D4A574` | Botões e destaques |
| Secundária | `#C85A54` | Acentos |
| Fundo | `#F5E6D3` | Fundo geral |
| Superfície | `#FFFFFF` | Cards e superfícies |
| Texto | `#11181C` | Texto principal |
| Muted | `#687076` | Texto secundário |

## 🔌 API Endpoints (tRPC)

### Pedidos
```typescript
// Criar pedido
trpc.orders.create.mutate({
  items: [...],
  customerName: "João",
  customerPhone: "43988240581",
  address: "Rua X, 123",
  notes: "Sem açúcar",
  couponCode: "BEMVINDO10"
})

// Listar pedidos do usuário
trpc.orders.list.useQuery()

// Atualizar status do pedido
trpc.orders.updateStatus.mutate({ orderId: 1, status: "delivered" })
```

### Avaliações
```typescript
// Criar avaliação
trpc.reviews.create.mutate({
  productId: 1,
  rating: 5,
  comment: "Delicioso!"
})

// Listar avaliações do produto
trpc.reviews.list.useQuery({ productId: 1 })
```

## 💬 Integração WhatsApp

O app envia automaticamente confirmação de pedido via WhatsApp para:
```
+55 43 98824-0581
```

**Mensagem Padrão:**
```
Olá! 👋
Seu pedido #12345 foi confirmado!

Produtos:
- Cocada (2x) - R$ 20,00
- Brigadeiro (1x) - R$ 5,00

Total: R$ 25,00
Cupom: BEMVINDO10 (-R$ 2,50)
**Total Final: R$ 22,50**

Endereço: Rua X, 123
Observações: Sem açúcar

Obrigado! 🙏
```

## 🚀 Deploy

### Opção 1: Expo EAS (Recomendado)

```bash
# Login no Expo
expo login

# Build para iOS
eas build --platform ios

# Build para Android
eas build --platform android

# Submit para App Store/Play Store
eas submit --platform ios
eas submit --platform android
```

### Opção 2: Build Local

```bash
# iOS
eas build --platform ios --local

# Android
eas build --platform android --local
```

## 📊 Banco de Dados

### Tabelas

**users**
- id, email, name, role, createdAt

**orders**
- id, userId, items (JSON), total, status, customerName, customerPhone, address, notes, couponCode, createdAt

**favorites**
- id, userId, productId, createdAt

**coupons**
- id, code, discountType, discountValue, maxUses, usedCount, expiresAt

**reviews**
- id, productId, userId, rating, comment, createdAt

**salesReports**
- id, date, totalSales, ordersCount, topProducts (JSON), topCoupons (JSON)

## 🐛 Troubleshooting

### Erro: "No projectId found"
**Solução:** Remova o arquivo `.env` e recrie com as variáveis corretas.

### Erro: "Android Push notifications removed from Expo Go"
**Solução:** Use a versão corrigida que implementa notificações locais apenas.

### Erro: "Database connection failed"
**Solução:** Verifique se o MySQL está rodando e a `DATABASE_URL` está correta.

### App não carrega no celular
**Solução:** 
1. Certifique-se de que celular e computador estão na mesma rede WiFi
2. Execute `pnpm qr` para gerar novo código QR
3. Reinicie o Expo Go

## 📞 Suporte

- **WhatsApp:** (43) 98824-0581
- **Email:** contato@docurasangel.com.br
- **Issues:** [GitHub Issues](https://github.com/seu-usuario/docuras-da-angel-app/issues)

## 📄 Licença

Este projeto é propriedade da Doçuras da Angel. Todos os direitos reservados.

## 👨‍💻 Desenvolvido por

Desenvolvido com ❤️ usando **React Native**, **Expo**, **TypeScript** e **Tailwind CSS**.

---

**Versão:** 1.0.0  
**Última atualização:** Fevereiro 2026  
**Status:** ✅ Produção
