const server = require("./server");
const DBInstance = require("./db/db")
const mastermigration = require("./migrations/mastermigration");

const PORT = 8000;
DBInstance.connect(err => {
    if (err) throw err;
    console.log("DB Connected");
    mastermigration()
    server.listen(PORT, () => {
        console.log("Server running on http://localhost:" + PORT);
    });
});


