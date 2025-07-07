#CREATE DATABASE personal_task_management;
#create table User (user_id int primary key auto_increment ,user_name VARCHAR(20) NOT NULL CHECK (CHAR_LENGTH(user_name) BETWEEN 3 AND 20),email varchar(255) not null unique ,password VARCHAR(255) NOT NULL CHECK (CHAR_LENGTH(password) >= 8),phone varchar(11),address varchar(255),user_idimage VARCHAR(255));
#create table contact_us(contact_id int primary key auto_increment , user_name VARCHAR(20) NOT NULL CHECK (CHAR_LENGTH(user_name) BETWEEN 3 AND 20) , problem varchar(255) not null ,phone varchar(11),country_code VARCHAR(6),user_id int references User(user_id));
#create table Tasks(task_id int primary key auto_increment,task_name varchar(255) ,start_date date,deadline date ,description varchar(255) ,category varchar(255) ,status varchar(255) ,upload_file  varchar(255),user_id  int references user(user_id));
#alter table Tasks drop column upload_file;
#create table task_file(file_id int primary key auto_increment,upload_file varchar(255),task_id int references tasks(task_id));
#alter table tasks drop column category;
#alter table tasks modify column description text;
create table categories(categoriy_id int primary key auto_increment , categoriy varchar(255) ,task_id int references tasks(task_id));