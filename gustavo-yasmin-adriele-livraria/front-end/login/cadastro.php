<?php
session_start();
include_once("conexao.php");

// ==============================
// 1. Coleta e sanitiza dados do POST
// ==============================
$nome = trim($_POST["nome"]);
$email = trim($_POST["email"]);
$senha = $_POST["senha"];
$confirmaSenha = $_POST["confirmaSenha"];

// ==============================
// 2. Validação de senhas
// ==============================
if ($senha !== $confirmaSenha) {
    echo "<script>alert('As senhas não coincidem!'); window.history.back();</script>";
    exit;
}

// ==============================
// 3. Verifica se o email já existe
// ==============================
$stmt = $conexao->prepare("SELECT id FROM usuarios WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo "<script>alert('Este email já está cadastrado.'); window.history.back();</script>";
    $stmt->close();
    exit;
}
$stmt->close();

// ==============================
// 4. Cria hash da senha
// ==============================
$senhaHash = password_hash($senha, PASSWORD_DEFAULT);

// ==============================
// 5. Insere usuário no banco
// ==============================
$stmt = $conexao->prepare("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $nome, $email, $senhaHash);

if ($stmt->execute()) {
    // ==============================
    // 6. Guarda dados na sessão
    // ==============================
    $_SESSION['usuario_nome'] = $nome;
    $_SESSION['usuario_id'] = $conexao->insert_id;

    // ==============================
    // 7. Redireciona para a página principal
    // ==============================
    header("Location: index.php");
    exit;
} else {
    echo "<script>alert('Erro ao cadastrar: " . $stmt->error . "'); window.history.back();</script>";
}

// ==============================
// 8. Fecha statements e conexão
// ==============================
$stmt->close();
$conexao->close();
?>
