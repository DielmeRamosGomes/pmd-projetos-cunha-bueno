let respostaId = null;

addEventListener("input", function (event) {
  event.preventDefault();
  var nome = document.getElementById("inputnome").value;
  var conteudoemail = document.getElementById("inputemail").value;
  var senha = document.getElementById("senha").value;

  /*
    if (nome && conteudoemail && senha) {
      document.getElementById("botao1").disabled = false;
    } else {
      document.getElementById("botao1").disabled = true;
    }*/
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
    const dados = await respostaId.json();
    console.log(dados);
    alert(`Login realizado com sucesso! Seu ID é: ${dados[0][0].id}`);

  } catch (error) {
    console.log(`Erro: ${error}`);
  }
}