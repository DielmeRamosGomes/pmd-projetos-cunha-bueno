const btnLogin = document.querySelector('.btn-login');
const formLogin = document.querySelector('.form-login');
let respostaId = null;
let id;

btnLogin.addEventListener('click', async (event) => {
    event.preventDefault();
    const formData = new FormData(formLogin);
    const usuario = {
        email: formData.get('email'),
        senha: formData.get('senha')
    }

    console.log(usuario);

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
        const dados = await respostaId.json();
        console.log(dados);
        alert(`Login realizado com sucesso! Seu ID é: ${dados[0][0].id}`);
        id = dados[0][0].id;
        window.location.href = "./index.html";

    } catch (error) {
        console.log(`Erro: ${error}`);
    }
}
//export { id };

