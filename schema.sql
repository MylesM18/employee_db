

USE employee_db;

CREATE TABLE employee (
 id INT NOT NULL AUTO_INCREMENT,
 first_name VARCHAR (100) NOT NULL,
 last_name VARCHAR (100) NOT NULL,
 title VARCHAR(100) NOT NULL,
 department VARCHAR(100) NOT NULL,
 salary INT(30) NOT NULL,
 manager VARCHAR(100) NOT NULL,
PRIMARY KEY (id)
);


INSERT INTO employee (first_name, last_name, title, department, salary, manager)
VALUES ('Myles', 'Magee', 'Sales Lead', 'Sales', 80000, 'Travis Hudson'),
('Tom', 'Ford', 'Designer', 'Fashion', 300000, 'Versace'),
('John', 'Wick', 'Assasign', 'The Matrix', 250000, 'Neo');