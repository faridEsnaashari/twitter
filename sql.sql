create database gardeshgari_db;
use gardeshgari_db;

create table users_tbl(
    user_id binary(16) NOT NULL,
    username varchar(50) DEFAULT 'user',
    userfamily varchar(50),
    phonenumber varchar(11) not null UNIQUE,
    national_id_number varchar(10) not null UNIQUE,
    verified boolean DEFAULT false,
    PRIMARY KEY (user_id)
);

create table verification_log_tbl(
    log_id binary(16) not null,
	phonenumber char(11) UNIQUE,
    code varchar(5),
    ip char(20),
    device_type char(15),
    verified boolean DEFAULT false,
    PRIMARY KEY(log_id)
);

create table twitts_tbl(
	twitt_id binary(16),
    text Text(300) not null,
    img_link char(100),
    user_id binary(16) not null,
    date char(24) not null,
    replay_to_id binary(16),
    deleted boolean DEFAULT false,
    PRIMARY KEY(twitt_id),
    FOREIGN KEY (user_id) REFERENCES users_tbl(user_id),
    FOREIGN KEY (replay_to_id) REFERENCES twitts_tbl(twitt_id)
);

create table retwitters_tbl(
	user_id binary(16) not null,
    twitt_id binary(16) not null,
    FOREIGN KEY (user_id) REFERENCES users_tbl(user_id),
    FOREIGN KEY (twitt_id) REFERENCES twitts_tbl(twitt_id)
);

create table likes_tbl(
	user_id binary(16) not null,
    twitt_id binary(16) not null,
    FOREIGN KEY (user_id) REFERENCES users_tbl(user_id),
    FOREIGN KEY (twitt_id) REFERENCES twitts_tbl(twitt_id)
);

-- create table replays_to_twitt_tbl(
-- 	twitt_id binary(16) not null,
--     twitt_replay_id binary(16) not null,
--     FOREIGN KEY (twitt_id) REFERENCES twitts_tbl(twitt_id),
--     FOREIGN KEY (twitt_replay_id) REFERENCES twitts_tbl(twitt_id)
-- );

create table wait_for_register_tbl(
	phonenumber varchar(11)
);

DELIMITER //
CREATE or replace FUNCTION BIN_TO_UUID(bin BINARY(16))
RETURNS varchar(36)
BEGIN
  DECLARE hex varchar(32);
  SET hex = HEX(bin);
  RETURN LOWER(CONCAT(LEFT(hex, 8), '-', MID(hex, 9, 4), '-', MID(hex, 13, 4), '-', MID(hex, 17, 4), '-', RIGHT(hex, 12)));
END; //
DELIMITER ;


DELIMITER //
CREATE or replace FUNCTION UUID_TO_BIN(uuid varchar(36))
RETURNS BINARY(16)
BEGIN
  return UNHEX(CONCAT(REPLACE(uuid, '-', '')));
END; //
DELIMITER ;

DELIMITER //
CREATE or replace TRIGGER users_tbl_set_id_insert_trigger
BEFORE INSERT 
ON users_tbl
FOR EACH ROW
BEGIN
set NEW.user_id = UUID_TO_BIN(UUID());
END//
DELIMITER ;

DELIMITER //
CREATE or replace TRIGGER verification_log_tbl_set_id_insert_trigger
BEFORE INSERT 
ON verification_log_tbl
FOR EACH ROW
BEGIN
set NEW.log_id = UUID_TO_BIN(UUID());
END//
DELIMITER ;

DELIMITER //
CREATE or replace TRIGGER twitts_tbl_set_id_insert_trigger
BEFORE INSERT 
ON twitts_tbl
FOR EACH ROW
BEGIN
set NEW.twitt_id = UUID_TO_BIN(UUID());
END//
DELIMITER ;

create or replace view users_tbl_view
AS
select 
BIN_TO_UUID(user_id) COLLATE utf8mb4_unicode_ci as user_id,
username,
userfamily, 
phonenumber, 
national_id_number, 
verified 
from users_tbl;

create or replace view verification_log_tbl_view
AS
select 
BIN_TO_UUID(log_id) COLLATE utf8mb4_unicode_ci as log_id,
phonenumber,
code,
ip, 
device_type,  
verified 
from verification_log_tbl;

create or replace view twitts_tbl_view
AS
select 
BIN_TO_UUID(twitt_id) COLLATE utf8mb4_unicode_ci as twitt_id,
text,
img_link, 
BIN_TO_UUID(user_id) as user_id,  
date,
BIN_TO_UUID(replay_to_id) as replay_to_id,
deleted 
from twitts_tbl;

create or replace view retwitters_tbl_view
AS
select 
BIN_TO_UUID(twitt_id) COLLATE utf8mb4_unicode_ci as twitt_id,
BIN_TO_UUID(user_id) COLLATE utf8mb4_unicode_ci as user_id
from retwitters_tbl;

create or replace view likes_tbl_view
AS
select 
BIN_TO_UUID(twitt_id) COLLATE utf8mb4_unicode_ci as twitt_id,
BIN_TO_UUID(user_id) COLLATE utf8mb4_unicode_ci as user_id
from likes_tbl;

