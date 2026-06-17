// Categorias e gerenciamento de produtos do cardápio

function selectCategory(id) {
  state.category = id;
  render();
}

function salvarCardapioRealtime() {
  if (!window.firebaseRealtimeDb) return;

  window.firebaseRealtimeDb
    .ref("cardapio")
    .set(menuItems)
    .then(() => console.log("Cardápio salvo no Realtime Database."))
    .catch(error => console.error("Erro ao salvar cardápio:", error));
}

function iniciarCardapioTempoReal() {
  if (!window.firebaseRealtimeDb) return;

  window.firebaseRealtimeDb.ref("cardapio").on("value", snapshot => {
    const cardapio = snapshot.val();

    if (cardapio) {
      menuItems = Array.isArray(cardapio) ? cardapio : Object.values(cardapio);
      save("bbq_menu", menuItems);
      render();
    } else {
      salvarCardapioRealtime();
    }
  });
}

function addProduct() {
  const name = prompt("Nome do produto:");
  if (!name) return;

  const priceText = prompt("Preço do produto:");
  if (!priceText) return;

  const price = Number(priceText.replace(",", "."));

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
  salvarCardapioRealtime();

  showToast("Produto adicionado ao cardápio!");
  render();
}

function editProduct(id) {
  const product = menuItems.find(item => item.id === id);
  if (!product) return;

  const newName = prompt("Novo nome:", product.name);
  if (!newName) return;

  const priceText = prompt("Novo preço:", product.price);
  if (!priceText) return;

  const newPrice = Number(String(priceText).replace(",", "."));

  if (!newPrice || newPrice <= 0) {
    showToast("Preço inválido.", "error");
    return;
  }

  const newDescription = prompt("Nova descrição:", product.description) || product.description;
  const newImage = prompt("Nova imagem:", product.image) || product.image;

  product.name = newName;
  product.price = newPrice;
  product.description = newDescription;
  product.image = newImage;

  save("bbq_menu", menuItems);
  salvarCardapioRealtime();

  showToast("Produto atualizado!");
  render();
}

function deleteProduct(id) {
  const product = menuItems.find(item => item.id === id);
  if (!product) return;

  if (!confirm(`Deseja remover "${product.name}" do cardápio?`)) return;

  menuItems = menuItems.filter(item => item.id !== id);

  save("bbq_menu", menuItems);
  salvarCardapioRealtime();

  showToast("Produto removido do cardápio!");
  render();
}