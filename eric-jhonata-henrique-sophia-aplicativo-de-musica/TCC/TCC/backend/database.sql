CREATE DATABASE mydatabase;

USE mydatabase;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    senha varchar(255),
    endereco varchar(255)
);