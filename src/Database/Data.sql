create database p2_ace2;
use p2_ace2;

create table recorrido(
	id_recorrido int auto_increment,
    descripcion varchar(100),
    distancia_recorrida varchar(100),
    tiempo_total varchar(100),
    primary key (id_recorrido)
);

create table objeto(
	id_objeto int auto_increment,
    id_recorrido int not null,
    posicion varchar(100),
    tipo varchar(100),
    primary key (id_objeto),
    foreign key (id_recorrido) references recorrido(id_recorrido)
);

create table accion(
	id_accion int auto_increment,
    id_recorrido int not null,
    tipo_accion varchar(20),
    tiempo varchar(100),
    primary key(id_accion),
    foreign key (id_recorrido) references recorrido(id_recorrido)
);

create table velocidad(
	id_vel int auto_increment,
    id_recorrido int not null,
    velocidad varchar(100),
    tiempo varchar(100),
    primary key (id_vel),
    foreign key (id_recorrido) references recorrido(id_recorrido)
);
