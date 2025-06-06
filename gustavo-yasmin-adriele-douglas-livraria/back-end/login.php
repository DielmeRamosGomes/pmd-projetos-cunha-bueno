<?php
session_start();

// Conexão com o banco de dados
$conn = new mysqli("localhost", "root", "", "livraria");

if ($conn->connect_error) {
    die("Erro na conexão: " . $conn->connect_error);
}

// Pegar os dados do formulário
$email = $_POST['email'];
$senha = $_POST['senha'];

// Verificar se o usuário existe
$sql = "SELECT * FROM usuarios WHERE email = '$email' AND senha = '$senha'";
$result = $conn->query($sql);

if ($result->num_rows === 1) {
    $usuario = $result->fetch_assoc();
    $_SESSION['usuario_id'] = $usuario['id'];
    $_SESSION['usuario_nome'] = $usuario['nome'];
    echo "Login bem-sucedido! Bem-vindo, " . $_SESSION['usuario_nome'];
    // Exemplo: redirecionar para o painel do usuário
    // header("Location: painel.php");
} else {
    echo "Email ou senha inválidos.";
}

$conn->close();
?>
