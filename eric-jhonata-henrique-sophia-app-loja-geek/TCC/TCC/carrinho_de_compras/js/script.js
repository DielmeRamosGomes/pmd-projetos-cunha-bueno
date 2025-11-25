
let login = 0;
let ID =

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
      const botao = event.currentTarget || event.target;
      const produtoCard = botao.closest('.produto');
      if (!produtoCard) return;

      const id = produtoCard.dataset.id;
      const preco = Number(produtoCard.dataset.preco);
      const nome = (produtoCard.querySelector('h2')?.textContent || produtoCard.dataset.nome || '').trim();

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
      if (login !== 1) {
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
const respostaId = null;

addEventListener("input", function (event) {
  event.preventDefault();
  var nome = document.getElementById("inputnome").value;
  var conteudoemail = document.getElementById("inputemail").value;
  var senha = document.getElementById("senha").value;


  if (nome && conteudoemail && senha) {
    document.getElementById("botao1").disabled = false;
  } else {
    document.getElementById("botao1").disabled = true;
  }
});

const btn = document.querySelector('#btn');
btn.addEventListener('click', () => {
  event.preventDefault;
  const form = document.querySelector('#form');
  const formData = new FormData(form);
  const usuario = {
    nome: formData.get('name'),
    email: formData.get('email'),
    senha: formData.get('senha')
  }

  console.log(usuario);

  fetch('http://localhost:3000/cadastrarusuario', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(usuario)
  });

  fetchId(usuario.email, usuario.senha);

});

async function fetchId(email, senha) {
  const login = {
    email: email,
    senha: senha
  }

  try {
    respostaId = await fetch('http://localhost:3000/listaidusuario', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(login)
    });
    if (!respostaId.ok) {
      const erroData = await respostaId.json(); // Tenta ler o corpo do erro (se houver)
      throw new Error(`Erro HTTP! Status: ${respostaId.status} - Mensagem: ${erroData.message || 'Desconhecida'}`);
    }

  } catch (error) {
    console.log(`Erro: ${error}`);
    pLivroCadastrado.textContent = `Erro`;
  }

  console.log(respostaId);
}

  // div produtos
const produtos = document.querySelector('.produtos');

async function fetchListarProdutos() {
  await fetch('http://localhost:3000/listarprodutos')
    .then(resposta => {
      if (!resposta.ok) {
        throw new Error(`Erro de rede: ${resposta.statusText}`);
      }
      return resposta.json();
    })
    .then(dado => {
      produtos.innerHTML = ``;

      dado.forEach(produto => {
        const novoCard = document.createElement('div');
        novoCard.classList.add('card');

        novoCard.innerHTML = `
        <div class="produto" data-id="1" data-nome="${dado.nome}" data-preco="200.00">
          <table>
              <tr>
                  <td>
                      <img src="${dado.urlimagem}" class="imagem">
                  </td>
                  <td>
                      <h3>${dado.descricao}</h3>
                    </td>
                    <td>
                        <h2>${dado.nome}</h2>
                        <p>R$ ${dado.preco}</p>
                        <button class="adicionar" onclick="new Audio('audio/sata.mp3').play()">Adicionar ao Carrinho</button>
                    </td>
                </tr>
            </table>
        </div>
                `;
        card.appendChild(novoCard);
        produtos.appendChild(card);
      });
    })
    .catch(error => {
      console.log(`Houve um problema com a operação fetch: ${error}`);
    });
}

fetchListarProdutos();


