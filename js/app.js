// Inicialização da aplicação, roteamento de telas e funções globais dos botões

function render() {
  const app = document.getElementById("app");

  if (state.view === "login") app.innerHTML = loginView();
  else if (state.view === "checkout") {
    app.innerHTML = checkoutView();
    setTimeout(togglePixBox, 0);
  }
  else if (state.view === "tracking") app.innerHTML = trackingView();
  else if (state.view === "dashboard") app.innerHTML = dashboardView();
  else if (state.view === "menuManager") app.innerHTML = menuManagerView();
  else if (state.view === "orderDetails") app.innerHTML = orderDetailsView();
  else if (state.view === "kitchen") app.innerHTML = kitchenView();
  else if (state.view === "history") app.innerHTML = historyView();
  else if (state.view === "profile") app.innerHTML = profileView();
  else app.innerHTML = homeView();

  if (
    state.cartOpen &&
    state.view !== "login" &&
    state.view !== "kitchen" &&
    state.view !== "dashboard" &&
    state.view !== "menuManager" &&
    state.view !== "orderDetails"
  ) {
    app.innerHTML += cartDrawer();
  }
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
window.saveProfile = saveProfile;
window.profileView = profileView;

render();

window.addEventListener("load", () => {
  if (typeof iniciarPedidosTempoReal === "function") {
    iniciarPedidosTempoReal();
  }
});