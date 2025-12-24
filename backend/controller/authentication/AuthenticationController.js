require('dotenv').config();
const jwt = require("jsonwebtoken");
const DBInstance = require("../../db/db");
const bcrypt = require("bcryptjs");

const JWT_SECRET = process.env.JWT_SECRET;

const AuthenticationController = {

    SignupController: (req, res) => {
        let body = "";
        req.on("data", (chunks) => {
            body += chunks.toString();
        });
        req.on("end", async () => {
            try {
                const data = JSON.parse(body);

                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(data.password, salt);

                const insert = `INSERT INTO users (name,email,username,password) VALUES (?,?,?,?)`;
                DBInstance.query(
                    insert,
                    [data.name, data.email, data.username, hashedPassword],
                    (err) => {
                        if (err) {
                            res.writeHead(500, { "Content-Type": "application/json" });
                            return res.end(JSON.stringify({ status: 500, message: "Server Error" }));
                        }
                        res.writeHead(201, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({
                            "status": 201,
                            "message": "User Created Successfully"
                        }))
                    }
                );
            } catch (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ "status": 500, "message": err.message }));
            }
        });
    },

    LoginController: (req, res) => {
        let body = "";
        req.on("data", (chunks) => {
            body += chunks.toString();
        });
        req.on("end", async () => {
            try {
                const data = JSON.parse(body);
                const { email, password } = data;

                const select = `SELECT id,name,email,username,password FROM users WHERE email = ?`;
                DBInstance.query(select, [email], async (err, result) => {
                    if (err) {
                        res.writeHead(500, { "Content-Type": "application/json" });
                        return res.end(JSON.stringify({ status: 500, message: "Server Error" }));
                    }
                    if (result.length === 0) {
                        res.writeHead(401, { "Content-Type": "application/json" });
                        return res.end(JSON.stringify({ status: 401, message: "Invalid Credentials" }));
                    };

                    const user = result[0];

                    const passwordMatch = await bcrypt.compare(password, user.password);
                    if (!passwordMatch) {
                        res.writeHead(401, { "Content-Type": "application/json" });
                        return res.end(JSON.stringify({ status: 401, message: "Invalid Credentials" }));
                    }
                    const token = jwt.sign(
                        { userId: user.id, email: user.email },
                        JWT_SECRET,
                        { expiresIn: '1h' }
                    );

                    user.token = token;
                    delete user.password
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({
                        "status": 200,
                        "message": "User Logged In Successfully",
                        user
                    }));
                });
            } catch (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ "status": 500, "message": err.message }));
            }
        });
    },

    LogoutController: (req, res) => {
        res.end("Hello from LogoutController");
    }
};

module.exports = AuthenticationController;
