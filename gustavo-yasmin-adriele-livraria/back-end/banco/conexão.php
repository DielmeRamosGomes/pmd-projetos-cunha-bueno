<?php
if (session_status() !== PHP_SESSION_ACTIVE){  //Verificar se a sessão já está aberta.
		session_start();
	} 

// Dados do banco
$servidor = "localhost";  // normalmente localhost no XAMPP
$usuario = "root";         // usuário padrão do MySQL no XAMPP é root
$senha = "";               // senha padrão é vazia (sem senha)
$banco = "livraria_web";       // nome do seu banco de dados

// Criar a conexão
$conn = mysqli_connect($servidor, $usuario, $senha, $banco, "3306");

// Verificar se a conexão deu certo
if(!$conn){
		die('Não foi possível conectar: '.mysqli_connect_error());
	}

echo "Conectado com sucesso!";

// Fechar a conexão (opcional, mas recomendado)
//$conn->close();
?>
