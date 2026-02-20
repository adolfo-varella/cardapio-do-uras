# Doçuras da Angel - TODO

## Estrutura de Dados
- [x] Criar arquivo de dados com categorias e produtos
- [x] Configurar tipos TypeScript para produtos e categorias

## Telas Principais
- [x] Home Screen com categorias e grid de produtos
- [x] Product Detail Screen
- [x] Cart Screen (carrinho de compras)
- [x] Checkout Screen (finalização de pedido)

## Funcionalidades
- [x] Filtrar produtos por categoria
- [x] Adicionar produtos ao carrinho
- [x] Remover produtos do carrinho
- [x] Ajustar quantidade de produtos
- [x] Calcular total do carrinho
- [x] Persistência do carrinho em AsyncStorage
- [x] Validação de formulário de checkout
- [x] Confirmação de pedido

## Design e UI
- [x] Implementar paleta de cores (dourado, bege, coral)
- [x] Criar componentes reutilizáveis (ProductCard, Button, etc)
- [x] Adicionar feedback visual (press states, haptics)
- [x] Implementar tab bar com navegação

## Branding
- [x] Gerar logo/ícone do app
- [x] Atualizar app.config.ts com nome e logo
- [x] Configurar cores do tema

## Testes
- [x] Testar fluxo de compra completo
- [x] Testar persistencia do carrinho
- [x] Testar validacao de formulario
- [ ] Testar em iOS e Android (Expo Go)

## Deploy
- [x] Criar checkpoint final
- [x] Preparar para publicacao


## Backend e Pedidos
- [x] Criar tabela de pedidos no banco de dados
- [x] Implementar API para salvar pedidos
- [x] Integrar notificacoes push para confirmacao de pedido
- [ ] Criar dashboard de pedidos no servidor

## Imagens dos Produtos
- [x] Gerar imagens para cada categoria de produto
- [x] Integrar imagens no ProductCard
- [x] Otimizar imagens para mobile

## Autenticação e Usuários
- [x] Implementar login/cadastro com OAuth (via useAuth hook)
- [x] Criar tela de perfil do usuário
- [x] Implementar histórico de pedidos
- [ ] Adicionar favoritos/produtos salvos


## Notificacoes Push
- [x] Configurar expo-notifications
- [x] Implementar listener de notificacoes
- [x] Enviar notificacao ao confirmar pedido
- [ ] Enviar notificacao ao mudar status do pedido

## Favoritos/Wishlist
- [x] Criar tabela de favoritos no banco de dados
- [x] Implementar hook useFavorites com persistencia
- [x] Adicionar botao de favorito no ProductCard
- [x] Criar tela de favoritos
- [ ] Sincronizar favoritos com backend

## Cupons e Promocoes
- [x] Criar tabela de cupons no banco de dados
- [x] Implementar validacao de cupom no checkout
- [x] Exibir desconto aplicado no resumo do pedido
- [x] Criar tela de cupons disponiveis
- [x] Adicionar campo de cupom no checkout


## Avaliacoes de Clientes
- [x] Criar tabela de avaliacoes no banco de dados
- [x] Implementar hook useReviews com persistencia
- [ ] Adicionar botao de avaliacao no ProductCard
- [x] Criar tela de avaliacoes do produto (ReviewCard)
- [x] Exibir media de estrelas no produto

## Relatorios de Vendas
- [x] Criar tabela de relatorios no banco de dados
- [ ] Implementar API para gerar relatorios
- [x] Criar tela de dashboard de vendas
- [x] Exibir graficos de vendas por periodo
- [x] Exibir cupons mais usados

## Integracao WhatsApp
- [x] Configurar API do WhatsApp Business
- [x] Implementar envio de confirmacao de pedido
- [x] Enviar detalhes do pedido via WhatsApp
- [ ] Adicionar link de rastreamento
