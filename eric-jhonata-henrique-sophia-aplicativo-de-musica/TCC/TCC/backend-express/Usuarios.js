class Usuario {
    constructor(id, nome, email, senha, ) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }
 
    getId() {
        return this.id;
    }
 
    getNome() {
        return this.nome;
    }
 
    getEmail() {
        return this.email;
    }
 
    getSenha() {
        return this.senha;
    }
 
    exibirDetalhes() {
        console.log(`ID: ${this.getId()}`);
        console.log(`Nome: ${this.getNome()}`);
        console.log(`Email: ${this.getEmail()}`);
        console.log(`Data de Cadastro: ${this.getDataCadastro()}`);
        console.log(`Ativo: ${this.isAtivo() ? 'Sim' : 'Não'}`);
    }
}
export default Usuario;