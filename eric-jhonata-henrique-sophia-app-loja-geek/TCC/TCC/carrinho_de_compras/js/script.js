//import { id } from './login.js';

let login = 0; // variável global para controlar o login

document.addEventListener('DOMContentLoaded', () => {
  // ===== Seletores base
  const listaCarrinho = document.querySelector('.itens-carrinho');
  const totalElemento = document.querySelector('.total span');
  const botaoFinalizar = document.querySelector('.finalizar');
  const produtosContainer = document.querySelector('.produtos');
  const produtoDiv = document.createElement('div');
  // ===== Modal / botão flutuante
  const modal = document.getElementById('cartModal');
  const openBtn = document.getElementById('openCart');

  // Estado
  let carrinho = [];

  // Formatador
  const fmtBRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  const brl = n => fmtBRL.format(Number(n) || 0);

  // ===== Abertura/Fechamento da modal
  function openModal() {
    if (!modal) return;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal__close')?.focus();
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    openBtn?.focus();
  }

  openBtn?.addEventListener('click', openModal);
  modal?.addEventListener('click', (e) => {
    if (e.target.matches('[data-close], .modal__overlay')) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('is-open')) closeModal();
  });

  // ===== Delegação de eventos para produtos
  produtosContainer?.addEventListener('click', (e) => {
    if (e.target.classList.contains('adicionar')) {
      adicionarAoCarrinho(e);
    }
  });

  botaoFinalizar?.addEventListener('click', () => {
    finalizarCompra();
  });

  // ===== Lógica do carrinho
  function adicionarAoCarrinho(event) {
    new Audio('audio/sata.mp3').play(); // toca som ao adicionar

    const botao = event.currentTarget || event.target;
    
    if (!produtoDiv)
      return;

    const id = produtoDiv.dataset.id;
    const preco = Number(produtoDiv.dataset.preco);
    const nome = (produtoDiv.querySelector('h2')?.textContent || produtoDiv.dataset.nome || '').trim();

    const itemExistente = carrinho.find(item => item.id === id);
    if (itemExistente) {
      itemExistente.quantidade += 1;
    } else {
      carrinho.push({ id, nome, preco, quantidade: 1 });
    }
    atualizarCarrinho();
    console.log(`Carrinho: ${JSON.stringify(carrinho)}`);
  }

  function atualizarCarrinho() {
    listaCarrinho.innerHTML = '';
    let total = 0;

    carrinho.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.nome} x${item.quantidade} — ${brl(item.preco * item.quantidade)}`;

      // Botão de remover
      const btnRemover = document.createElement('button');
      btnRemover.textContent = '❌';
      btnRemover.classList.add('remover');
      btnRemover.addEventListener('click', () => removerItem(item.id));

      li.appendChild(btnRemover);
      listaCarrinho.appendChild(li);

      total += item.preco * item.quantidade;
    });

    totalElemento.textContent = brl(total);
  }

  function removerItem(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    atualizarCarrinho();
  }

  function finalizarCompra() {
    if (carrinho.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }

    alert('Compra finalizada com sucesso!');
    carrinho = [];
    atualizarCarrinho();
    closeModal();
  }

  // ===== Fetch dos produtos
  async function fetchListarProdutos() {
    try {
      const resposta = await fetch('http://localhost:3000/listarprodutos');
      if (!resposta.ok) {
        throw new Error(`Erro de rede: ${resposta.statusText}`);
      }

      const dados = await resposta.json();
      produtosContainer.innerHTML = ''; // Limpa antes de adicionar

      dados.forEach(produto => {
        const produtoDiv = document.createElement('div');
        produtoDiv.classList.add('produto');
        produtoDiv.setAttribute('data-id', produto.id_produto);
        produtoDiv.setAttribute('data-nome', produto.nome);
        produtoDiv.setAttribute('data-preco', produto.preco);
        produtoDiv.innerHTML = `
          <table>
            <tr>
              <td>
                <img src="${produto.urlimagem}" alt="${produto.nome}" class="imagem">
              </td>
              <td>
                <h3>${produto.descricao}</h3>
              </td>
              <td>
                <h2>${produto.nome}</h2>
                <p>R$ ${produto.preco}</p>
                <button class="adicionar">Adicionar ao Carrinho</button>
              </td>
            </tr>
          </table>
        `;
        produtosContainer.appendChild(produtoDiv);
      });
    } catch (error) {
      console.error(`Houve um problema com a operação fetch: ${error}`);
    }
  }

  fetchListarProdutos();
});


function atualizarBadgeCarrinho() {
  const btn = document.getElementById('openCart');
  if (!btn) return;
  const qnt = carrinho.reduce((acc, it) => acc + (it.quantidade || 0), 0);
  if (qnt > 0) {
    btn.setAttribute('data-count', qnt > 99 ? '99+' : String(qnt));
  } else {
    btn.removeAttribute('data-count');
  }
}












