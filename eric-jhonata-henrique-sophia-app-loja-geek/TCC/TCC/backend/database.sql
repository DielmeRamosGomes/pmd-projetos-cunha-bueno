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

call mydatabase.cadastrar_produto("Osaka", 300, "GREATEST OF ALL TIME", "img/osaka.jpg");

update mydatabase.produtos as p set p.urlimagem = "img/osaka.jfif"
    where p.id_produto = 1;

select * from mydatabase.usuarios;


call mydatabase.cadastrar_produto("Pelucia da Chiyo", 250, "Chiyo-chan de Azumanga Daioh (pirralha), pelucia 18cm x 16cm", "img/chiyochan.jpg");

call mydatabase.cadastrar_produto("pelucia Neco Arc", 100, "Arcueid Brunestud de Tsukihime, pelucia 20cm x 18cm", "img/Neko Arc.jpg");
update mydatabase.produtos as p set p.urlimagem = "img/chiyochan.jpg"
    where p.id_produto = 2;
call mydatabase.cadastrar_produto("Pelucia da Hatsune Miku", 150, "Hatsune Miku cantora virtual, Vocaloid, pelucia 30cm x 20cm", "img/hatsune miku.jpg");

call mydatabase.cadastrar_produto("Pelucia do Caine", 93, "Caine de The Amazing Digital Circus, pelucia 30cm x 25cm", "img/Caine.jpg");

call mydatabase.cadastrar_produto("Pelucia da Kuromi", 65, "Kuromi personagem da Sanrio, pelucia 30cm x 20cm", "img/Kuromi.jpg");

call mydatabase.cadastrar_produto("Pelucia do Broly", 190, "Broly de Dragon Ball, pelucia 55cm x 28cm", "img/Brolly Plush.avif");

call mydatabase.cadastrar_produto("Pelucia do Goku", 50, "Goku de Dragon Ball, pelucia 25cm x 18cm", "img/Goku.jpg");

call mydatabase.cadastrar_produto("Pelucia do Luffy", 150, "Luffy de One Piece, pelucia 25cm x 18cm", "img/luffy2.jpg"); 

call mydatabase.cadastrar_produto("Pelucia do Luffy Gear 5", 170, "Luffy de One Piece, pelucia 25cm x 18cm", "img/luffyG5.jpg"); 

call mydatabase.cadastrar_produto("Pelucia do Sanji", 150, "Sanji de One Piece, pelucia 25cm x 18cm", "img/Sanji.jpg"); 

call mydatabase.cadastrar_produto("Pelucia do Bruxo", 250, "sale fulbito?, pelucia 25cm x 18cm", "img/O bruxo.jpg"); 

delete from mydatabase.produtos
where nome = "Pelucia do Zoro";

update mydatabase.produtos 
set descricao = "ballz";
where nome = "Pelucia do Caine";