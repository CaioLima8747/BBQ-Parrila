// Funções relacionadas ao carrinho de compras

function cartCount() { return state.cart.reduce((sum, item) => sum + item.quantity, 0); }

function subtotal() { return state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0); }

function total() { return subtotal() + (state.cart.length ? 8 : 0); }

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
