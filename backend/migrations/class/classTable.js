const classTable = `
    CREATE TABLE IF NOT EXISTS class(
        id INT AUTO_INCREMENT PRIMARY KEY,
        class_name VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
`;

module.exports = classTable;