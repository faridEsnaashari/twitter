create database gardeshgari_db;
use gardeshgari_db;

create table users_tbl(
    user_id int NOT NULL AUTO_INCREMENT,
    username varchar(50) DEFAULT 'user',
    userfamily varchar(50),
    phonenumber varchar(11) not null UNIQUE,
    national_id_number varchar(10) not null UNIQUE,
    verified boolean DEFAULT false,
    PRIMARY KEY (user_id)
);

create table registerycode_tbl(
	phonenumber varchar(11) UNIQUE,
    code varchar(5)
);

create table twitts_tbl(
	twitt_id int AUTO_INCREMENT,
    text Text(300) not null,
    img_link char(100),
    user_id int not null,
    date char(24) not null,
    replay_to_id int,
    deleted boolean DEFAULT false,
    PRIMARY KEY(twitt_id),
    FOREIGN KEY (user_id) REFERENCES users_tbl(user_id),
    FOREIGN KEY (replay_to_id) REFERENCES twitts_tbl(twitt_id)
);

create table retwitters_tbl(
	user_id int not null,
    twitt_id int not null,
    FOREIGN KEY (user_id) REFERENCES users_tbl(user_id),
    FOREIGN KEY (twitt_id) REFERENCES twitts_tbl(twitt_id)
);

create table likes_tbl(
	user_id int not null,
    twitt_id int not null,
    FOREIGN KEY (user_id) REFERENCES users_tbl(user_id),
    FOREIGN KEY (twitt_id) REFERENCES twitts_tbl(twitt_id)
);

create table replays_to_twitt_tbl(
	twitt_id int not null,
    twitt_replay_id int not null,
    FOREIGN KEY (twitt_id) REFERENCES twitts_tbl(twitt_id),
    FOREIGN KEY (twitt_replay_id) REFERENCES twitts_tbl(twitt_id)
);