CREATE DATABASE mydatabase;

USE mydatabase;

CREATE TABLE mydatabase.usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    senha varchar(255)
);

select * from mydatabase.usuarios;

alter table mydatabase.usuarios
drop column endereco;

select * from mydatabase.usuarios;


/* ESSA É A TABELA DE PRODUTOS, ELA CONTEM INFORMAÇÕES SOBRE OS PRODUTOS COMO PREÇO E TALS*/


CREATE TABLE mydatabase.produtos (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) not null,
    preco decimal(10,2) not null,
    descricao VARCHAR(300) not null,
    urlimagem varchar(255) not null
    /*adicionar descrição pra colocar elas no site por meio do sql em vez de html*/
);

select * from mydatabase.produtos;

create table compra (
    id_compra int auto_increment primary key,
    -- inserir data de venda e automatizar sua atualização
    id int,
    id_produto int,
    FOREIGN KEY (id_produto) REFERENCES produtos(id_produto),
    FOREIGN KEY (id) REFERENCES users(id)
);

create table item_compra(
    id_item_compra int auto_increment primary key,
    quantidade int,
    id_compra int,
    FOREIGN KEY (id_compra) REFERENCES compra(id_compra)
);
create view mydatabase.pegar_usuario_id as 
pe_email varchar(100),
pe_senha varchar(200),
begin
select id from
mydatabase.usuarios where
pe_email = u.email and 
pe_senha = u.senha ,
end;

create procedure if not exists mydatabase.cadastro_venda(id int, data_compra date)
begin 
insert into mydatabase.compra(id int, data_compra date)
values(cv_usuario_id, cv_data_compra)

