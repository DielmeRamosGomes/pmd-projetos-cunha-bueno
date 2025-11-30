//import { id } from './login.js';

let login = 0; // variável global para controlar o login

document.addEventListener('DOMContentLoaded', () => {
  // ===== Seletores base

  const botoesAdicionar = document.querySelectorAll('.adicionar');
  const listaCarrinho = document.querySelector('.itens-carrinho');
  const totalElemento = document.querySelector('.total span');
  const botaoFinalizar = document.querySelector('.finalizar');

  // ===== Modal / botão flutuante
  const modal = document.getElementById('cartModal'); // <div id="cartModal" ...>
  const openBtn = document.getElementById('openCart');  // botão/ícone do carrinho

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

  // ===== Listeners dos produtos
  botoesAdicionar.forEach(botao => {
    botao.addEventListener('click', adicionarAoCarrinho);
  });

  botaoFinalizar?.addEventListener('click', () => {
    finalizarCompra();

  });

  // ===== Lógica do carrinho
  function adicionarAoCarrinho(event) {
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
    const botao = event.currentTarget || event.target;
    const produtoCard = botao.closest('.produto');
    if (!produtoCard) return;

    const id = produtoCard.dataset.id;
    const preco = Number(produtoCard.dataset.preco);
    const nome = (produtoCard.querySelector('h2')?.textContent || produtoCard.dataset.nome || '').trim();

    console.log(`preco: ${produtoCard.dataset.preco}`);

    const itemExistente = carrinho.find(item => item.id === id);
    if (itemExistente) {
      itemExistente.quantidade += 1;
    } else {
      carrinho.push({ id, nome, preco, quantidade: 1 });
    }

    atualizarCarrinho();
  }

  function atualizarCarrinho() {
    if (!listaCarrinho || !totalElemento) return;

    listaCarrinho.innerHTML = '';
    let total = 0;

    carrinho.forEach(item => {
      const li = document.createElement('li');
      const subtotal = item.preco * item.quantidade;
      total += subtotal;

      li.innerHTML = `
        <span>${item.nome} x ${item.quantidade}</span>
        <span>${brl(subtotal)}</span>
        <button class="remover" data-id="${item.id}" aria-label="Remover ${item.nome}">×</button>
      `;

      listaCarrinho.appendChild(li);
    });

    totalElemento.textContent = brl(total);

    // liga remover
    listaCarrinho.querySelectorAll('.remover').forEach(b => {
      b.addEventListener('click', removerDoCarrinho);
    });

    // atualiza badge do ícone
    atualizarBadgeCarrinho();
  }

  function removerDoCarrinho(event) {
    const id = event.currentTarget.getAttribute('data-id');

    carrinho = carrinho.flatMap(item => {
      if (item.id !== id) return [item];
      if (item.quantidade > 1) return [{ ...item, quantidade: item.quantidade - 1 }];
      return [];
    });

    atualizarCarrinho();
  }

  function finalizarCompra() {
    if (login === 0) {
      alert('Você tem que se cadastrar primeiro!');
      return;
    }
    if (carrinho.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }
    const total = carrinho.reduce((acc, it) => acc + it.preco * it.quantidade, 0);
    alert(`Compra finalizada! Total: ${brl(total)}`);
    carrinho = [];
    atualizarCarrinho();
    // fecha a modal depois de finalizar
    closeModal();
  }

  // ===== Badge no ícone (mostra total de itens)
  function atualizarBadgeCarrinho() {
    if (!openBtn) return;
    const qnt = carrinho.reduce((acc, it) => acc + (it.quantidade || 0), 0);
    if (qnt > 0) openBtn.setAttribute('data-count', qnt);
    else openBtn.removeAttribute('data-count');
  }

  const produtos = document.querySelector('.produtos');

  async function fetchListarProdutos() {
    try {
      const resposta = await fetch('http://localhost:3000/listarprodutos');
      if (!resposta.ok) {
        throw new Error(`Erro de rede: ${resposta.statusText}`);
      }

      const dados = await resposta.json();
      produtos.innerHTML = ''; // Limpa antes de adicionar

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
                 <button class="adicionar" onclick="new Audio('audio/sata.mp3').play()">Adicionar ao Carrinho</button>
              </td>
            </tr>
          </table>
         
      `;

        produtos.appendChild(produtoDiv);
      });
    } catch (error) {
      console.error(`Houve um problema com a operação fetch: ${error}`);
    }
  }

  fetchListarProdutos();
});

// ===== utilitários globais 
function play() {
  new Audio('audio/sata.mp3').play();
}
function permitido() {
  // chame isto quando o usuário concluir o cadastro/login
  login = 1;
}

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

//------------------------------------------------------------//


//document.getElementById("botao1").disabled = true;






