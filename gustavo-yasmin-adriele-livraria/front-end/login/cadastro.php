<?php
include_once("conexao.php");

$nome = trim($_POST["nome"]);
$email = trim($_POST["email"]);
$senha = $_POST["senha"];
$confirmaSenha = $_POST["confirmaSenha"];

$sql = "CALL CADASTRO_USUARIO('$nome','$senha','$email');" ;
$salvar = mysqli_query($conexao,$sql);
$row_total = mysqli_fetch_array($salvar);

 if ($senha !== $confirmaSenha) {
        echo "<script>alert('As senhas não coincidem!'); window.history.back();</script>";
        exit;
    }


/*
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Conexão com o banco de dados
$conn = new mysqli("localhost", "root", "", "livraria_web");
if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

// Verifica se o formulário foi enviado
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nome = trim($_POST["nome"]);
    $email = trim($_POST["email"]);
    $senha = $_POST["senha"];
    $confirmaSenha = $_POST["confirmaSenha"];

    // Verifica se as senhas coincidem
    if ($senha !== $confirmaSenha) {
        echo "<script>alert('As senhas não coincidem!'); window.history.back();</script>";
        exit;
    }

    // Verifica se o e-mail já está cadastrado
    $verifica = $conn->prepare("SELECT id FROM livraria_web.usuarios WHERE email = ?");
    $verifica->bind_param("s", $email);
    $verifica->execute();
    $verifica->store_result();

    if ($verifica->num_rows > 0) {
        echo "<script>alert('Este email já está cadastrado.'); window.history.back();</script>";
        exit;
    }

    // Cria hash da senha
    $senhaHash = password_hash($senha, PASSWORD_DEFAULT);

    // Insere o usuário no banco
    $stmt = $conn->prepare("INSERT INTO livraria_web.usuarios(nome, email, senha) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $nome, $email, $senhaHash);

    if ($stmt->execute()) {
        // Guarda informações na sessão
        $_SESSION['usuario_nome'] = $nome;
        $_SESSION['usuario_id'] = $conn->insert_id;

        // Redireciona para a página principal
        header("Location: ../index.php");
        exit;
    } else {
        echo "<script>alert('Erro ao cadastrar: " . $stmt->error . "'); window.history.back();</script>";
    }

    $stmt->close();
    $verifica->close();
}

$conn->close();
*/
?>
