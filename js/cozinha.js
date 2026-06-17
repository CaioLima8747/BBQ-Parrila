// Tela da cozinha e controle dos pedidos em preparo

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

              <p><strong>Itens:</strong></p>

              <ul class="kitchen-items">
                ${
                  Array.isArray(order.items)
                    ? order.items.map(item => `
                        <li>
                          <strong>${item.name} x${item.quantity}</strong>
                          ${
                            item.description
                              ? `<small>${item.description}</small>`
                              : ""
                          }
                        </li>
                      `).join("")
                    : `<li>${order.items}</li>`
                }
              </ul>

              <p>
                <strong>Status:</strong>
                <span class="status ${order.status}">
                  ${statusLabel(order.status)}
                </span>
              </p>

              ${
                order.notes
                  ? `
                    <div class="order-notes">
                      <strong>📝 Observações do cliente:</strong>
                      <p>${order.notes}</p>
                    </div>
                  `
                  : ""
              }

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
