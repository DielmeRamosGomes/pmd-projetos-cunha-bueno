class Livros{
    constructor(valor,nome_produto,genero_categoria,autor,capa_url) {
        this.nome = valor;
        this.nome_produto = nome_produto;
        this.genero_categoria = genero_categoria;
        this.autor = autor;
        this.capa_url = capa_url;

    }
 getvalor() {
        return this.valor;
    }
 
    getnome_produto() {
        return this.nome_produto;
    }
 
    getgenero_categoria() {
        return this.genero_categoria;
    }
 
    getautor() {
        return this.autor;
    }
 
    getcapa_url() {
        return this.capa_url;
    }





}
export default Livros;
