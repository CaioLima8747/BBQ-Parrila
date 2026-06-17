// Dados iniciais, categorias e estado global da aplicação

let menuItems = load("bbq_menu", null) || [
  { id: 1, name: "Burger Clássico", description: "Hambúrguer artesanal 180g, alface, tomate, queijo e molho especial", price: 32.9, image: "assets/Imagens/burger-classico.png", category: "classicos" },
  { id: 2, name: "Bacon Burger", description: "Hambúrguer 180g, bacon crocante, cheddar, cebola caramelizada", price: 38.9, image: "assets/Imagens/bacon burger.png", category: "especiais" },
  { id: 3, name: "Double Smash", description: "Dois hambúrgueres smash 120g, queijo, picles, molho BBQ", price: 42.9, image: "assets/Imagens/Double Smash.png", category: "especiais" },
  { id: 4, name: "Cheese Burger", description: "Hambúrguer 180g com blend de 3 queijos e maionese trufada", price: 36.9, image: "assets/Imagens/Cheese Burger.png", category: "classicos" },
  { id: 5, name: "Combo Burger + Fritas", description: "Burger clássico + batata frita + refrigerante 350ml", price: 45.9, image: "assets/Imagens/Combo Burger + Fritas.png", category: "combos" },
  { id: 6, name: "Premium BBQ", description: "Hambúrguer 200g, costela desfiada, onion rings, molho BBQ", price: 48.9, image: "assets/Imagens/Premium BBQ.png", category: "especiais" },
  { id: 7, name: "Batata Frita", description: "Porção de batata frita crocante com sal na medida", price: 15.9, image: "assets/Imagens/Batata Frita.png", category: "acompanhamentos" },
  { id: 8, name: "Onion Rings", description: "Anéis de cebola empanados e fritos até ficarem dourados", price: 18.9, image: "assets/Imagens/Onion Rings.png", category: "acompanhamentos" },
  { id: 9, name: "Nuggets", description: "10 unidades de nuggets de frango crocantes", price: 22.9, image: "assets/Imagens/Nuggets.png", category: "acompanhamentos" },
  { id: 10, name: "Batata Rústica", description: "Batatas rústicas temperadas com ervas", price: 17.9, image: "assets/Imagens/BatataR.png", category: "acompanhamentos" },
  { id: 11, name: "Coca-Cola 350ml", description: "Refrigerante Coca-Cola gelado", price: 6.9, image: "assets/Imagens/Coca Cola.png", category: "bebidas" },
  { id: 12, name: "Guaraná 350ml", description: "Refrigerante Guaraná gelado", price: 6.9, image: "assets/Imagens/Guarana.png", category: "bebidas" },
  { id: 13, name: "Suco de Laranja 500ml", description: "Suco natural de laranja", price: 12.9, image: "assets/Imagens/Suco de laranja.png", category: "bebidas" },
  { id: 14, name: "Suco de Morango 500ml", description: "Suco natural de morango", price: 12.9, image: "assets/Imagens/Morango.png", category: "bebidas" },
  { id: 15, name: "Água Mineral 500ml", description: "Água mineral sem gás", price: 4.9, image: "assets/Imagens/agua.png", category: "bebidas" },
  { id: 16, name: "Milkshake Chocolate", description: "Milkshake cremoso de chocolate 400ml", price: 16.9, image: "assets/Imagens/milkshake.png", category: "bebidas" }
];

const categories = [
  { id: "todos", name: "Todos" },
  { id: "classicos", name: "Clássicos" },
  { id: "especiais", name: "Especiais" },
  { id: "combos", name: "Combos" },
  { id: "acompanhamentos", name: "Acompanhamentos" },
  { id: "bebidas", name: "Bebidas" }
];

let state = {
  view: "home",
  category: "todos",
  cartOpen: false,
  selectedOrderId: null,
  currentOrderId: load("bbq_current_order", null),
  profileData: load("bbq_profile_data", null),
  cart: load("bbq_cart", []),
  user: load("bbq_user", null),
  orders: load("bbq_orders", seedOrders())
};

if (state.user?.profile === "cozinha") {
  state.view = "kitchen";
}

if (state.user?.profile === "gerente") {
  state.view = "dashboard";
};

function seedOrders() {
  return [
    { id: "BBQ-1001", customer: "Caio", items: "Burger Clássico, Coca-Cola", total: 47.8, status: "preparo", createdAt: new Date().toLocaleString("pt-BR") },
    { id: "BBQ-1002", customer: "Mesa Teste", items: "Premium BBQ", total: 56.9, status: "recebido", createdAt: new Date().toLocaleString("pt-BR") }
  ];
}
