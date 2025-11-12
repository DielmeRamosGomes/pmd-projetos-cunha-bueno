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
        capa_url VARCHAR(500),
        editora VARCHAR(100),
        data_publicacao DATE,
        descricao VARCHAR(500)
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

create procedure if not exists livraria_web.pegar_usuario_id(
    pe_email varchar(100),
    pe_senha varchar(200)) 
    begin
    select u.id from livraria_web.usuarios as u
        where
            pe_email = u.email and pe_senha = u.senha;
    end;

create procedure if not exists livraria_web.cadastrar_livro(
    cl_valor DECIMAL(10, 2),
    cl_nome_livro VARCHAR(100),
    cl_genero VARCHAR(100),
    cl_autor VARCHAR(100),
    cl_capa_url VARCHAR(500),
    cl_editora VARCHAR(100),
    cl_data_publicacao DATE,
    cl_descricao VARCHAR(500)
)
begin
    insert into livraria_web.livros(valor, nome_livro, genero, autor, capa_url, editora, data_publicacao, descricao)
        values(cl_valor, cl_nome_livro, cl_genero, cl_autor, cl_capa_url, cl_editora, cl_data_publicacao, cl_descricao);
end;

select * from livraria_web.usuarios;