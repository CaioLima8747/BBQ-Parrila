// Dashboard gerencial, detalhes do pedido e gerenciamento do cardápio

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
            ${state.orders.map(o => `
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

          ${order.notes ? `
          <div class="detail-box">
            <span>📝 Observações</span>
            <strong>${order.notes}</strong>
          </div>
          `: ""}

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
                     <div>
                      <span>${item.quantity}x ${item.name}</span><br><small class="muted">${item.description || ""}</small>
                     </div>
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
