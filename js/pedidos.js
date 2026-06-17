// Criação, atualização, entrega e acompanhamento de pedidos

async function salvarPedidoFirestore(order) {
  try {
    const baseUrl = window.firebaseConfig.databaseURL;
    const userId = order.userId || firebase.auth().currentUser?.uid || "";

    const urls = [
      `${baseUrl}/pedidos/${order.id}.json`
    ];

    if (userId) {
      order.userId = userId;
      urls.push(`${baseUrl}/usuarios/${userId}/pedidos/${order.id}.json`);
    }

    const responses = await Promise.all(
      urls.map(url =>
        fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(order)
        })
      )
    );

    for (const response of responses) {
      if (!response.ok) {
        const error = await response.json();
        throw new Error(JSON.stringify(error));
      }
    }

    console.log("PEDIDO SALVO GERAL E NO CLIENTE:", order.id);
  } catch (error) {
    console.error("ERRO AO SALVAR PEDIDO:", error);
  }
}

function finishOrder(event) {
  event.preventDefault();
  console.log("Entrou na função finishOrder");
  const order = {
    id: "BBQ-" + Math.floor(1000 + Math.random() * 9000),
    customer: document.getElementById("customerName").value.trim() || state.user?.name || "Cliente",
    email: state.user?.email || "",
    userId: state.user?.uid || "",
    items: state.cart.map(i => ({
    id: i.id,
    name: i.name,
    description: i.description || "",
    quantity: i.quantity,
    price: i.price
    })),
    total: total(),
    status: "recebido",
    createdAt: new Date().toLocaleString("pt-BR"),
    createdAtMs: Date.now(),
    address: document.getElementById("address").value.trim(),
    notes: document.getElementById("notes").value.trim(),
    payment: document.getElementById("payment").value
    
  };

  state.orders.push(order);
  state.cart = [];

  save("bbq_orders", state.orders);
  save("bbq_cart", state.cart);

  console.log("Tentando salvar pedido no Firestore:", order);

  salvarPedidoFirestore(order);

  state.currentOrderId = order.id;
  save("bbq_current_order", order.id);
  
  state.currentOrderId = order.id;
  save("bbq_current_order", order.id);

  showToast("Pedido criado com sucesso!");
  state.view = "tracking";
  render();
}

function atualizarPedidoFirestore(order) {
  if (!window.firebaseRealtimeDb || !order) return;

  window.firebaseRealtimeDb
    .ref("pedidos/" + order.id)
    .set(order)
    .then(() => console.log("Pedido atualizado:", order.id))
    .catch(error => console.error("Erro ao atualizar pedido:", error));
}

function updateOrder(id, status) {
  const order = state.orders.find(o => o.id === id);

  if (order) {
    order.status = status;
    order.updatedAt = new Date().toLocaleString("pt-BR");
    order.updatedAtMs = Date.now();

    save("bbq_orders", state.orders);

    if (window.firebaseRealtimeDb) {
      window.firebaseRealtimeDb
        .ref("pedidos/" + id)
        .update({
          status: status,
          updatedAt: order.updatedAt,
          updatedAtMs: order.updatedAtMs
        })
        .then(() => console.log("STATUS ATUALIZADO NO REALTIME:", id, status))
        .catch(error => console.error("ERRO AO ATUALIZAR STATUS:", error));
    }

    showToast(`Status alterado para ${statusLabel(status)}`);
  }

  render();
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

function confirmDelivery(id) {
  const order = state.orders.find(o => o.id === id);

  if (order) {
    order.status = "entregue";
    order.updatedAt = new Date().toLocaleString("pt-BR");
    order.updatedAtMs = Date.now();

    atualizarPedidoFirestore(order);

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
  order.updatedAt = new Date().toLocaleString("pt-BR");
  order.updatedAtMs = Date.now();

  atualizarPedidoFirestore(order);

  save("bbq_orders", state.orders);
  showToast("Atraso reportado. A equipe foi notificada.", "warning");
  render();
}

function togglePixBox() {
  const payment = document.getElementById("payment");
  const pixBox = document.getElementById("pixBox");
  const cardBox = document.getElementById("cardBox");

  if (!payment) return;

  if (pixBox) {
    pixBox.classList.toggle("hidden", payment.value !== "Pix");
  }

  if (cardBox) {
    cardBox.classList.toggle("hidden", payment.value !== "Cartão");
  }
}

function copyPixCode() {
  navigator.clipboard.writeText("BBQ-PARRILA-PIX-FICTICIO");
  showToast("Código Pix copiado com sucesso!");
}
function iniciarPedidosTempoReal() {
  if (!window.firebaseRealtimeDb) return;

  window.firebaseRealtimeDb.ref("pedidos").on("value", snapshot => {
    const data = snapshot.val() || {};

    state.orders = Object.entries(data)
      .map(([id, order]) => ({
        ...order,
        id: order.id || id
      }))
      .filter(order =>
        order.id &&
        order.status
      )
      .sort((a, b) => (b.createdAtMs || 0) - (a.createdAtMs || 0));

    save("bbq_orders", state.orders);

    render();
  });
}

window.iniciarPedidosTempoReal = iniciarPedidosTempoReal;