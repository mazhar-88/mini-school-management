require('dotenv').config();
const http = require("http");
const { URL } = require("url");
const fs = require("fs");
const path = require("path");
const routeMapping = require("./routes/routes.js");

const PORT = process.env.PORT || 8000;

const server = http.createServer((req, res) => {

    const urlObject = new URL(req.url, `http://localhost:${PORT}`);
    const pathname = urlObject.pathname;
    
    if (pathname.startsWith("/uploads/")) {
        const decodedPath = decodeURIComponent(pathname);
        const filePath = path.join(__dirname, decodedPath);
        console.log("filePath", filePath)
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err.message)
                res.writeHead(404);
                return res.end("Image not found");
            }

            const ext = path.extname(filePath);
            const contentTypeMap = {
                ".png": "image/png",
                ".jpg": "image/jpeg",
                ".jpeg": "image/jpeg",
                ".gif": "image/gif"
            };

            res.writeHead(200, {
                "Content-Type": contentTypeMap[ext] || "application/octet-stream"
            });
            res.end(data);
        });
        return;
    }


    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method == "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }
    routeMapping(req, res, urlObject);
});

module.exports = server;
