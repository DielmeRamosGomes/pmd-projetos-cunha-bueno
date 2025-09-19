create database db_jogo;

create table db_jogo.usuarios(
    id int auto_increment primary key,
    nome VARCHAR(100) not null,
    email VARCHAR(100) not null,
    senha VARCHAR(50) not null 
);



