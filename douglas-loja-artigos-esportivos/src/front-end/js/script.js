// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    
    // Inicializa as funcionalidades baseadas na página atual
    const currentPage = window.location.pathname.split('/').pop();
    
    // Inicializa funcionalidades comuns
    initializeCommonFeatures();
    
    // Inicializa funcionalidades específicas da página
    switch(currentPage) {
        case 'index.html':
        case '':
            initializeCatalogPage();
            break;
        case 'carrinho.html':
            initializeCartPage();
            break;
        case 'contato.html':
            initializeContactPage();
            break;
        case 'finalizar_compra.html':
            initializeCheckoutPage();
            break;
    }
});

// ==================== FUNCIONALIDADES COMUNS ====================

function initializeCommonFeatures() {
    // Carrega carrinho do localStorage
    loadCartFromStorage();
    
    // Adiciona smooth scroll para navegação
    addSmoothScroll();
    
    console.log('🛍️ DG Catálogo carregado com sucesso!');
}

// Variável global para o carrinho
let cart = [];

// Função para carregar carrinho do localStorage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Função para salvar carrinho no localStorage
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Função para formatar preço
function formatPrice(price) {
    return `R$ ${parseFloat(price).toFixed(2).replace('.', ',')}`;
}

// Função para mostrar notificação
function showNotification(message, type = 'success') {
    // Remove notificação anterior se existir
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Cria nova notificação
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            ${message}
            <button class="notification-close">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Adiciona evento para fechar notificação
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Remove automaticamente após 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Função para adicionar smooth scroll
function addSmoothScroll() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Se for link interno (começar com #), adiciona smooth scroll
            if (href.startsWith('#') && href !== '#carrinho') {
                e.preventDefault();
                
                if (href === '#inicio') {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                } else {
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                }
            }
        });
    });
}

// ==================== PÁGINA DO CATÁLOGO ====================

function initializeCatalogPage() {
    // Seleciona todos os botões de compra
    const buyButtons = document.querySelectorAll('.btn-buy');
    
    // Adiciona evento de clique para cada botão de compra
    buyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtém dados do produto
            const productName = this.getAttribute('data-product');
            const productPrice = this.getAttribute('data-price');
            
            // Adiciona efeito visual ao botão
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Adiciona ao carrinho
            addToCart(productName, productPrice);
        });
    });
}

// Função para adicionar item ao carrinho
function addToCart(productName, price) {
    // Verifica se o produto já existe no carrinho
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        const item = {
            id: Date.now(),
            name: productName,
            price: parseFloat(price),
            quantity: 1
        };
        cart.push(item);
    }
    
    // Salva no localStorage
    saveCartToStorage();
    
    // Mostra notificação
    showNotification(`
        <h3>✅ Produto adicionado ao carrinho!</h3>
        <p><strong>${productName}</strong></p>
        <p>Preço: ${formatPrice(price)}</p>
        <p>Redirecionando para finalizar compra...</p>
    `);
    
    // Redireciona para a página de finalização da compra após 1.5 segundos
    setTimeout(() => {
        window.location.href = 'finalizar_compra.html';
    }, 1500);
}

// Função para obter total de itens no carrinho
function getTotalItems() {
    return cart.reduce((total, item) => total + item.quantity, 0);
}

// Função para obter total do carrinho
function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// ==================== PÁGINA DO CARRINHO ====================

function initializeCartPage() {
    displayCartItems();
    
    // Adiciona eventos para os botões do carrinho
    const limparCarrinhoBtn = document.getElementById('limpar-carrinho');
    const finalizarCompraBtn = document.getElementById('finalizar-compra');
    
    if (limparCarrinhoBtn) {
        limparCarrinhoBtn.addEventListener('click', clearCart);
    }
    
    if (finalizarCompraBtn) {
        finalizarCompraBtn.addEventListener('click', () => {
            window.location.href = 'finalizar_compra.html';
        });
    }
}

