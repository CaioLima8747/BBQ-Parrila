# BBQ Parrila - Versão Vanilla

Projeto convertido de React/TypeScript para HTML, CSS e JavaScript puro.

## Como abrir
Abra o arquivo `index.html` no navegador ou use Live Server no VS Code/Firebase Studio.

## O que tem
- Home/cardápio com categorias
- Carrinho lateral
- Login/cadastro simulado com perfis: cliente, gerente e cozinha
- Checkout
- Acompanhamento de pedido
- Dashboard gerencial
- Painel da cozinha
- Dados salvos em localStorage

## Observação
Ainda não há Firebase integrado. A estrutura foi deixada limpa para conectar Firebase depois.


## Organização dos arquivos JavaScript

O JavaScript foi separado em arquivos menores para facilitar a apresentação e manutenção:

- `utilitarios.js`: funções auxiliares, localStorage, dinheiro, status e mensagens visuais.
- `dados.js`: cardápio inicial, categorias e estado global.
- `carrinho.js`: carrinho, subtotal, total e checkout.
- `autenticacao.js`: login, cadastro e logout.
- `pedidos.js`: criação, atualização, entrega, atraso e Pix.
- `cardapio.js`: filtro de categorias e CRUD de produtos.
- `cozinha.js`: tela da cozinha.
- `visualizacoes.js`: telas gerais do cliente.
- `dashboard.js`: dashboard, detalhes do pedido e tela de gerenciamento do cardápio.
- `app.js`: renderização principal e conexão das funções com os botões do HTML.

O arquivo `app-original.js` foi mantido como backup do JavaScript original em arquivo único.
