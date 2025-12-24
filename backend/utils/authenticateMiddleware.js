require('dotenv').config();
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;

const authenticateMiddleware = (req, res, next) => {
    console.log("req.headers",req.headers)
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        res.writeHead(401, { "content-type": "application/json" });
        return res.end(JSON.stringify({ status: "401", message: "No token provided" }));
    }
    const token = authHeader.split(" ")[1];
    console.log("token", token);

    if (!token) {
        res.writeHead(401, { "content-type": "application/json" });
        return res.end(JSON.stringify({ status: "401", message: "Token missing" }));
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            res.writeHead(401, { "content-type": "application/json" });
            return res.end(JSON.stringify({ status: "401", message: "Invalid token" }));
        }

        req.user = decoded;
        next();
    });
};

module.exports = authenticateMiddleware;