function displayCartItems() {
    const carrinhoVazio = document.getElementById('carrinho-vazio');
    const carrinhoItems = document.getElementById('carrinho-items');
    const listaProdutos = document.getElementById('lista-produtos');
    const totalGeral = document.getElementById('total-geral');
    
    if (cart.length === 0) {
        carrinhoVazio.style.display = 'block';
        carrinhoItems.style.display = 'none';
        return;
    }
    
    carrinhoVazio.style.display = 'none';
    carrinhoItems.style.display = 'block';
    
    // Limpa a lista atual
    listaProdutos.innerHTML = '';
    
    // Adiciona cada produto do carrinho
    cart.forEach(item => {
        const produtoDiv = document.createElement('div');
        produtoDiv.className = 'produto-carrinho';
        produtoDiv.innerHTML = `
            <div class="produto-info">
                <div class="produto-nome">${item.name}</div>
            </div>
            <div class="produto-preco">${formatPrice(item.price)}</div>
            <div class="quantidade-controls">
                <button class="btn-quantidade" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="btn-quantidade" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <div class="produto-total">${formatPrice(item.price * item.quantity)}</div>
            <div class="produto-acao">
                <button class="btn-remover" onclick="removeFromCart(${item.id})">Remover</button>
            </div>
        `;
        listaProdutos.appendChild(produtoDiv);
    });
    
    // Atualiza total geral
    totalGeral.textContent = formatPrice(getCartTotal());
}

// Função para atualizar quantidade
function updateQuantity(itemId, change) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            saveCartToStorage();
            displayCartItems();
        }
    }
}

// Função para remover item do carrinho
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCartToStorage();
    displayCartItems();
    showNotification('<h3>🗑️ Item removido do carrinho!</h3>', 'warning');
}

// Função para limpar carrinho
function clearCart() {
    if (confirm('Tem certeza que deseja limpar todo o carrinho?')) {
        cart = [];
        saveCartToStorage();
        displayCartItems();
        showNotification('<h3>🧹 Carrinho limpo com sucesso!</h3>', 'warning');
    }
}

// ==================== PÁGINA DE CONTATO ====================

function initializeContactPage() {
    const formContato = document.getElementById('form-contato');
    
    if (formContato) {
        formContato.addEventListener('submit', handleContactForm);
    }
}

function handleContactForm(e) {
    e.preventDefault();
    
    // Obtém dados do formulário
    const formData = new FormData(e.target);
    const dados = {
        nome: formData.get('nome'),
        email: formData.get('email'),
        telefone: formData.get('telefone'),
        assunto: formData.get('assunto'),
        mensagem: formData.get('mensagem')
    };
    
    // Validação básica
    if (!dados.nome || !dados.email || !dados.assunto || !dados.mensagem) {
        showNotification('<h3>❌ Erro!</h3><p>Por favor, preencha todos os campos obrigatórios.</p>', 'error');
        return;
    }
    
    // Simula envio do formulário
    showNotification('<h3>📧 Mensagem enviada com sucesso!</h3><p>Entraremos em contato em breve.</p>');
    
    // Limpa o formulário
    e.target.reset();
    
    console.log('Dados do contato:', dados);
}

// ==================== PÁGINA DE CHECKOUT ====================

function initializeCheckoutPage() {
    displayCheckoutSummary();
    
    const formCheckout = document.getElementById('form-checkout');
    const paymentOptions = document.querySelectorAll('input[name="pagamento"]');
    const dadosCartao = document.getElementById('dados-cartao');
    
    if (formCheckout) {
        formCheckout.addEventListener('submit', handleCheckoutForm);
    }
    
    // Mostra/esconde dados do cartão baseado na forma de pagamento
    paymentOptions.forEach(option => {
        option.addEventListener('change', function() {
            if (this.value === 'cartao-credito' || this.value === 'cartao-debito') {
                dadosCartao.style.display = 'block';
                // Torna os campos do cartão obrigatórios
                document.getElementById('numero-cartao').required = true;
                document.getElementById('nome-cartao').required = true;
                document.getElementById('validade').required = true;
                document.getElementById('cvv').required = true;
            } else {
                dadosCartao.style.display = 'none';
                // Remove obrigatoriedade dos campos do cartão
                document.getElementById('numero-cartao').required = false;
                document.getElementById('nome-cartao').required = false;
                document.getElementById('validade').required = false;
                document.getElementById('cvv').required = false;
            }
        });
    });
    
    // Máscara para CPF
    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        cpfInput.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        });
    }
    
    // Máscara para CEP
    const cepInput = document.getElementById('cep');
    if (cepInput) {
        cepInput.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '').replace(/(\d{5})(\d{3})/, '$1-$2');
        });
    }
    
    // Máscara para telefone
    const telefoneInput = document.getElementById('telefone-checkout');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '').replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        });
    }
}

