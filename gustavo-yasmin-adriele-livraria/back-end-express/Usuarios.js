class Usuario {
    constructor( nome, email, senha, data_cadastro) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.data_cadastro = data_cadastro;
        
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
 
    getDataCadastro() {
        return this.data_cadastro;
    }
 
}
export default Usuario;