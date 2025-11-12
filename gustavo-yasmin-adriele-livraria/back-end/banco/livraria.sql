CREATE DATABASE livraria_web;

USE livraria_web;

CREATE TABLE
    livraria_web.usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        senha VARCHAR(255) NOT NULL,
        data_cadastro date
    );

USE livraria_web;

CREATE TABLE
    livraria_web.livros (
        ID INT AUTO_INCREMENT PRIMARY KEY,
        valor DECIMAL(10, 2),
        nome_livro VARCHAR(100) NOT NULL,
        genero VARCHAR(100) NOT NULL,
        autor VARCHAR(100),
        capa_url VARCHAR(255),
        editora VARCHAR(100),
        data_publicacao DATE,
        descricao VARCHAR(100)
    );

CREATE TABLE
    endereço (
        cidade VARCHAR(100),
        regiao VARCHAR(100),
        numero_residencia VARCHAR(100),
        rua_avenida VARCHAR(100)
    );

CREATE PROCEDURE if not exists livraria_web.CADASTRO_USUARIO (
    IN p_nome VARCHAR(100),
    IN p_senha VARCHAR(255),
    IN p_email VARCHAR(100)
) BEGIN DECLARE v_id INT;

-- Verifica se o e-mail já está cadastrado
SELECT
    id INTO v_id
FROM
    livraria_web.usuarios
WHERE
    email = p_email;

IF v_id IS NOT NULL THEN SIGNAL SQLSTATE '45000'
SET
    MESSAGE_TEXT = 'Este email já está cadastrado.';

END IF;

-- Insere o novo usuário
INSERT INTO
    livraria_web.usuarios (nome, email, senha, data_cadastro)
VALUES
    (p_nome, p_email, p_senha, CURDATE ());

END;

INSERT INTO
    livraria_web.LIVROS (
        valor,
        nome_produto,
        genero_categoria,
        autor,
        capa_url
    )
VALUES
    (
        52.90,
        'mulher no escuro',
        'Thriller, Suspense',
        'Raphael Montes',
        'https://www.minhavidaliteraria.com.br/2019/07/10/resenha-uma-mulher-no-escuro-raphael-montes/'
    );

INSERT INTO
    livraria_web.LIVROS (
        valor,
        nome_produto,
        genero_categoria,
        autor,
        capa_url
    )
VALUES
    (
        69.90,
        'sol e as estrelas',
        ' Fantasia e Ficção Científica, Infantojuvenil',
        'Rick Riordan',
        'img/Capa-O-Sol-e-a-Estrela-1.jpg'
    ),
    (
        59.90,
        'o calice dos deuses',
        'Fantasia e Ficção Científica, Infantojuvenil',
        'Rick Riordan',
        'img/CALICE DOS DEUSES.jpg'
    );

INSERT INTO
    livraria_web.usuarios (nome, email, senha, tipo_usuario)
VALUES
    (
        'jose de lima',
        'joao@email.com',
        '512346',
        'cliente'
    );

INSERT INTO
    livraria_web.USUARIOS (nome, email, senha, tipo_usuario)
INSERT INTO
    livraria_web.usuarios (nome, email, senha, tipo_usuario)
VALUES
    (
        'eliane teodoro',
        'elianelixto@email',
        '1234567',
        'cliente'
    )
drop table if exists livraria_web.usuarios;

drop table if exists livraria_web.LIVROS;

INSERT INTO
    livraria_web.livros (
        valor,
        nome_produto,
        genero_categoria,
        autor,
        capa_url
    )
VALUES
    (
        50,
        90 mar de montros,
        antasia e Ficção Científica,
        Infantojuvenil,
        rick Riordan,
    ) 
    
create procedure if not exists livraria_web.pegar_usuario_id(
    pe_email varchar(100),
    pe_senha varchar(200)) 
    begin
    select id from livraria_web.usuarios as u
        where
            pe_email = u.email and pe_senha = u.senha;
    end;

select * from livraria_web.usuarios;