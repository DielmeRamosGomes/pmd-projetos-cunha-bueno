class Produto {
    constructor( nome, preco , descricao, urlimagem) {
        this.nome = nome;
        this.preco = preco;
        this.descricao = descricao;
        this.urlimagem = urlimagem;
    }

    getNome() {
        return this.nome;
    }
 
    getPreco() {
        return this.preco;
    }
 
    getDescricao() {
        return this.descricao;
    }
 
      getUrl_imagem() {
        return this.url_imagem;
    }
    

}
export default Produto;