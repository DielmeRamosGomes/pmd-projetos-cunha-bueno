<?php
// Change these values to match your database setup
$host = "localhost";
$user = "root";
$password = "";
$database = "mydatabase";

// Create connection
$conn = new mysqli($host, $user, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Conexão falha: " . $conn->connect_error);
}

// Get POST data
$name = $_POST['name'];
$email = $_POST['email'];
$senha = $_POST['senha'];
$endereco = $_POST['endereco'];

// Insert into database
$sql = "INSERT INTO usuarios (name, email, senha, endereco) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $name, $email, $senha, $endereco);

if ($stmt->execute()) {
header("Location: compras.html");
exit();
    echo "Arigato, $name! seus dados são nossos agora.";
} else {
    echo "Error: " . $stmt->error;
}


$stmt->close();
$conn->close();
?>