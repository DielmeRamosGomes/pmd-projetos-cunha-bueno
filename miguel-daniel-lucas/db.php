<?php
$host = "sql208.infinityfree.com";
$user = "if0_39925446";     // usuário do MySQL
$pass = "6hWCzFzAb5Fri";         // senha do MySQL
$db   = "if0_39925446_dan2cunha"; // banco de dados

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Erro na conexão: " . $conn->connect_error);
}
else{
    echo'<script>
    alert("Conexão realizada com sucesso!")
    </script>';
}
?>