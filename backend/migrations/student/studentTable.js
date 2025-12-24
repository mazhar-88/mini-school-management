const studentTable = `
CREATE TABLE IF NOT EXISTS student (
id INT AUTO_INCREMENT PRIMARY KEY,
student_id VARCHAR(50),
student_name VARCHAR(100),
class_id INT,
section_id INT,
roll_no VARCHAR(50),
gender VARCHAR(10),
dob DATE,
guardian_name VARCHAR(100),
guardian_cell VARCHAR(20),
address VARCHAR(255),
student_image VARCHAR(255),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP )
`;
module.exports = studentTable;