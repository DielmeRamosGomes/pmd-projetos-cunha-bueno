<?php
// Dados do banco
$servidor = "localhost";  // normalmente localhost no XAMPP
$usuario = "root";         // usuário padrão do MySQL no XAMPP é root
$senha = "";               // senha padrão é vazia (sem senha)
$banco = "livraria_web";       // nome do seu banco de dados

// Criar a conexão
$conn = new mysqli($servidor, $usuario, $senha, $banco);

// Verificar se a conexão deu certo
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

echo "Conectado com sucesso!";

// Fechar a conexão (opcional, mas recomendado)
$conn->close();
?>
