create database db_teste;
create table if not exists usuarios(
    id_usuario int auto_increment primary key,
    nome varchar(20) not null,
    email varchar(20) not null unique,
    senha varchar(40) not null
);

create table if not exists endereco(
    id_endereco int auto_increment primary key,
    rua varchar(30) not null,
    cep int not null,
    estado varchar(30) not null,
    numero int not null,
    complemento varchar(60) not null,
    id_usuario int not null,
    foreign key id_usuario references usuarios(id_usuario)
);