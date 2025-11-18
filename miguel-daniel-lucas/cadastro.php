<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro</title>
    <style>
        h1{
            font-size: 30px;
            color: rgb(0, 94, 255);
            text-shadow: 3px 3px 4px gray;
            text-align:center;
        }

        .cadastro{ 
            text-align:center;
            margin-top: 10%;
            margin-left: 40%;
            width: 450px;
            height: 350px;

            font-size: 30px;
            border-radius: 10px;
            border: 1px black solid;
            box-shadow: 5px 5px 6px black;
        }

        input{
            margin-top: 5px;
            width: 300px;
            height: 35px;
            font-size: 32px;
            color: blue;
            font-family: arial;
        }

        button{
            width: 200px;
            height: 40px;
            background: rgb(0, 89, 255);
            color: white;
            box-shadow: 3px 3px 5px black;
            margin-left: 20%;
            font-size: 20px;
            margin-top: 10px;
        }

        button:hover{
            width: 200px;
            height: 40px;
            background: rgb(0, 74, 211);
            color: white;
            box-shadow: 3px 3px 5px black;
            margin-left: 20%;
            font-size: 20px;
            margin-top: 10px;
        }

    </style> 
</head>
<body>
    <!--formulário de cadastro-->
        <div class="cadastro">
            <h1>Crie sua conta aqui!</h1>
    <form method="POST">
        Nome: <input type="text" name="nome" required><br>
        Email: <input type="email" name="email" required><br>
        Senha: <input type="password" name="senha" required><br>
        <button type="submit">Cadastrar</button>
    </form>
        </div>
</body>
</html>

<?php 

/* Início dos comandos em PHP */

include "db.php"; 

if ($_SERVER["REQUEST_METHOD"] == "POST") { 

    $nome  = $_POST['nome']; 
    $email = $_POST['email']; 
    $senha = password_hash($_POST['senha'], PASSWORD_DEFAULT); 
    $sql = "INSERT INTO usuarios (nome, email, senha) VALUES ('$nome', '$email', '$senha')"; 

//local da conexão e mensagem de envio com sucesso
    if ($conn->query($sql) === TRUE) { 
        echo "  <center>
        <p> Usuário cadastrado com sucesso!
        <a href='index.html'>Fazer login!</a>
        </p>
                </center>"; 
    } else { 
        echo "Erro: " . $conn->error; 
    } 
} 

?> 