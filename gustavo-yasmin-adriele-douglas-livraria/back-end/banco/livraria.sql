CREATE DATABASE LIVRATIA ONLINE;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tipo_usuario ENUM('cliente', 'admin') DEFAULT 'cliente'
);

INSERT INTO usuarios (nome, email, senha, tipo_usuario)
VALUES ('João da Silva', 'joao@email.com', '123456', 'cliente');
 










