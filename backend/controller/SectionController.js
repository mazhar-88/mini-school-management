const DBInstance = require("../db/db")

const SectionController = {
    sectionList: (req, res) => {
        const params = new URL(req.url, `http://localhost:8000`);

        const defaultRecord = Number(params.searchParams.get("defaultRecord"));
        const currentpage = params.searchParams.get("currentpage");
        const offset = (currentpage - 1) * defaultRecord;

        const total = `select count(*) as totalcount from section`;

        const list = `
        select section.section_id,section.section_name,class.class_name,class.class_id
        from section inner join class on section.class_id=class.class_id limit ? offset ? `;
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
                console.log("result", result)
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
    getAllSection: (req, res) => {
        const querry = `select * from section`;
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
    selectedSection: (req, res, urlObject) => {
        const id = urlObject.searchParams.get("id");
        const selectedList = `select * from section where class_id=?`;
        DBInstance.query(selectedList, [id], (err, result) => {
            if (err) throw err;
            res.writeHead(200, { "content-type": "application/json" });
            res.end(JSON.stringify({
                "status": "200",
                "message": "data feteched succesffulyy",
                "data": result
            }));
        })
    },
    savesection: (req, res) => {
        let body = "";
        req.on("data", (chunks) => {
            body += chunks.toString();
        });
        req.on("end", () => {
            const data = JSON.parse(body);
            console.log("data", data);
            const insert = `INSERT INTO section (section_name,class_id) VALUES (?,?)`;
            DBInstance.query(insert, [data.section_name, data.class_id], (err) => {
                if (err) throw err.message;
                res.writeHead(201, { "content-type": "application/json" });
                res.end(JSON.stringify({
                    status: "201",
                    message: "section saved successfully"
                }));
            });
        });
    },
    updatesection: (req, res, urlObject) => {
        const id = urlObject.searchParams.get("id");
        let body = "";
        req.on("data", (chunks) => {
            body += chunks.toString();
        });
        req.on("end", () => {
            const data = JSON.parse(body);
            console.log("data", data);
            const update = `update section set section_name=? where section_id=?`;
            DBInstance.query(update, [data.section_name, id], (err) => {
                if (err) throw err.message;
                res.writeHead(200, { "content-type": "application/json" });
                res.end(JSON.stringify({
                    status: "200",
                    message: "section updated successfully"
                }));
            });
        });
    },
    deletesection: (req, res, urlObject) => {
        const id = urlObject.searchParams.get("id");
        const deletequerry = `delete from section where section_id=?`
        DBInstance.query(deletequerry, [id], (err) => {
            if (err) throw err.message;
            res.writeHead(200, { "content-type": "application/json" });
            res.end(JSON.stringify({
                status: "200",
                message: "section Deleted successfully"
            }));
        });
    }
}

module.exports = SectionController