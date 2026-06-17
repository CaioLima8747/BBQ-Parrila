// Funções utilitárias usadas pelo sistema

function save(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

function load(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } }

function money(value) { return `R$ ${Number(value).toFixed(2).replace(".", ",")}`; }

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

function setView(view) { state.view = view; state.cartOpen = false; render(); window.scrollTo(0, 0); }
