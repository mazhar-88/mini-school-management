const mysql = require("mysql");

const DBInstance = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"school_system"
});

module.exports = DBInstance;


/* 
create table table_name(
id int not null auto_increment primary key
name varchar(200) not null 
email varchar(200) not null
created_at timestamp default current_timestamp
)

*/