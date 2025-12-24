const DBInstance = require("../db/db");
const userTable = require("./authentication/signup");
const classTable = require("./class/classTable");
const sectionTable = require("./section/sectionTable");
const studentTable = require("./student/studentTable");
const assignmentTable = require("./teacher-assignment/assignment");
const teacherTable = require("./teacher/teacherTable");

const mastermigration = () => {
    const queries = [
        classTable,
        teacherTable,
        sectionTable,
        studentTable,
        userTable,
        assignmentTable
    ];

    queries.forEach(sql => {
        DBInstance.query(sql, (err) => {
            if (err) throw err;
        });
    });
};

module.exports = mastermigration;