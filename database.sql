create database Proyecto_final;

use Proyecto_final;

create table clientes(
cliente_id int unsigned not null auto_increment,
cliente_nombre varchar(150) not null,
cliente_apellido varchar(150)not null,
cliente_mail varchar(180)not null,
cliente_comentario varchar(500),
primary key(cliente_id)
);