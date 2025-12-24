const userTable = `
CREATE TABLE IF NOT EXISTS users (
    id int not null auto_increment primary key,
    name varchar(200),
    email varchar(100) unique not null,
    username varchar(100) not null,
    password varchar(200) not null,
    confirmPassword varchar(200) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
)
`;

module.exports = userTable;