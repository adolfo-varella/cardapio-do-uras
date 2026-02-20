# Design do App - Doçuras da Angel

## Visão Geral
Um aplicativo móvel de cardápio para a confeitaria **Doçuras da Angel**, permitindo que clientes visualizem produtos por categoria, vejam preços e detalhes. Design focado em **mobile portrait (9:16)** e **uso com uma mão**.

## Paleta de Cores
- **Primária**: `#D4A574` (Dourado/Caramelo - elegante e confeitaria)
- **Secundária**: `#F5E6D3` (Bege claro - fundo suave)
- **Destaque**: `#C85A54` (Coral/Rosa - chamada de ação)
- **Texto Principal**: `#2C2C2C` (Cinza escuro)
- **Texto Secundário**: `#6B6B6B` (Cinza médio)
- **Fundo**: `#FFFFFF` (Branco)

## Estrutura de Telas

### 1. **Home Screen** (Tela Principal)
**Conteúdo:**
- Logo/Header da Doçuras da Angel
- Barra de busca (opcional para MVP)
- Lista de categorias como abas horizontais deslizáveis
- Grid de produtos (2 colunas) com:
  - Imagem do produto (ícone/placeholder)
  - Nome do produto
  - Preço destacado
  - Botão "Adicionar ao Carrinho"

**Funcionalidade:**
- Selecionar categoria → filtrar produtos
- Tap em produto → abrir detalhe
- Tap em "Adicionar" → adicionar ao carrinho com feedback visual

### 2. **Product Detail Screen** (Detalhe do Produto)
**Conteúdo:**
- Imagem grande do produto
- Nome e descrição
- Preço em destaque
- Quantidade (spinner +/-)
- Botão "Adicionar ao Carrinho" (grande, primário)
- Botão "Voltar"

**Funcionalidade:**
- Ajustar quantidade antes de adicionar
- Feedback haptic ao adicionar

### 3. **Cart Screen** (Carrinho)
**Conteúdo:**
- Lista de itens no carrinho com:
  - Nome do produto
  - Quantidade
  - Preço unitário
  - Subtotal
  - Botão remover (X)
- Resumo:
  - Total de itens
  - Valor total
- Botão "Finalizar Compra" (grande, primário)
- Botão "Continuar Comprando"

**Funcionalidade:**
- Aumentar/diminuir quantidade
- Remover item
- Calcular total automaticamente

### 4. **Checkout Screen** (Finalização)
**Conteúdo:**
- Resumo do pedido
- Formulário simples:
  - Nome
  - Telefone
  - Endereço (opcional)
  - Observações (opcional)
- Botão "Confirmar Pedido"
- Botão "Voltar"

**Funcionalidade:**
- Validar campos obrigatórios
- Mostrar confirmação ao finalizar

## Fluxo Principal de Usuário

1. **Entrada**: Usuário abre o app → Home Screen (categoria padrão: "Balas Baianas")
2. **Navegação**: Desliza entre categorias → produtos filtrados
3. **Detalhe**: Tap em produto → Product Detail Screen
4. **Adição**: Ajusta quantidade → Tap "Adicionar" → volta para Home com feedback
5. **Carrinho**: Tap no ícone de carrinho (tab bar) → Cart Screen
6. **Checkout**: Tap "Finalizar Compra" → Checkout Screen
7. **Confirmação**: Preenche dados → Tap "Confirmar" → mensagem de sucesso

## Categorias de Produtos
1. Balas Baianas (7 itens)
2. Cocadas (3 itens)
3. Amendoim (2 itens)
4. Bolo de Pote (2 itens)
5. Mousse (3 itens)
6. Pão de Mel (2 itens)
7. Especial (2 itens)
8. Trufa (1 item)
9. Salgados (2 itens)
10. Escondidinho (2 itens)
11. Espetinho (2 itens)

## Componentes Principais
- **Header**: Logo + título + carrinho (ícone com badge de quantidade)
- **CategoryTabs**: Abas horizontais deslizáveis
- **ProductCard**: Card compacto com imagem, nome, preço e botão
- **ProductDetail**: Tela expandida com controle de quantidade
- **CartItem**: Item de carrinho com controles de quantidade e remoção
- **Button**: Botões primários e secundários
- **Input**: Campos de texto para formulário

## Considerações de UX
- **Feedback visual**: Botões com press states (opacidade)
- **Haptic feedback**: Ao adicionar ao carrinho (Light impact)
- **Persistência**: Carrinho salvo em AsyncStorage (local)
- **Acessibilidade**: Textos legíveis, contraste adequado
- **Performance**: FlatList para listas longas, não ScrollView com map()

## Próximos Passos
1. Criar estrutura de dados (produtos, categorias)
2. Implementar Home Screen com categorias e produtos
3. Implementar Cart Screen
4. Implementar Checkout Screen
5. Adicionar persistência (AsyncStorage)
6. Testes e refinamentos
