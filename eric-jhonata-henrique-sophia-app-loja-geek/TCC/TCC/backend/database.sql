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





/*
galera eu nao sei como fazer isso, nos temos que fazer uma tabela que junta o usuario com os produtos comprados mas
o dificil é se o usuario comprar mais de um produto ou comprar produtos diferentes, tem aquelas normas f1 f2 sla, temos que dar uma olhada nisso
se não por isso o resto ta praticamente ai. é claro seria bom dar uma revisada
-osaka
*/

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

/*aqui vamos colocar as informações do produto, preco e nome. lembre de depois colocar as informações de cada produto aqui, comecem pequeno por motivos de teste*/



/*FALTA A TABELA QUE JUNTA:
O ID DO CLIENTE LOGADO
OS PRODUTOS QUE ELE COMPROU
A QUANTIDADE DE CADA
O PREÇO TOTAL DA COMPRA 


seria bom criar uma view fazer*/


create table vendas (
    id_venda int auto_increment primary key,
    -- inserir data de venda e automatizar sua atualização
    id int,
    id_produto int,
    FOREIGN KEY (id_produto) REFERENCES produtos(id_produto),
    FOREIGN KEY (id) REFERENCES users(id)
);



create table item_vendas



create view 


