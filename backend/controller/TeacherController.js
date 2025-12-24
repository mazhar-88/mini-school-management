const DBInstance = require("../db/db");

const TeacherController = {
    teacherList: (req, res) => {
        const params = new URL(req.url, `http://localhost:8000`);

        const defaultRecord = Number(params.searchParams.get("defaultRecord"));
        const currentpage = params.searchParams.get("currentpage");
        const offset = (currentpage - 1) * defaultRecord;

        const total = `select count(*) as totalcount from teacher`;
        const list = `select * from teacher limit ? offset ? `;
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
    getAllTeacher: (req, res) => {
        const querry = `select * from teacher`;
        DBInstance.query(querry, (err, result) => {
            if (err) {
                res.writeHead(500, { "content-type": "application/json" });
                res.end(JSON.stringify({
                    "status": "500",
                    "message": err.message,
                }));
            }
            res.writeHead(200, { "content-type": "application/json" });
            res.end(JSON.stringify({
                "status": "200",
                "message": "data feteched succesffulyy",
                "data": result
            }));
        })
    },
    saveteacher: (req, res) => {
        let body = "";
        req.on("data", (chunks) => {
            body += chunks.toString();
        });
        req.on("end", () => {
            const data = JSON.parse(body);
            console.log(data)
            const insert = `INSERT INTO teacher (name,email,cell,qualification,gender,address) VALUES (?,?,?,?,?,?)`;
            DBInstance.query(insert, [
                data.name, data.email, data.cell, data.qualification, data.gender, data.address
            ], (err) => {
                if (err) throw err.message;
                res.writeHead(201, { "content-type": "application/json" });
                res.end(JSON.stringify({
                    status: "201",
                    message: "teacher saved successfully"
                }));
            });
        });
    },
    updateteacher: (req, res, urlObject) => {
        const id = urlObject.searchParams.get("id");
        let body = "";
        req.on("data", (chunks) => {
            body += chunks.toString();
        });
        req.on("end", () => {
            const data = JSON.parse(body);
            const update = `update teacher set 
            name=?,email=?,cell=?,qualification=?,gender=?,address=?
            where teacher_id=?`;
            DBInstance.query(update, [data.name, data.email, data.cell, data.qualification,
            data.gender, data.address,
                id], (err) => {
                    if (err) throw err.message;
                    res.writeHead(200, { "content-type": "application/json" });
                    res.end(JSON.stringify({
                        status: "200",
                        message: "teacher updated successfully"
                    }));
                });
        });
    },
    deleteteacher: (req, res, urlObject) => {
        const id = urlObject.searchParams.get("id");
        const deletequerry = `delete from teacher where teacher_id=?`
        DBInstance.query(deletequerry, [id], (err) => {
            if (err) throw err.message;
            res.writeHead(200, { "content-type": "application/json" });
            res.end(JSON.stringify({
                status: "200",
                message: "teacher Deleted successfully"
            }));
        });
    }
}

module.exports = TeacherController