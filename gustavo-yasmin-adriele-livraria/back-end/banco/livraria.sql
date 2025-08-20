CREATE DATABASE livraria_web;

USE livraria_web;
CREATE TABLE livraria_web.usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tipo_usuario ENUM('cliente', 'admin') DEFAULT 'cliente'
);

USE livraria_web;

CREATE TABLE livraria_web.LIVROS (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    valor DECIMAL(10,2),
    nome_produto VARCHAR(100) NOT NULL,
    genero_categoria VARCHAR(100) NOT NULL,
    autor VARCHAR(100),
    capa_url VARCHAR(255)
);

INSERT INTO livraria_web.LIVROS (valor, nome_produto, genero_categoria, autor, capa_url)
VALUES( 52.90,'mulher no escuro','Thriller, Suspense','Raphael Montes','https://www.minhavidaliteraria.com.br/2019/07/10/resenha-uma-mulher-no-escuro-raphael-montes/');

INSERT INTO livraria_web.LIVROS (valor,nome_produto, genero_categoria, autor,capa_url)
VALUES(69.90,'sol e as estrelas',' Fantasia e Ficção Científica, Infantojuvenil','Rick Riordan','img/Capa-O-Sol-e-a-Estrela-1.jpg'),
(59.90,'o calice dos deuses','Fantasia e Ficção Científica, Infantojuvenil','Rick Riordan','img/CALICE DOS DEUSES.jpg');


INSERT INTO livraria_web.usuarios (nome, email, senha, tipo_usuario)
VALUES ('jose de lima', 'joao@email.com', '512346', 'cliente');
 

INSERT INTO livraria_web.usuarios (nome, email, senha, tipo_usuario)
VALUES ('eliane teodoro','elianelixto@email','1234567','cliente')






drop table if exists livraria_web.usuarios;
drop table if exists livraria_web.LIVROS;
