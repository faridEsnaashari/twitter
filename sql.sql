create database gardeshgari_db;
use gardeshgari_db;

create table users_tbl(
    user_id int NOT NULL AUTO_INCREMENT,
    username varchar(50) DEFAULT 'user',
    userfamily varchar(50),
    phonenumber varchar(11) not null,
    national_id_number varchar(10) not null,
    verified boolean DEFAULT false,
    PRIMARY KEY (user_id)
);

create table registerycode_tbl(
	phonenumber varchar(11),
    code varchar(5)
)