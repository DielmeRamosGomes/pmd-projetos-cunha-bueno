class Usuario {
    constructor( nome, email, senha) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
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
 
}
export default Usuario;