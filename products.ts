export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  imageCategory?: string;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
}

export const categories: Category[] = [
  { id: "balas", name: "Balas Baianas" },
  { id: "cocadas", name: "Cocadas" },
  { id: "amendoim", name: "Amendoim" },
  { id: "bolo-pote", name: "Bolo de Pote" },
  { id: "mousse", name: "Mousse" },
  { id: "pao-mel", name: "Pão de Mel" },
  { id: "especial", name: "Especial" },
  { id: "trufa", name: "Trufa" },
  { id: "salgados", name: "Salgados" },
  { id: "escondidinho", name: "Escondidinho" },
  { id: "espetinho", name: "Espetinho" },
];

export const products: Product[] = [
  // Balas Baianas
  { id: "1", name: "Tradicional", category: "balas", price: 2.5, imageCategory: "bala" },
  { id: "2", name: "Maracujá", category: "balas", price: 2.5, imageCategory: "bala" },
  { id: "3", name: "Limão", category: "balas", price: 2.5, imageCategory: "bala" },
  { id: "4", name: "Morango", category: "balas", price: 2.5, imageCategory: "bala" },
  { id: "5", name: "Ameixa", category: "balas", price: 2.5, imageCategory: "bala" },
  { id: "6", name: "Goiabada", category: "balas", price: 2.5, imageCategory: "bala" },
  { id: "7", name: "Doce de Leite", category: "balas", price: 2.5, imageCategory: "bala" },

  // Cocadas
  { id: "8", name: "Maracujá Cremoso", category: "cocadas", price: 10.0, imageCategory: "cocadas" },
  { id: "9", name: "Marrom Cremosa", category: "cocadas", price: 10.0, imageCategory: "cocadas" },
  { id: "10", name: "Branca", category: "cocadas", price: 10.0, imageCategory: "cocadas" },

  // Amendoim
  { id: "11", name: "Pé de Moleque", category: "amendoim", price: 10.0, imageCategory: "brigadeiro" },
  { id: "12", name: "Pé de Moça", category: "amendoim", price: 10.0, imageCategory: "brigadeiro" },

  // Bolo de Pote
  { id: "13", name: "Chocolate com Creme", category: "bolo-pote", price: 10.0, imageCategory: "bolo" },
  { id: "14", name: "Prestígio", category: "bolo-pote", price: 10.0, imageCategory: "bolo" },

  // Mousse
  { id: "15", name: "Maracujá", category: "mousse", price: 7.0, imageCategory: "mousse" },
  { id: "16", name: "Maracujá com Chocolate", category: "mousse", price: 7.0, imageCategory: "mousse" },
  { id: "17", name: "Limão", category: "mousse", price: 7.0, imageCategory: "mousse" },

  // Pão de Mel
  { id: "18", name: "Doce de Leite", category: "pao-mel", price: 5.0, imageCategory: "bolo" },
  { id: "19", name: "Prestígio", category: "pao-mel", price: 5.0, imageCategory: "bolo" },

  // Especial
  { id: "20", name: "Morango do Amor", category: "especial", price: 8.0, imageCategory: "bolo" },
  { id: "21", name: "Maçã do Amor", category: "especial", price: 8.0, imageCategory: "bolo" },

  // Trufa
  { id: "22", name: "Morango com Chocolate", category: "trufa", price: 10.0, imageCategory: "trufa" },

  // Salgados
  { id: "23", name: "Lanche Natural", category: "salgados", price: 10.0, imageCategory: "bolo" },
  { id: "24", name: "Esfirra de Carne", category: "salgados", price: 5.0, imageCategory: "bolo" },

  // Escondidinho
  { id: "25", name: "Carne", category: "escondidinho", price: 16.0, imageCategory: "bolo" },
  { id: "26", name: "Frango", category: "escondidinho", price: 16.0, imageCategory: "bolo" },

  // Espetinho
  { id: "27", name: "Morango", category: "espetinho", price: 10.0, imageCategory: "bolo" },
  { id: "28", name: "Uva", category: "espetinho", price: 10.0, imageCategory: "bolo" },
];

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.category === categoryId);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
