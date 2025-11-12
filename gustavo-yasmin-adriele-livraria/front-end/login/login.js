const btnEntrar = document.querySelector('#btn-entrar');
let idUsuario = "";

async function fetchIdUsuario() {
    try {
        const response = await fetch('http://localhost:3000/listaidusuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: document.getElementById('email').value,
                senha: document.getElementById('senha').value
            })
        });
        const dados = await response.json();
        if (dados) {
            console.log('ID do usuário encontrado:', dados);
        } else {
            console.log('Usuário não encontrado ou credenciais inválidas.');
        }
    } catch(error) {
        console.error('Erro ao buscar ID do usuário:', error);
    }
}

btnEntrar.addEventListener('click', async (event) => {
    event.preventDefault();
    await fetchIdUsuario();
});


