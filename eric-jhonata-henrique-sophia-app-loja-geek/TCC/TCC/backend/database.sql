CREATE DATABASE mydatabase;

USE mydatabase;

CREATE TABLE mydatabase.usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    senha varchar(255),
    endereco varchar(255)
);

alter table mydatabase.usuarios
drop column endereco;


CREATE TABLE produtos (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    preco decimal(9999)
);

create table vendas (
    id_venda int auto_increment primary key,
    -- inserir data de venda e automatizar sua atualização
    id int,
    id_produto int,
    FOREIGN KEY (id_produto) REFERENCES produtos(id_produto),
    FOREIGN KEY (id) REFERENCES users(id)
);

/*
galera eu nao sei como fazer isso, nos temos que fazer uma tabela que junta o usuario com os produtos comprados mas
o dificil é se o usuario comprar mais de um produto ou comprar produtos diferentes, tem aquelas normas f1 f2 sla, temos que dar uma olhada nisso
se não por isso o resto ta praticamente ai. é claro seria bom dar uma revisada
-osaka
*/

select * from mydatabase.usuarios;