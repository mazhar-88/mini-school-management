const DBInstance = require("../db/db");

const AssignmentController = {
    assignmentList: (req, res) => {
        const params = new URL(req.url, `http://localhost:8000`);

        const defaultRecord = Number(params.searchParams.get("defaultRecord"));
        const currentpage = params.searchParams.get("currentpage");
        const offset = (currentpage - 1) * defaultRecord;

        const total = `select count(*) as totalcount from assignteacher`;

        const list = `select assignteacher.assignment_id, assignteacher.role, assignteacher.teacher_id,teacher.name,assignteacher.class_id,class.class_name,assignteacher.section_id,
        section.section_name
        from assignteacher left join teacher on assignteacher.teacher_id =teacher.teacher_id
        INNER JOIN class ON assignteacher.class_id = class.class_id
        INNER JOIN section ON assignteacher.section_id = section.section_id limit ? offset ?
        `;
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
    saveassignment: (req, res) => {
        let body = "";
        req.on("data", (chunks) => {
            body += chunks.toString();
        });
        req.on("end", () => {
            const data = JSON.parse(body);

            const insert = `INSERT INTO assignteacher (teacher_id,class_id,section_id,role) VALUES (?,?,?,?)`;
            DBInstance.query(insert, [
                data.teacherId, data.classId, data.sectionId, data.role
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
    updateassignment: (req, res, urlObject) => {
        const id = urlObject.searchParams.get("id");
        let body = "";
        req.on("data", (chunks) => {
            body += chunks.toString();
        });
        req.on("end", () => {
            const data = JSON.parse(body);
            console.log("updatedata", data);
            console.log("idupdate", id);
            const update = `update assignteacher set 
            teacher_id=?,class_id=?,section_id=?,role=?
            where assignment_id=?`;
            DBInstance.query(update, [data.teacherId, data.classId, data.sectionId, data.role,
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
    deleteassignment: (req, res, urlObject) => {
        const id = urlObject.searchParams.get("id");
        const deletequerry = `delete from assignteacher where assignment_id=?`
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

module.exports = AssignmentController