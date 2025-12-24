const teacherTable = `
CREATE TABLE IF NOT EXISTS teacher(
    teacher_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email varchar(100) not null unique,
    cell varchar(100) not null,
    qualification varchar(100) not null,
    gender varchar(100) not null,
    address varchar(255) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
)
`;

module.exports = teacherTable;