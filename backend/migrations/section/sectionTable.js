const sectionTable = `
    CREATE TABLE IF NOT EXISTS section(
        section_id INT AUTO_INCREMENT PRIMARY KEY,
        section_name VARCHAR(100),
        class_id INT NOT NULL,
        create_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp on update current_timestamp
    )
`;

module.exports = sectionTable;
