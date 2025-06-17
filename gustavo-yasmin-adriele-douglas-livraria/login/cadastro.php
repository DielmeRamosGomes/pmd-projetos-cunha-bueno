<?php
session_start(); // Inicia a sessão para armazenar os dados dos usuários

// Conectar ao banco de dados
$conn = new mysqli("localhost", "root", "", "livraria_web");

// Verificar erro na conexão
if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

// Verificar se o formulário foi enviado
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nome = $_POST["nome"];
    $email = $_POST["email"];
    $senha = $_POST["senha"];
    $confirmaSenha = $_POST["confirmaSenha"];

    // Verifica se as senhas são iguais
    if ($senha !== $confirmaSenha) {
        echo "<script>alert('As senhas não coincidem!');</script>";
    } else {
        // Verifica se o email já está cadastrado
        $verifica = $conn->prepare("SELECT id FROM usuarios WHERE email = ?");
        $verifica->bind_param("s", $email);
        $verifica->execute();
        $verifica->store_result();

        if ($verifica->num_rows > 0) {
            echo "<script>alert('Este email já está cadastrado. Tente outro.');</script>";
        } else {
            // Inserir no banco
            $stmt = $conn->prepare("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)");
            $stmt->bind_param("sss", $nome, $email, $senha); // Dica: depois podemos adicionar criptografia

            if ($stmt->execute()) {
                $_SESSION['usuario_nome'] = $nome;
                $_SESSION['usuario_id'] = $conn->insert_id;
                header("Location: ../front-end/index.php");
                exit;
            } else {
                echo "<script>alert('Erro ao cadastrar: " . $stmt->error . "');</script>";
            }

            $stmt->close();
        }

        $verifica->close();
    }
}

$conn->close();
?>