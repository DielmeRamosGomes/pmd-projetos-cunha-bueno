CREATE DATABASE mydatabase;

USE mydatabase;

CREATE TABLE
    mydatabase.usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255),
        senha varchar(255)
    );

select
    *
from
    mydatabase.usuarios;

alter table mydatabase.usuarios
drop column endereco;

select
    *
from
    mydatabase.usuarios;

/* ESSA É A TABELA DE PRODUTOS, ELA CONTEM INFORMAÇÕES SOBRE OS PRODUTOS COMO PREÇO E TALS*/
CREATE TABLE
    mydatabase.produtos (
        id_produto INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255) not null,
        preco decimal(10, 2) not null,
        descricao VARCHAR(300) not null,
        urlimagem varchar(255) not null
        /*adicionar descrição pra colocar elas no site por meio do sql em vez de html*/
    );

select
    *
from
    mydatabase.produtos;

create table
    mydatabase.compra (
        id_compra int auto_increment primary key,
        id_usuario int not null,
        data_compra date,
        FOREIGN KEY (id_usuario) REFERENCES mydatabase.usuarios (id)
    );

drop table mydatabase.usuarios;

drop table mydatabase.produtos;

drop table mydatabase.compra;

drop table mydatabase.item_compra;

drop procedure mydatabase.cadastro_compra;

create table
    mydatabase.item_compra (
        id_item_compra int auto_increment primary key,
        quantidade int not null,
        id_compra int not null,
        id_produto int not null,
        FOREIGN KEY (id_compra) REFERENCES mydatabase.compra (id_compra),
        FOREIGN KEY (id_produto) REFERENCES mydatabase.produtos (id_produto)
    );

create procedure mydatabase.pegar_usuario_id (pe_email varchar(100), pe_senha varchar(200)) begin
select
    id
from
    mydatabase.usuarios as u
where
    pe_email = u.email
    and pe_senha = u.senha;

end;

drop procedure mydatabase.pegar_usuario_id;

create procedure if not exists mydatabase.cadastro_compra (id int) begin
insert into
    mydatabase.compra (id_usuario, data_compra)
values
    (cv_usuario_id, CURDATE ());

end;

/*procedure item de venda */
create procedure mydatabase.cadastro_item_compra (
    ic_quantidade int,
    ic_id_compra int,
    ic_id_produto int
) begin
insert into
    mydatabase.item_compra (quantidade, id_compra, id_produto)
values
    (ic_quantidade, ic_id_compra, ic_id_produto);

end;

create procedure if not exists mydatabase.cadastrar_produto (
        cp_nome VARCHAR(255),
        cp_preco decimal(10, 2),
        cp_descricao VARCHAR(300),
        cp_urlimagem varchar(255)
) 
begin
    insert into mydatabase.produtos(nome, preco, descricao, urlimagem)
        values(cp_nome, cp_preco, cp_descricao, cp_urlimagem);
end;

select * from mydatabase.produtos;

call mydatabase.cadastrar_produto("plushie osaka", 200.50, "boneco", "img/osaka.jfif");

update mydatabase.produtos as p set p.urlimagem = "img/osaka.jfif"
    where p.id_produto = 1;

select * from mydatabase.usuarios;