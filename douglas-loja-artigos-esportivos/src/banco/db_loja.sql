create database if not exists db_loja;

create table if not exists db_loja.usuarios(
    id int auto_increment primary key,
    nome varchar(100) not null,
    email varchar(100) not null unique,
    senha varchar(100) not null
);







