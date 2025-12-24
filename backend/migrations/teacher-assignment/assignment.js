const assignmentTable = `
CREATE TABLE IF NOT EXISTS assignteacher(
    assignment_id INT AUTO_INCREMENT PRIMARY KEY,
    teacher_id VARCHAR(50) not null,
    class_id varchar(50) not null,
    section_id varchar(50) not null,
    role varchar(50) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
)
`;

module.exports = assignmentTable;