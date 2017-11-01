DROP DATABASE IF EXISTS `burgers_db`;
CREATE DATABASE `burgers_db`;
USE burgers_db;

CREATE TABLE burgers
(
	id int NOT NULL AUTO_INCREMENT,
	burger_name varchar(200) NOT NULL,
	devoured bit NOT NULL DEFAULT false,
	createDate timestamp DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
);