function displayCheckoutSummary() {
    const resumoProdutos = document.getElementById('resumo-produtos');
    const subtotalCheckout = document.getElementById('subtotal-checkout');
    const freteCheckout = document.getElementById('frete-checkout');
    const totalCheckout = document.getElementById('total-checkout');
    
    if (!resumoProdutos) return;
    
    // Verifica se há itens no carrinho
    if (cart.length === 0) {
        resumoProdutos.innerHTML = '<p>Nenhum item no carrinho. <a href="index.html#catalogo">Adicionar produtos</a></p>';
        return;
    }
    
    // Limpa resumo atual
    resumoProdutos.innerHTML = '';
    
    // Adiciona cada produto do carrinho
    cart.forEach(item => {
        const produtoDiv = document.createElement('div');
        produtoDiv.className = 'produto-resumo';
        produtoDiv.innerHTML = `
            <div>
                <div style="font-weight: 500;">${item.name}</div>
                <div style="color: #666; font-size: 0.9rem;">Qtd: ${item.quantity}</div>
            </div>
            <div>${formatPrice(item.price * item.quantity)}</div>
        `;
        resumoProdutos.appendChild(produtoDiv);
    });
    
    // Calcula valores
    const subtotal = getCartTotal();
    const frete = 15.00; // Frete fixo
    const total = subtotal + frete;
    
    // Atualiza valores na tela
    if (subtotalCheckout) subtotalCheckout.textContent = formatPrice(subtotal);
    if (freteCheckout) freteCheckout.textContent = formatPrice(frete);
    if (totalCheckout) totalCheckout.textContent = formatPrice(total);
}

function handleCheckoutForm(e) {
    e.preventDefault();
    
    // Obtém dados do formulário
    const formData = new FormData(e.target);
    const dados = {
        nomeCompleto: formData.get('nome-completo'),
        cpf: formData.get('cpf'),
        email: formData.get('email-checkout'),
        telefone: formData.get('telefone-checkout'),
        cep: formData.get('cep'),
        endereco: formData.get('endereco'),
        numero: formData.get('numero'),
        complemento: formData.get('complemento'),
        bairro: formData.get('bairro'),
        cidade: formData.get('cidade'),
        estado: formData.get('estado'),
        pagamento: formData.get('pagamento')
    };
    
    // Validação básica
    const camposObrigatorios = ['nomeCompleto', 'cpf', 'email', 'telefone', 'cep', 'endereco', 'numero', 'bairro', 'cidade', 'estado', 'pagamento'];
    const camposFaltando = camposObrigatorios.filter(campo => !dados[campo]);
    
    if (camposFaltando.length > 0) {
        showNotification('<h3>❌ Erro!</h3><p>Por favor, preencha todos os campos obrigatórios.</p>', 'error');
        return;
    }
    
    // Verifica se há itens no carrinho
    if (cart.length === 0) {
        showNotification('<h3>❌ Erro!</h3><p>Seu carrinho está vazio. Adicione produtos antes de finalizar a compra.</p>', 'error');
        return;
    }
    
    // Simula processamento do pedido
    const numeroPedido = Math.floor(Math.random() * 1000000);
    
    showNotification(`
        <h3>🎉 Pedido realizado com sucesso!</h3>
        <p><strong>Número do pedido:</strong> #${numeroPedido}</p>
        <p><strong>Total:</strong> ${formatPrice(getCartTotal() + 15)}</p>
        <p>Você receberá um email de confirmação em breve.</p>
    `);
    
    // Limpa o carrinho após a compra
    setTimeout(() => {
        cart = [];
        saveCartToStorage();
        window.location.href = 'index.html';
    }, 3000);
    
    console.log('Dados do pedido:', dados);
    console.log('Itens do carrinho:', cart);
}

// ==================== FUNÇÕES GLOBAIS ====================

// Torna as funções disponíveis globalmente para uso nos eventos onclick
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.addToCart = addToCart;

