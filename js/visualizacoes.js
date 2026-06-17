// Telas gerais do cliente e componentes visuais principais

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

          <div class="header-nav">
            ${
              user?.profile === "cliente"
                ? `
                  <button class="btn btn-dark-red" onclick="setView('history')">
                    📦 <span class="label">Meus pedidos</span>
                  </button>

                  <button class="btn btn-dark-red" onclick="setView('tracking')">
                    🏍️ <span class="label">Acompanhar pedido</span>
                  </button>

                  <button class="btn btn-dark-red cart-btn" onclick="openCart()">
                    🛒 <span class="label">Carrinho</span>
                    ${
                      cartCount()
                        ? `<span class="badge">${cartCount()}</span>`
                        : ""
                    }
                  </button>
                `
                : ""
            }

            ${
              user?.profile === "cozinha"
                ? `
                  <button class="btn btn-dark-red" onclick="setView('kitchen')">
                    👨‍🍳 <span class="label">Cozinha</span>
                  </button>
                `
                : ""
            }

            ${
              user?.profile === "gerente"
                ? `
                  <button class="btn btn-dark-red" onclick="setView('dashboard')">
                    📊 <span class="label">Dashboard</span>
                  </button>
                `
                : ""
            }
          </div>

          <div class="header-user">
               ${
                   user
                     ? `
        ${
          user.profile === "cliente"
            ? `
              <button class="btn btn-dark-red" onclick="setView('profile')">
                👤 <span class="label">Meu perfil</span>
              </button>
            `
            : ""
        }

        <button class="btn btn-dark-red" onclick="logout()">
          ↩ <span class="label">Sair</span>
        </button>
      `
      : `
        <button class="btn btn-dark-red" onclick="setView('login')">
          ↪ <span class="label">Entrar</span>
        </button>
      `
  }
</div>

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

function profileView() {
  if (!state.user) return loginView();

  const profile = state.profileData || {};

  return `
    ${header()}

    <main class="container checkout">
      <div class="page-head">
        <h1 class="page-title">Meu perfil</h1>
        <button class="btn btn-ghost" onclick="setView('home')">Voltar</button>
      </div>

      <section class="panel">
        <form onsubmit="saveProfile(event)">
          <div class="field">
            <label>Nome</label>
            <input id="profileName" required value="${profile.name || state.user.name || ""}">
          </div>

          <div class="field">
            <label>E-mail</label>
            <input value="${state.user.email || ""}" disabled>
          </div>

          <div class="field">
            <label>Telefone</label>
            <input id="profilePhone" placeholder="(11) 99999-9999" value="${profile.phone || ""}">
          </div>

          <div class="field">
            <label>Endereço padrão</label>
            <input id="profileAddress" placeholder="Rua, número, bairro" value="${profile.address || ""}">
          </div>

          <div class="field">
            <label>Forma de pagamento preferida</label>
            <select id="profilePayment">
              <option ${profile.payment === "Cartão" ? "selected" : ""}>Cartão</option>
              <option ${profile.payment === "Pix" ? "selected" : ""}>Pix</option>
              <option ${profile.payment === "Dinheiro" ? "selected" : ""}>Dinheiro</option>
            </select>
          </div>

          <button class="btn btn-red btn-full" type="submit">
            Salvar perfil
          </button>
        </form>
      </section>
    </main>
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
              <input id="customerName" required value="${state.profileData?.name || state.user?.name || ""}">
            </div>

            <div class="row">
              <div class="field">
                <label>Telefone</label>
                <input
                  id="phone"
                  required
                  placeholder="(11) 99999-9999"
                  value="${state.profileData?.phone || ""}"
                >
              </div>

              <div class="field">
                <label>Pagamento</label>
                <select id="payment" onchange="togglePixBox()">
                  <option ${state.profileData?.payment === "Cartão" ? "selected" : ""}>Cartão</option>
                  <option ${state.profileData?.payment === "Pix" ? "selected" : ""}>Pix</option>
                  <option ${state.profileData?.payment === "Dinheiro" ? "selected" : ""}>Dinheiro</option>
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

            <div class="card-box hidden" id="cardBox">
              <h3>Cartão selecionado</h3>
              <p class="muted">
                Pagamento fictício para apresentação. Nenhum dado real de cartão será solicitado.
              </p>
            </div>

            <div class="field">
              <label>Endereço</label>
              <input
                id="address"
                required
                placeholder="Rua, número, bairro"
                value="${state.profileData?.address || ""}"
              >
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
  if (!state.user) {
  return emptyCenter(
    "Faça login para ver seus pedidos",
    "Você precisa estar logado para visualizar seu histórico.",
    "Ir para login",
    "login",
    "🔒"
  );
}

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

function trackingView(orderId = null) {
  if (!state.user) {
    return emptyCenter(
      "Faça login para acompanhar seu pedido",
      "Você precisa estar logado para visualizar seus pedidos.",
      "Ir para login",
      "login",
      "🔒"
    );
  }

const currentOrderId = orderId || state.currentOrderId || load("bbq_current_order", null);

const userOrders = state.orders.filter(o =>
  o.email === state.user.email ||
  o.userId === state.user.uid ||
  o.customer === state.user.name
);

const last = currentOrderId
  ? state.orders.find(o => o.id === currentOrderId)
  : userOrders[0];

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

function emptyCenter(title, text, btnText, target, icon = "🛒") {
  return `
    ${header()}
    <section class="center-view"><div class="panel" style="text-align:center;max-width:460px"><div style="font-size:58px">${icon}</div><h2>${title}</h2><p class="muted">${text}</p><button class="btn btn-red" onclick="setView('${target}')">${btnText}</button></div></section>
  `;
}
