const Busboy = require("busboy");
const path = require("path");
const DBInstance = require("../db/db")
const fs = require("fs");
const validateRequiredField = require("../middlewares/validateRequiredFields");

const StudentController = {
    studentList: (req, res) => {


        const params = new URL(req.url, `http://localhost:8000`);

        const defaultRecord = Number(params.searchParams.get("defaultRecord"));
        const currentpage = params.searchParams.get("currentpage");

        const requiredFields = ["defaultRecord", "currentpage"];
        let queryData = {
            defaultRecord: params.searchParams.get("defaultRecord"),
            currentpage: params.searchParams.get("currentpage")
        };

        const errors = validateRequiredField(queryData, requiredFields);
        if (errors.length > 0) {
            return res.writeHead(400, { "content-type": "application/json" }) &&
                res.end(JSON.stringify({ status: 400, message: errors }));
        }

        const offset = (currentpage - 1) * defaultRecord;

        const total = `select count(*) as totalcount from student`;
        const list = `select 
        student.id,
        student.student_id,
        student.student_name,
        student.roll_no,
        student.gender,
        student.dob,
        student.guardian_name,
        student.guardian_cell,
        student.student_image,
        class.class_name,
        section.section_name
        from student
        left join class on student.class_id = class.class_id
        left join section on student.section_id = section.section_id
        limit ? offset ?`;
        DBInstance.query(total, (err, total) => {
            if (err) {
                res.writeHead(500, { "content-type": "application/json" });
                res.end(JSON.stringify({
                    "status": "500",
                    "message": err.message,
                }));
            }

            DBInstance.query(list, [defaultRecord, offset], (err, result) => {
                if (err) throw err;
                res.writeHead(200, { "content-type": "application/json" });
                res.end(JSON.stringify({
                    "status": "200",
                    "message": "data feteched succesffulyy",
                    "total": total[0].totalcount,
                    "data": result
                }));
            })
        })

    },
    savestudent: (req, res) => {
        const requiredFields = ["studentId", "name", "classId", "sectionId", "rollno", "gender",
            "dob", "guardianname", "guardiancell", "image"
        ];

        const busboy = Busboy({ headers: req.headers });
        let fields = {};
        let filePath = "";
        let imagePath = "";

        busboy.on("file", (fieldname, file, name) => {
            const uploadDir = path.join(__dirname, "../uploads/students");
            if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

            const safeName = Date.now() + "_" + name.filename;

            filePath = path.join(uploadDir, safeName);

            imagePath = `students/${safeName}`
            const fstream = fs.createWriteStream(filePath);
            file.pipe(fstream);
            fields[fieldname] = imagePath;
        });

        busboy.on("field", (fieldname, val) => {
            fields[fieldname] = val;
        });

        busboy.on("finish", () => {
            const errors = validateRequiredField(fields, requiredFields);
            if (errors.length > 0) {
                return res.writeHead(400, { "content-type": "application/json" }) &&
                    res.end(JSON.stringify({ status: 400, message: errors }));
            }
            const insert = `
          INSERT INTO student
          (student_id, student_name, class_id, section_id, roll_no, gender, dob,
           guardian_name, guardian_cell, student_image)
          VALUES (?,?,?,?,?,?,?,?,?,?)
        `;

            DBInstance.query(insert, [
                fields.studentId,
                fields.name,
                fields.classId,
                fields.sectionId,
                fields.rollno,
                fields.gender,
                fields.dob,
                fields.guardianname,
                fields.guardiancell,
                imagePath
            ], (err) => {
                if (err) throw err;

                res.end(JSON.stringify({
                    status: 201,
                    message: "Student saved successfully"
                }));
            });
        });
        req.pipe(busboy);
    },

    updatestudent: (req, res, urlObject) => {
        const requiredFields = ["studentId", "name", "classId", "sectionId", "rollno", "gender",
            "dob", "guardianname", "guardiancell"
        ];
        const id = urlObject.searchParams.get("id");
        if (!id) {
            return res.writeHead(400, { "content-type": "application/json" }) &&
                res.end(JSON.stringify({
                    status: 400,
                    message: ["id is required"]
                }));
        }

        const busboy = Busboy({ headers: req.headers });
        let fields = {};
        let imagePath = "";


        busboy.on("file", (fieldname, file, name) => {
            const uploadDir = path.join(__dirname, "../uploads/students");
            if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

            const safeName = Date.now() + "_" + name.filename;
            filePath = path.join(uploadDir, safeName);
            imagePath = `students/${safeName}`;

            const fstream = fs.createWriteStream(filePath);
            file.pipe(fstream);
            if (imagePath) {
                requiredFields.push("image");
                fields[fieldname] = imagePath;
            }
        });

        busboy.on("field", (fieldname, val) => {
            fields[fieldname] = val;
        });

        busboy.on("finish", () => {

            // console.log("imagePath", imagePath)


            const errors = validateRequiredField(fields, requiredFields);
            if (errors.length > 0) {
                return res.writeHead(400, { "content-type": "application/json" }) &&
                    res.end(JSON.stringify({
                        status: 400,
                        message: errors
                    }));
            }
            let sql;
            let params;

            if (imagePath) {
                sql = `
                UPDATE student 
                SET student_id=?, student_name=?, class_id=?, section_id=?, roll_no=?, gender=?, 
                dob=?, guardian_name=?, guardian_cell=?, student_image=?
                WHERE id=?
            `;
                params = [
                    fields.studentId,
                    fields.name,
                    fields.classId,
                    fields.sectionId,
                    fields.rollno,
                    fields.gender,
                    fields.dob,
                    fields.guardianname,
                    fields.guardiancell,
                    imagePath,
                    id
                ];
            } else {
                sql = `
                UPDATE student 
                SET student_id=?, student_name=?, class_id=?, section_id=?, roll_no=?, gender=?, 
                dob=?, guardian_name=?, guardian_cell=?
                WHERE id=?
            `;
                params = [
                    fields.studentId,
                    fields.name,
                    fields.classId,
                    fields.sectionId,
                    fields.rollno,
                    fields.gender,
                    fields.dob,
                    fields.guardianname,
                    fields.guardiancell,
                    id
                ];
            }

            DBInstance.query(sql, params, (err) => {
                if (err) throw err;

                res.writeHead(201, { "content-type": "application/json" });
                res.end(JSON.stringify({
                    status: 201,
                    message: "Student updated successfully"
                }));
            });

        });

        req.pipe(busboy);
    },

    deletestudent: (req, res, urlObject) => {
        const id = urlObject.searchParams.get("id");
        const queryData = { id };
        const errors = validateRequiredField(queryData, ["id"]);
        if (errors.length > 0) {
            return res.writeHead(400, { "content-type": "application/json" }) &&
                res.end(JSON.stringify({ status: 400, message: errors }));
        }


        const deletequerry = `delete from student where id=?`
        DBInstance.query(deletequerry, [id], (err) => {
            if (err) throw err.message;
            res.writeHead(200, { "content-type": "application/json" });
            res.end(JSON.stringify({
                status: "200",
                message: "student Deleted successfully"
            }));
        });
    }
}

module.exports = StudentController