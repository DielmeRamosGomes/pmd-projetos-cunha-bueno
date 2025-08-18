 let login = 0;
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona elementos
    const botoesAdicionar = document.querySelectorAll('.adicionar');
    const listaCarrinho = document.querySelector('.itens-carrinho');
    const totalElemento = document.querySelector('.total span');
    const botaoFinalizar = document.querySelector('.finalizar');
    
    // Inicializa carrinho
    let carrinho = [];
    let total = 0;
   
    
    // Adiciona eventos aos botões
    botoesAdicionar.forEach(botao => {
        botao.addEventListener('click', adicionarAoCarrinho);
    });
    


    // Evento para finalizar compra
    botaoFinalizar.addEventListener('click', finalizarCompra);

    // Função para adicionar produto ao carrinho
    function adicionarAoCarrinho(event) {
        const botao = event.target;
        const produtoElemento = botao.parentElement;
        
        const id = produtoElemento.getAttribute('data-id');
        const nome = produtoElemento.getAttribute('data-nome');
        const preco = parseFloat(produtoElemento.getAttribute('data-preco'));

        
        // Verifica se o produto já está no carrinho
        const itemExistente = carrinho.find(item => item.id === id);
        
        if (itemExistente) {
            itemExistente.quantidade++;
        } else {
            carrinho.push({
                id,
                nome,
                preco,
                quantidade: 1
            });
        }
        
        atualizarCarrinho();
    }
    
    // Função para atualizar a exibição do carrinho
    function atualizarCarrinho() {
        // Limpa a lista
        listaCarrinho.innerHTML = '';
        
        // Reseta o total
        total = 0;
        
        // Adiciona cada item ao carrinho
        carrinho.forEach(item => {
            const itemElemento = document.createElement('li');
            
            const subtotal = item.preco * item.quantidade;
            total += subtotal;
            
            itemElemento.innerHTML = `
                <span>${item.nome} x ${item.quantidade}</span>
                <span>R$ ${subtotal.toFixed(2)}</span>
                <button class="remover" data-id="${item.id}">×</button>
            `;
            
            listaCarrinho.appendChild(itemElemento);
        });
        
        // Atualiza o total
        totalElemento.textContent = total.toFixed(2);
        
        // Adiciona eventos aos botões de remover
        document.querySelectorAll('.remover').forEach(botao => {
            botao.addEventListener('click', removerDoCarrinho);
        });
    }
    
    // Função para remover item do carrinho
    function removerDoCarrinho(event) {
        const id = event.target.getAttribute('data-id');
        
        carrinho = carrinho.filter(item => {
            if (item.id === id) {
                if (item.quantidade > 1) {
                    item.quantidade--;
                    return true;
                }
                return false;
            }
            return true;
        });
        
        atualizarCarrinho();
    }
    
    // Função para finalizar a compra
    function finalizarCompra() {
        if (login == 1){
        if (carrinho.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }
        
        alert(`Compra finalizada! Total: R$ ${total.toFixed(2)}`);
        carrinho = [];
        atualizarCarrinho();
    }
    else{
         alert('voce tem que se cadastrar primeiro!');
    }
    }
  
});

function play(){
var audio = new Audio('sata.mp3');
audio.play();
};

function permitido(){
    login + 1;
}