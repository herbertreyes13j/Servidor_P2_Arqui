create database p2_ace2;
use p2_ace2;

create table partida(
	id_partida int auto_increment,
	username varchar(100),
	puntaje int,
	estado int,
	fecha date,
	primary key(id_partida)
);

create table movimiento(
	id_mov int auto_increment,
	tipo varchar(100),
	id_partida int not null,
	primary key (id_mov),
	foreign key (id_partida) references partida(id_partida)
);
