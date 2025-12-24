const DBInstance = require("../db/db");
const { URL } = require("url")

const ClassController = {
    classList: (req, res) => {
        const params = new URL(req.url, `http://localhost:8000`);

        const defaultRecord = Number(params.searchParams.get("defaultRecord"));
        const currentpage = params.searchParams.get("currentpage");
        const offset = (currentpage - 1) * defaultRecord;

        const total = `select count(*) as totalcount from class`;
        const list = `select * from class limit ? offset ? `;
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
    allClass: (req, res) => {
        const allclassquery = `select * from class`;
        DBInstance.query(allclassquery, (err, result) => {
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
        });
    },
    saveClass: (req, res) => {
        let body = "";
        req.on("data", (chunks) => {
            body += chunks.toString();
        });
        req.on("end", () => {
            const data = JSON.parse(body);
            console.log("data", data);
            const insert = `INSERT INTO class (class_name) VALUES (?)`;
            DBInstance.query(insert, [data.class_name], (err) => {
                if (err) throw err.message;
                res.writeHead(201, { "content-type": "application/json" });
                res.end(JSON.stringify({
                    status: "201",
                    message: "Class saved successfully"
                }));
            });
        });
    },
    updateClass: (req, res, urlObject) => {
        const id = urlObject.searchParams.get("id");
        let body = "";
        req.on("data", (chunks) => {
            body += chunks.toString();
        });
        req.on("end", () => {
            const data = JSON.parse(body);
            console.log("data", data);
            const update = `update class set class_name=? where class_id=?`;
            DBInstance.query(update, [data.class_name, id], (err) => {
                if (err) throw err.message;
                res.writeHead(200, { "content-type": "application/json" });
                res.end(JSON.stringify({
                    status: "200",
                    message: "Class updated successfully"
                }));
            });
        });
    },
    deleteClass: (req, res, urlObject) => {
        const id = urlObject.searchParams.get("id");
        const deletequerry = `delete from class where class_id=?`
        DBInstance.query(deletequerry, [id], (err) => {
            if (err) throw err.message;
            res.writeHead(200, { "content-type": "application/json" });
            res.end(JSON.stringify({
                status: "200",
                message: "Class Deleted successfully"
            }));
        });
    }
}

module.exports = ClassController