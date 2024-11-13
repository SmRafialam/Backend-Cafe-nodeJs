create table cafeUser (
    id int primary key AUTO_INCREMENT,
    name varchar(255),
    contactNumber varchar(20),
    email varchar(50),
    password varchar(250),
    status varchar(20),
    role varchar(20),
    UNIQUE (email)
)

insert into cafeUser(name,contactNumber,email,password,status,role) values('Admin','123123123','admin@gmail.com','admin123','true','admin');


create table category (
    id NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    primary key(id)
)