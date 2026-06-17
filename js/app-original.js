let menuItems = load("bbq_menu", null) || [
  { id: 1, name: "Burger Clássico", description: "Hambúrguer artesanal 180g, alface, tomate, queijo e molho especial", price: 32.9, image:"assets/Imagens/burger-classico.png", category: "classicos" },
  { id: 2, name: "Bacon Burger", description: "Hambúrguer 180g, bacon crocante, cheddar, cebola caramelizada", price: 38.9, image: "assets/Imagens/bacon-burger.png", category: "especiais" },
  { id: 3, name: "Double Smash", description: "Dois hambúrgueres smash 120g, queijo, picles, molho BBQ", price: 42.9, image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", category: "especiais" },
  { id: 4, name: "Cheese Burger", description: "Hambúrguer 180g com blend de 3 queijos e maionese trufada", price: 36.9, image: "https://images.unsplash.com/photo-1549611016-3a70d82b5040?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", category: "classicos" },
  { id: 5, name: "Combo Burger + Fritas", description: "Burger clássico + batata frita + refrigerante 350ml", price: 45.9, image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", category: "combos" },
  { id: 6, name: "Premium BBQ", description: "Hambúrguer 200g, costela desfiada, onion rings, molho BBQ", price: 48.9, image: "https://images.unsplash.com/photo-1667329829058-ac191ba4a905?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", category: "especiais" },
  { id: 7, name: "Batata Frita", description: "Porção de batata frita crocante com sal na medida", price: 15.9, image: "https://images.unsplash.com/photo-1581966626689-b63d790b3d49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", category: "acompanhamentos" },
  { id: 8, name: "Onion Rings", description: "Anéis de cebola empanados e fritos até ficarem dourados", price: 18.9, image: "https://images.unsplash.com/photo-1639024471283-03518883512d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", category: "acompanhamentos" },
  { id: 9, name: "Nuggets", description: "10 unidades de nuggets de frango crocantes", price: 22.9, image: "https://images.unsplash.com/photo-1630825533852-796a8491c0ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", category: "acompanhamentos" },
  { id: 10, name: "Batata Rústica", description: "Batatas rústicas temperadas com ervas", price: 17.9, image: "https://images.unsplash.com/photo-1630825533949-74f62f54553a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", category: "acompanhamentos" },
  { id: 11, name: "Coca-Cola 350ml", description: "Refrigerante Coca-Cola gelado", price: 6.9, image: "https://images.unsplash.com/photo-1517959105821-eaf2591984ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", category: "bebidas" },
  { id: 12, name: "Guaraná 350ml", description: "Refrigerante Guaraná gelado", price: 6.9, image: "https://images.unsplash.com/photo-1629654613528-5d0a2e4166de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", category: "bebidas" },
  { id: 13, name: "Suco de Laranja 500ml", description: "Suco natural de laranja", price: 12.9, image: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", category: "bebidas" },
  { id: 14, name: "Suco de Morango 500ml", description: "Suco natural de morango", price: 12.9, image: "https://images.unsplash.com/photo-1605712916345-6ef6bcc2e29c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", category: "bebidas" },
  { id: 15, name: "Água Mineral 500ml", description: "Água mineral sem gás", price: 4.9, image: "https://images.unsplash.com/photo-1561935992-d4b2a39ca79a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", category: "bebidas" },
  { id: 16, name: "Milkshake Chocolate", description: "Milkshake cremoso de chocolate 400ml", price: 16.9, image: "https://images.unsplash.com/photo-1700328971815-854758899c06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", category: "bebidas" }
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
function save(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function load(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } }
function money(value) { return `R$ ${Number(value).toFixed(2).replace(".", ",")}`; }
function cartCount() { return state.cart.reduce((sum, item) => sum + item.quantity, 0); }
function subtotal() { return state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0); }
function total() { return subtotal() + (state.cart.length ? 8 : 0); }
function setView(view) { state.view = view; state.cartOpen = false; render(); window.scrollTo(0, 0); }

function header() {
  const user = state.user;
  return `
    <header class="header">
      <div class="container header-inner">
        <div class="logo" onclick="setView('home')" role="button">
          <div class="logo-icon">🔥</div>
          <div>
            <div class="logo-title">BBQ PARRILA</div>
            <div class="logo-subtitle">Hamburgueria Artesanal</div>
          </div>
        </div>
        <div class="header-actions">
        ${user?.profile === "cliente" ? `
          <button class="btn btn-dark-red" onclick="setView('history')">
    📦    <span class="label">Meus pedidos</span>
          </button>
          ` : ""}
          <button class="btn btn-dark-red" onclick="setView('tracking')">🏍️ <span class="label">Acompanhar pedido</span></button>
          <button class="btn btn-dark-red cart-btn" onclick="openCart()">🛒 <span class="label">Carrinho</span>${cartCount() ? `<span class="badge">${cartCount()}</span>` : ""}</button>
          ${user?.profile === "cozinha" ? `<button class="btn btn-dark-red" onclick="setView('kitchen')">👨‍🍳 <span class="label">Cozinha</span></button>` : ""}
          ${user?.profile === "gerente" ? `<button class="btn btn-dark-red" onclick="setView('dashboard')">📊 <span class="label">Dashboard</span></button>` : ""}
          ${user ? `<button class="btn btn-dark-red" onclick="logout()">↩ <span class="label">Sair</span></button>` : `<button class="btn btn-dark-red" onclick="setView('login')">↪ <span class="label">Entrar</span></button>`}
        </div>
      </div>
    </header>
  `;
}

function homeView() {
  if (state.user?.profile === "cozinha") {
    return kitchenView();
  }

  if (state.user?.profile === "gerente") {
    return dashboardView();
  }

  const filtered = state.category === "todos" 
    ? menuItems 
    : menuItems.filter(item => item.category === state.category);

  return `
    ${header()}
    <section class="hero">
      <div class="container">
        <h1>Hambúrgueres Artesanais</h1>
        <p>Feitos com ingredientes premium e muito sabor</p>
      </div>
    </section>
    <section class="categories">
      <div class="container category-list">
        ${categories.map(cat => `<button class="category-btn ${state.category === cat.id ? "active" : ""}" onclick="selectCategory('${cat.id}')">${cat.name}</button>`).join("")}
      </div>
    </section>
    <main class="container menu-section">
      <div class="grid">
        ${filtered.map(item => `
          <article class="card">
            <div class="card-img"><img src="${item.image}" alt="${item.name}"></div>
            <div class="card-body">
              <h3 class="card-title">${item.name}</h3>
              <p class="card-desc">${item.description}</p>
              <div class="card-bottom">
                <span class="price">${money(item.price)}</span>
                <button class="btn btn-red" onclick="addToCart(${item.id})">+ Adicionar</button>
              </div>
            </div>
          </article>
        `).join("")}
      </div>
    </main>
    ${cartDrawer()}
  `;
}

function loginView() {
  return `
    <section class="login-view">
      <div class="login-wrap">
        <div class="login-logo">
          <div class="circle">🔥</div>
          <h1>BBQ PARRILA</h1>
          <p>Hamburgueria Artesanal</p>
        </div>
        <div class="panel">
          <h2 id="authTitle">Entrar</h2>
          <div class="error" id="authError"></div>
          <form id="authForm" onsubmit="handleAuth(event)">
            <div class="field"><label>Nome</label><input id="nameInput" placeholder="Seu nome" /></div>
            <div class="field"><label>E-mail</label><input id="emailInput" type="email" placeholder="seu@email.com" required /></div>
            <div class="field"><label>Senha</label><input id="passwordInput" type="password" placeholder="••••••••" required /></div>

            <button class="btn btn-red btn-full" type="submit">Entrar / Cadastrar</button>
          </form>
          <div style="text-align:center;margin-top:18px"><button class="link-btn" onclick="setView('home')">Voltar ao cardápio</button></div>
        </div>
      </div>
    </section>
  `;
}

function cartDrawer() {
  if (!state.cartOpen) return "";
  return `
    <div class="drawer-backdrop" onclick="closeCart()"></div>
    <aside class="drawer">
      <div class="drawer-head"><h2>Seu Pedido</h2><button class="close" onclick="closeCart()">×</button></div>
      <div class="drawer-body">
        ${state.cart.length === 0 ? `<div class="empty">🛒<br><br>Seu carrinho está vazio</div>` : state.cart.map(item => `
          <div class="cart-item">
            <div class="cart-row">
              <div class="card-img"><img src="${item.image}" alt="${item.name}"></div>
              <div class="cart-info"><h4>${item.name}</h4><span class="price" style="font-size:18px">${money(item.price)}</span></div>
              <button class="icon-btn" onclick="deleteFromCart(${item.id})">×</button>
            </div>
            <div class="qty-row">
              <div class="qty-control"><button onclick="removeFromCart(${item.id})">−</button><strong>${item.quantity}</strong><button onclick="addToCart(${item.id})">+</button></div>
              <strong>${money(item.price * item.quantity)}</strong>
            </div>
          </div>
        `).join("")}
      </div>
      ${state.cart.length ? `
        <div class="drawer-footer">
          <div class="total-line"><span>Subtotal</span><span>${money(subtotal())}</span></div>
          <div class="total-line"><span>Taxa de entrega</span><span>R$ 8,00</span></div>
          <div class="total-line final"><span>Total</span><span>${money(total())}</span></div>
          <button class="btn btn-red btn-full" onclick="goCheckout()">${state.user ? "Finalizar Pedido" : "Entrar para Finalizar"}</button>
        </div>` : ""}
    </aside>
  `;
}

function checkoutView() {
  if (!state.cart.length) {
    return emptyCenter("Carrinho vazio", "Adicione produtos antes de finalizar o pedido.", "Voltar ao cardápio", "home");
  }

  return `
    ${header()}

    <main class="container checkout">
      <div class="page-head">
        <h1 class="page-title">Checkout</h1>
        <button class="btn btn-ghost" onclick="setView('home')">Voltar</button>
      </div>

      <div class="checkout-grid">
        <section class="panel">
          <h2>Dados de entrega</h2>

          <form id="checkoutForm" onsubmit="finishOrder(event)">
            <div class="field">
              <label>Nome</label>
              <input id="customerName" required value="${state.user?.name || ""}">
            </div>

            <div class="row">
              <div class="field">
                <label>Telefone</label>
                <input id="phone" required placeholder="(11) 99999-9999">
              </div>

              <div class="field">
                <label>Pagamento</label>
                <select id="payment" onchange="togglePixBox()">
                  <option>Cartão</option>
                  <option>Pix</option>
                  <option>Dinheiro</option>
                </select>
              </div>
            </div>

            <div class="pix-box hidden" id="pixBox">
              <h3>Pagamento via Pix</h3>

              <div class="pix-qrcode">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=BBQ-PARRILA-PIX-FICTICIO"
                  alt="QR Code Pix fictício"
                >
              </div>

              <p class="muted">
                Escaneie o QR Code ou copie o código Pix abaixo:
              </p>

              <div class="pix-code">
                BBQ-PARRILA-PIX-FICTICIO
              </div>

              <button
                type="button"
                class="btn btn-ghost btn-full"
                onclick="copyPixCode()"
              >
                Copiar código Pix
              </button>
            </div>

            <div class="field">
              <label>Endereço</label>
              <input id="address" required placeholder="Rua, número, bairro">
            </div>

            <div class="field">
              <label>Observações</label>
              <textarea id="notes" rows="3" placeholder="Ex: sem cebola"></textarea>
            </div>

            <button class="btn btn-red btn-full" type="submit">
              Confirmar pedido
            </button>
          </form>
        </section>

        <aside class="panel">
          <h2>Resumo</h2>

          ${state.cart.map(item => `
            <div class="summary-item">
              <span>${item.quantity}x ${item.name}</span>
              <strong>${money(item.price * item.quantity)}</strong>
            </div>
          `).join("")}

          <div class="total-line" style="margin-top:16px">
            <span>Subtotal</span>
            <span>${money(subtotal())}</span>
          </div>

          <div class="total-line">
            <span>Taxa</span>
            <span>R$ 8,00</span>
          </div>

          <div class="total-line final">
            <span>Total</span>
            <span>${money(total())}</span>
          </div>
        </aside>
      </div>
    </main>
  `;
}

function historyView() {
  if (!state.user) return loginView();

  const myOrders = state.orders.filter(order => order.email === state.user.email);

  return `
    ${header()}

    <main class="container checkout">
      <div class="page-head">
        <h1 class="page-title">Meus pedidos</h1>
        <button class="btn btn-ghost" onclick="setView('home')">Voltar</button>
      </div>

      ${
        myOrders.length === 0
          ? `<section class="panel">
              <p class="muted">Você ainda não fez nenhum pedido.</p>
            </section>`
          : myOrders.slice().reverse().map(order => `
              <section class="panel" style="margin-bottom:16px">
                <h2>Pedido ${order.id}</h2>
                <p><strong>Cliente:</strong> ${order.customer}</p>
                <p><strong>Endereço:</strong> ${order.address || "Não informado"}</p>
                <p><strong>Pagamento:</strong> ${order.payment || "Não informado"}</p>
                <p><strong>Itens:</strong>${Array.isArray(order.items)? order.items.map(item => `${item.quantity}x ${item.name}`).join(", "): order.items}</p>
                <p><strong>Total:</strong> ${money(order.total)}</p>
                <p><strong>Status:</strong><span class="status ${order.status}">${statusLabel(order.status)}</span></p>
                <p class="muted">${order.createdAt}</p>
                ${order.status === "entregue" ? `
             <button
                class="btn btn-ghost"
                onclick="deleteOrder('${order.id}')"
                style="margin-top:10px"
                >
                🗑️ Remover histórico
              </button>
` : ""}
              </section>
            `).join("")
      }
    </main>
  `;
}

function deleteOrder(id) {
  if (!confirm("Deseja remover este pedido do histórico?")) {
    return;
  }

  state.orders = state.orders.filter(order => order.id !== id);

  save("bbq_orders", state.orders);

  showToast("Histórico removido!");
  render();
}

function trackingView(orderId = null) {
  const last = orderId
    ? state.orders.find(o => o.id === orderId)
    : state.orders[state.orders.length - 1];

  if (!last) {
    return emptyCenter(
      "Nenhum pedido em andamento",
      "Você ainda não realizou nenhum pedido.",
      "Voltar ao cardápio",
      "home",
      "🏍️"
    );
  }

  const orderSteps = [
    "recebido",
    "preparo",
    "pronto",
    "saiu",
    "entregue"
  ];

  const labels = {
    recebido: "Pedido recebido",
    preparo: "Em preparo",
    pronto: "Pronto",
    saiu: "Saiu para entrega",
    entregue: "Entregue"
  };

  const index = orderSteps.indexOf(last.status);

  return `
    ${header()}

    <main class="container checkout">
      <div class="page-head">
        <h1 class="page-title">Acompanhar pedido</h1>

        <button
          class="btn btn-ghost"
          onclick="setView('home')"
        >
          Voltar
        </button>
      </div>

      <section class="tracking-card">
        <h2>Pedido ${last.id}</h2>

        <p class="muted">
          Total: <strong>${money(last.total)}</strong>
          • ${last.createdAt}
        </p>

        <div class="steps">
          ${orderSteps.map((s, i) => `
            <div class="step ${
            last.status === "entregue"
              ? "done"
              : i < index
              ? "done"
              : i === index
               ? "active"
               : ""
            }">
        <div class="step-dot">
            ${
                i <= index && last.status === "entregue"
                ? "✓"
              : i < index
              ? "✓"
              : i + 1
            }
        </div>

              <strong>${labels[s]}</strong>
            </div>
          `).join("")}
        </div>

        ${
          last.status === "saiu"
            ? `
              <button
                class="btn btn-red btn-full"
                onclick="confirmDelivery('${last.id}')"
                style="margin-top:20px"
              >
                Confirmar recebimento
              </button>
            `
            : ""
        }
        ${
          ["preparo", "pronto", "saiu"].includes(last.status)
          ? `
                <button
                  class="btn btn-ghost btn-full"
                  onclick="reportDelay('${last.id}')"
                  style="margin-top:12px"
                >
                  ⚠️ Reportar atraso
                </button>
    `
    : ""
}

      </section>
    </main>
  `;
}

function confirmDelivery(id) {
  const order = state.orders.find(o => o.id === id);

 if (order) {
  order.status = "entregue";
  showToast("Pedido entregue com sucesso!");
}
  save("bbq_orders", state.orders);
  render();
}

function reportDelay(id) {
  const order = state.orders.find(o => o.id === id);

  if (!order) {
    showToast("Pedido não encontrado.", "error");
    return;
  }

  order.delayReported = true;

  save("bbq_orders", state.orders);
  showToast("Atraso reportado. A equipe foi notificada.", "warning");
  render();
}

function dashboardView() {
  if (!state.user || state.user.profile !== "gerente") return loginView();

  const revenue = state.orders.reduce((s, o) => s + Number(o.total), 0);

  const received = state.orders.filter(o => o.status === "recebido").length;
  const preparing = state.orders.filter(o => o.status === "preparo").length;
  const ready = state.orders.filter(o => o.status === "pronto").length;
  const delivered = state.orders.filter(o => o.status === "entregue").length;

  const productSales = {};

  state.orders.forEach(order => {
    if (Array.isArray(order.items)) {
      order.items.forEach(item => {
        productSales[item.name] =
          (productSales[item.name] || 0) + item.quantity;
      });
    }
  });

  const bestSellers = Object.entries(productSales)
    .map(([name, quantity]) => ({ name, quantity }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  const maxSold = Math.max(...bestSellers.map(item => item.quantity), 1);
  const maxRevenue = Math.max(...state.orders.map(o => Number(o.total)), 1);

  const statusData = [
    { label: "Preparo", value: preparing },
    { label: "Prontos", value: ready },
    { label: "Entregues", value: delivered }
  ];

  const maxStatus = Math.max(...statusData.map(item => item.value), 1);

  const paymentData = ["Cartão", "Pix", "Dinheiro"].map(payment => ({
    label: payment,
    value: state.orders.filter(o => o.payment === payment).length
  }));

  const maxPayment = Math.max(...paymentData.map(item => item.value), 1);

  const formatItems = items => {
    return Array.isArray(items)
      ? items.map(item => `${item.quantity}x ${item.name}`).join(", ")
      : items;
  };

  const topProduct = bestSellers[0];

  const biggestOrder = state.orders.reduce((biggest, order) => {
    return Number(order.total) > Number(biggest.total) ? order : biggest;
  }, state.orders[0] || { total: 0, id: "-" });

  const favoritePayment = paymentData
    .slice()
    .sort((a, b) => b.value - a.value)[0];

  const deliveryRate = state.orders.length
    ? Math.round((delivered / state.orders.length) * 100)
    : 0;

  const delayedOrders = state.orders.filter(o => o.delayReported).length;
  const readyWaiting = state.orders.filter(o => o.status === "pronto").length;
  const preparingNow = state.orders.filter(o => o.status === "preparo").length;

  return `
    ${header()}

    <main class="container dashboard">
      <div class="page-head">
  <h1 class="page-title">Dashboard Gerencial</h1>

  <button
    class="btn btn-ghost"
    onclick="setView('menuManager')"
  >
    Gerenciar cardápio
  </button>
</div>

      <section class="dashboard-box">
        <h2>📊 Indicadores Gerais</h2>

        <div class="manager-alerts">
  <h3>⚠️ Central de alertas</h3>

  <div class="alert-list">
    <div class="alert-item">
      <strong>${delayedOrders}</strong>
      <span>pedido(s) com atraso reportado</span>
    </div>

    <div class="alert-item">
      <strong>${received}</strong>
      <span>pedido(s) aguardando preparo</span>
    </div>

    <div class="alert-item">
      <strong>${readyWaiting}</strong>
      <span>pedido(s) pronto(s) para entrega</span>
    </div>
  </div>
</div>

<div class="metrics">
  <div class="metric"><span>Pedidos</span><strong>${state.orders.length}</strong></div>
  <div class="metric"><span>Faturamento</span><strong>${money(revenue)}</strong></div>
  <div class="metric"><span>Itens no menu</span><strong>${menuItems.length}</strong></div>
  <div class="metric"><span>Ticket médio</span><strong>${money(state.orders.length ? revenue / state.orders.length : 0)}</strong></div>
</div>

        <div class="insights">
          <div class="insight-card">
            <span>🏆 Produto mais vendido</span>
            <strong>${topProduct ? topProduct.name : "Nenhum"}</strong>
            <small>${topProduct ? `${topProduct.quantity} vendas` : "Sem vendas ainda"}</small>
          </div>

          <div class="insight-card">
            <span>💰 Maior pedido</span>
            <strong>${biggestOrder.id}</strong>
            <small>${money(biggestOrder.total)}</small>
          </div>

          <div class="insight-card">
            <span>💳 Pagamento favorito</span>
            <strong>${favoritePayment?.label || "Nenhum"}</strong>
            <small>${favoritePayment?.value || 0} pedidos</small>
          </div>

          <div class="insight-card">
            <span>📦 Taxa de entrega</span>
            <strong>${deliveryRate}%</strong>
            <small>${delivered} de ${state.orders.length} pedidos</small>
          </div>
        </div>
      </section>

      <section class="analytics-box">
        <h2>Análise de desempenho</h2>

        <div class="dashboard-charts">
          

          <section class="dash-card">
            <h2>Produtos mais vendidos</h2>

            ${
              bestSellers.length === 0
                ? `<p class="muted">Nenhum produto vendido ainda.</p>`
                : `<div class="revenue-chart">
                    ${bestSellers.map(item => `
                      <div class="revenue-bar-row">
                        <span>${item.name}</span>

                        <div class="revenue-bar-wrap">
                          <div
                            class="revenue-bar"
                            style="width: ${(item.quantity / maxSold) * 100}%"
                          ></div>
                        </div>

                        <strong>${item.quantity}x</strong>
                      </div>
                    `).join("")}
                  </div>`
            }
          </section>

          <section class="dash-card">
            <h2>Pedidos por status</h2>

            <div class="revenue-chart">
              ${statusData.map(item => `
                <div class="revenue-bar-row">
                  <span>${item.label}</span>

                  <div class="revenue-bar-wrap">
                    <div
                      class="revenue-bar"
                      style="width: ${(item.value / maxStatus) * 100}%"
                    ></div>
                  </div>

                  <strong>${item.value}</strong>
                </div>
              `).join("")}
            </div>
          </section>

          <section class="dash-card">
            <h2>Formas de pagamento</h2>

            <div class="revenue-chart">
              ${paymentData.map(item => `
                <div class="revenue-bar-row">
                  <span>${item.label}</span>

                  <div class="revenue-bar-wrap">
                    <div
                      class="revenue-bar"
                      style="width: ${(item.value / maxPayment) * 100}%"
                    ></div>
                  </div>

                  <strong>${item.value}</strong>
                </div>
              `).join("")}
            </div>
          </section>
        </div>
      </section>

      <section class="dash-card table-wrap">
        <h2>Últimos pedidos</h2>

        <table>
          <thead>
            <tr>
              <th>Pedido</th>
              <th>Cliente</th>
              <th>Pagamento</th>
              <th>Total</th>
              <th>Status</th>
              <th>Atraso</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            ${state.orders.slice().reverse().map(o => `
              <tr>
                <td>${o.id}</td>

                <td>
                  <strong>${o.customer}</strong><br>
                  <small>${formatItems(o.items)}</small>
                </td>

                <td>${o.payment || "-"}</td>
                <td>${money(o.total)}</td>

                <td>
                  <span class="status ${o.status}">
                    ${statusLabel(o.status)}
                  </span>
                </td>
                <td>
                    ${
                     o.delayReported
                    ? '<span class="status-atraso">Sim⚠️</span>'
                    : '<span class="status-ok">Não</span>'
                    }
                  </td>

                <td>${o.createdAt}</td>

                <td>
                  <button
                    class="btn btn-ghost"
                    onclick="openOrderDetails('${o.id}')"
                  >
                    Ver detalhes
                  </button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </section>
    </main>
  `;
}

function menuManagerView() {
  if (!state.user || state.user.profile !== "gerente") return loginView();

  return `
    ${header()}

    <main class="container dashboard">
      <div class="page-head">
        <h1 class="page-title">Gerenciar cardápio</h1>

        <div class="order-actions">
          <button class="btn btn-red" onclick="addProduct()">Adicionar produto</button>
          <button class="btn btn-ghost" onclick="setView('dashboard')">Voltar ao dashboard</button>
        </div>
      </div>

      <section class="dash-card">
        <div class="menu-manager">
          ${menuItems.map(item => `
            <div class="menu-manager-item">
              <div>
                <strong>${item.name}</strong>
                <small>${item.category} • ${money(item.price)}</small>
              </div>

              <div class="menu-manager-actions">
                <button class="btn btn-ghost btn-small" onclick="editProduct(${item.id})">
                  Editar
                </button>

                <button class="btn btn-red btn-small" onclick="deleteProduct(${item.id})">
                  Remover
                </button>
              </div>
            </div>
          `).join("")}
        </div>
      </section>
    </main>
  `;
}

function addProduct() {
  const name = prompt("Nome do produto:");
  if (!name) return;

  const price = Number(prompt("Preço do produto:").replace(",", "."));
  if (!price || price <= 0) {
    showToast("Preço inválido.", "error");
    return;
  }

const categoryOptions = [
  "classicos",
  "especiais",
  "combos",
  "acompanhamentos",
  "bebidas"
];

const selected = prompt(
`Escolha a categoria:

1 - Clássicos
2 - Especiais
3 - Combos
4 - Acompanhamentos
5 - Bebidas`
);

const category = categoryOptions[Number(selected) - 1];

if (!category) {
  showToast("Categoria inválida.", "error");
  return;
}
  if (!category) return;

  const description = prompt("Descrição do produto:") || "Produto artesanal BBQ Parrila";

  const image = prompt("URL da imagem:") || "assets/Imagens/burger-classico.png";

  const newProduct = {
    id: Date.now(),
    name,
    description,
    price,
    image,
    category
  };

  menuItems.push(newProduct);
  save("bbq_menu", menuItems);

  showToast("Produto adicionado ao cardápio!");
  render();
}

function editProduct(id) {
  const product = menuItems.find(item => item.id === id);
  if (!product) return;

  const newName = prompt("Novo nome:", product.name);
  if (!newName) return;

  const newPrice = Number(prompt("Novo preço:", product.price).replace(",", "."));
  if (!newPrice || newPrice <= 0) {
    showToast("Preço inválido.", "error");
    return;
  }

  const newDescription = prompt("Nova descrição:", product.description) || product.description;

  product.name = newName;
  product.price = newPrice;
  product.description = newDescription;

  save("bbq_menu", menuItems);

  showToast("Produto atualizado!");
  render();
}

function deleteProduct(id) {
  const product = menuItems.find(item => item.id === id);
  if (!product) return;

  if (!confirm(`Deseja remover "${product.name}" do cardápio?`)) return;

  menuItems = menuItems.filter(item => item.id !== id);
  save("bbq_menu", menuItems);

  showToast("Produto removido do cardápio!");
  render();
}



function statusLabel(status) {
  const labels = {
    recebido: "Pedido recebido",
    preparo: "Em preparo",
    pronto: "Pronto",
    saiu: "Saiu para entrega",
    entregue: "Entregue"
  };

  return labels[status] || status;
}

function kitchenView() {
  const orders = (state.orders || []).filter(order => order.status !== "saiu" && order.status !== "entregue");

  return `
    <header class="kitchen-topbar">
      <div class="kitchen-left">
        👨‍🍳 ${state.user?.name || "Cozinheiro"}
      </div>

      <div class="kitchen-right">
        <button class="btn" onclick="logout()">Sair</button>
      </div>
    </header>

    <main class="kitchen-container">
      <h1>Pedidos em andamento</h1>

      ${
        orders.length === 0
          ? `<p class="empty-orders">Nenhum pedido pendente.</p>`
          : orders.map(order => `
            <div class="order-card">
              <h3>Pedido #${order.id}</h3>

              <p><strong>Cliente:</strong> ${order.customer}</p>

              <p><strong>Itens:</strong> ${Array.isArray(order.items) 
                ? order.items.map(item => `${item.name} x${item.quantity}`).join(", ")
                : order.items}
              </p>

              <p><strong>Status:</strong><span class="status ${order.status}">${statusLabel(order.status)}</span></p>

              <div class="actions">
              ${
                order.status === "recebido"
                ? `<button onclick="updateOrder('${order.id}', 'preparo')">Iniciar preparo</button>`
                : ""
              }

              ${
                order.status === "preparo"
                ? `<button onclick="updateOrder('${order.id}', 'pronto')">Marcar como pronto</button>`
                : ""
              }

              ${
                order.status === "pronto"
                ? `<button onclick="updateOrder('${order.id}', 'saiu')">Saiu para entrega</button>`
                : ""
              }
              </div>
            </div>
          `).join("")
      }
    </main>
  `;
}

function emptyCenter(title, text, btnText, target, icon = "🛒") {
  return `
    ${header()}
    <section class="center-view"><div class="panel" style="text-align:center;max-width:460px"><div style="font-size:58px">${icon}</div><h2>${title}</h2><p class="muted">${text}</p><button class="btn btn-red" onclick="setView('${target}')">${btnText}</button></div></section>
  `;
}

function openOrderDetails(id) {
  state.selectedOrderId = id;
  setView("orderDetails");
}

function orderDetailsView() {
  const order = state.orders.find(o => o.id === state.selectedOrderId);

  if (!order) {
    return emptyCenter("Pedido não encontrado", "Esse pedido não existe mais.", "Voltar ao dashboard", "dashboard");
  }

  const items = Array.isArray(order.items) ? order.items : [];

  return `
    ${header()}

    <main class="container checkout">
      <div class="page-head">
        <h1 class="page-title">Detalhes do pedido</h1>
        <button class="btn btn-ghost" onclick="setView('dashboard')">Voltar</button>
      </div>

      <section class="order-details-card">
        <div class="order-details-head">
          <div>
            <span class="muted">Pedido</span>
            <h2>${order.id}</h2>
          </div>

          <span class="status ${order.status}">
            ${statusLabel(order.status)}
          </span>
        </div>

        ${
          order.delayReported
            ? `<div class="delay-alert">⚠️ Cliente reportou atraso neste pedido.</div>`
            : ""
        }

        <div class="details-grid">
          <div class="detail-box">
            <span>👤 Cliente</span>
            <strong>${order.customer}</strong>
          </div>

          <div class="detail-box">
            <span>💳 Pagamento</span>
            <strong>${order.payment || "Não informado"}</strong>
          </div>

          <div class="detail-box">
            <span>📍 Endereço</span>
            <strong>${order.address || "Não informado"}</strong>
          </div>

          <div class="detail-box">
            <span>🕒 Data</span>
            <strong>${order.createdAt}</strong>
          </div>
        </div>

        <div class="items-details">
          <h3>Itens do pedido</h3>

          ${
            items.length
              ? items.map(item => `
                  <div class="item-detail-row">
                    <span>${item.quantity}x ${item.name}</span>
                    <strong>${money(item.price * item.quantity)}</strong>
                  </div>
                `).join("")
              : `<p class="muted">${order.items}</p>`
          }
        </div>

        <div class="order-total-box">
          <span>Total do pedido</span>
          <strong>${money(order.total)}</strong>
        </div>
      </section>
    </main>
  `;
}

function render() {
  const app = document.getElementById("app");

  if (state.view === "login") app.innerHTML = loginView();
  else if (state.view === "checkout") app.innerHTML = checkoutView();
  else if (state.view === "tracking") app.innerHTML = trackingView();
  else if (state.view === "dashboard") app.innerHTML = dashboardView();
  else if (state.view === "menuManager") app.innerHTML = menuManagerView();
  else if (state.view === "orderDetails") app.innerHTML = orderDetailsView();
  else if (state.view === "kitchen") app.innerHTML = kitchenView();
  else if (state.view === "history") app.innerHTML = historyView();
  else app.innerHTML = homeView();
}
function selectCategory(id) { state.category = id; render(); }
function openCart() { state.cartOpen = true; render(); }
function closeCart() { state.cartOpen = false; render(); }
function addToCart(id) {
  const item = menuItems.find(p => p.id === id);
  const existing = state.cart.find(p => p.id === id);
  if (existing) existing.quantity += 1;
  else state.cart.push({ ...item, quantity: 1 });
  save("bbq_cart", state.cart);
  render();
}
function removeFromCart(id) {
  const existing = state.cart.find(p => p.id === id);
  if (!existing) return;
  if (existing.quantity > 1) existing.quantity -= 1;
  else state.cart = state.cart.filter(p => p.id !== id);
  save("bbq_cart", state.cart);
  render();
}
function deleteFromCart(id) { state.cart = state.cart.filter(p => p.id !== id); save("bbq_cart", state.cart); render(); }
function goCheckout() { if (!state.user) setView("login"); else setView("checkout"); }
function handleAuth(event) {
  event.preventDefault();

  const name = document.getElementById("nameInput").value.trim() || "Cliente";
  const email = document.getElementById("emailInput").value.trim().toLowerCase();
  const password = document.getElementById("passwordInput").value.trim();
  const err = document.getElementById("authError");

  err.style.display = "none";

  if (!email || !password) {
    err.style.display = "block";
    err.textContent = "Preencha e-mail e senha.";
    return;
  }

  const staffUsers = {
  "cozinha@gmail.com": { password: "123456", profile: "cozinha", view: "kitchen" },
  "gerente@gmail.com": { password: "123456", profile: "gerente", view: "dashboard" }
};

  const staff = staffUsers[email];

  if (staff) {
  if (password !== staff.password) {
    err.style.display = "block";
    err.textContent = "Senha incorreta.";
    return;
  }

  state.user = {
    name,
    email,
    profile: staff.profile
  };

  save("bbq_user", state.user);

  state.view = staff.view;
  state.cartOpen = false;
  render();
  window.scrollTo(0, 0);

  return;
}

  const clients = load("bbq_clients", {});
  const existingClient = clients[email];

  if (existingClient) {
    if (existingClient.password !== password) {
      err.style.display = "block";
      err.textContent = "Senha incorreta.";
      return;
    }

    state.user = {
      name: existingClient.name,
      email,
      profile: "cliente"
    };

    save("bbq_user", state.user);
    setView("home");
    return;
  }

  clients[email] = {
    name,
    email,
    password
  };

  save("bbq_clients", clients);

  state.user = {
    name,
    email,
    profile: "cliente"
  };

  save("bbq_user", state.user);
  setView("home");
}

function showToast(message, type = "success") {
  const oldToast = document.getElementById("toast");
  if (oldToast) oldToast.remove();

  const toast = document.createElement("div");
  toast.id = "toast";
  toast.textContent = message;

  toast.style.position = "fixed";
  toast.style.right = "20px";
  toast.style.bottom = "20px";
  toast.style.background = type === "error" ? "#991b1b" : "#166534";
  toast.style.color = "#fff";
  toast.style.padding = "16px 20px";
  toast.style.borderRadius = "12px";
  toast.style.fontWeight = "900";
  toast.style.zIndex = "999999999";
  toast.style.boxShadow = "0 12px 30px rgba(0,0,0,.45)";

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2500);
}

function logout() { state.user = null; state.cart = []; save("bbq_user", null); save("bbq_cart", []); setView("home"); }
function finishOrder(event) {
  event.preventDefault();
  const order = {
    id: "BBQ-" + Math.floor(1000 + Math.random() * 9000),
    customer: document.getElementById("customerName").value.trim() || state.user?.name || "Cliente",
    email: state.user?.email || "",
    items: state.cart.map(i => ({id: i.id,name: i.name,quantity: i.quantity,price: i.price})),
    total: total(),
    status: "recebido",
    createdAt: new Date().toLocaleString("pt-BR"),
    address: document.getElementById("address").value.trim(),
    payment: document.getElementById("payment").value
    
  };
  state.orders.push(order);
  state.cart = [];
  save("bbq_orders", state.orders);
  save("bbq_cart", state.cart);
  showToast("Pedido criado com sucesso!");
  state.view = "tracking";
  render();
}
function updateOrder(id, status) {
  const order = state.orders.find(o => o.id === id);

  if (order) {
  order.status = status;

  showToast(`Status alterado para ${statusLabel(status)}`);
  }

  save("bbq_orders", state.orders);
  render();
}

function togglePixBox() {
  const payment = document.getElementById("payment");
  const pixBox = document.getElementById("pixBox");

  if (!payment || !pixBox) return;

  if (payment.value === "Pix") {
    pixBox.classList.remove("hidden");
  } else {
    pixBox.classList.add("hidden");
  }
}

function copyPixCode() {
  navigator.clipboard.writeText("BBQ-PARRILA-PIX-FICTICIO");
  showToast("Código Pix copiado com sucesso!");
}
window.setView = setView;
window.selectCategory = selectCategory;
window.openCart = openCart;
window.closeCart = closeCart;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.deleteFromCart = deleteFromCart;
window.goCheckout = goCheckout;
window.handleAuth = handleAuth;
window.logout = logout;
window.finishOrder = finishOrder;
window.updateOrder = updateOrder;
window.confirmDelivery = confirmDelivery;
window.deleteOrder = deleteOrder;
window.openOrderDetails = openOrderDetails;
window.togglePixBox = togglePixBox;
window.copyPixCode = copyPixCode;
window.showToast = showToast;
window.reportDelay = reportDelay;
window.addProduct = addProduct;
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.menuManagerView = menuManagerView;

render();