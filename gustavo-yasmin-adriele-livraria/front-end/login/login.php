<?php
session_start();

// Conexão com o banco de dados
$conn = new mysqli("localhost", "root", "", "livraria_web");

if ($conn->connect_error) {
    die("Erro na conexão: " . $conn->connect_error);
}

// Pegar os dados do formulário
$email = $_POST['email'];
$senha = $_POST['senha'];

// Verificar se o usuário existe (atenção: isso ainda está usando senha em texto puro!)
$sql = "SELECT * FROM usuarios WHERE email = '$email' AND senha = '$senha'";
$result = $conn->query($sql);

if ($result && $result->num_rows === 1) {
    $usuario = $result->fetch_assoc();

    // Salva dados na sessão
    $_SESSION['usuario_id'] = $usuario['id'];
    $_SESSION['usuario_nome'] = $usuario['nome'];

    // Redireciona para a página principal
    header("Location: front-end/index.php");
    exit;

} else {
    echo "Email ou senha inválidos.";
}

$conn->close();
?>
