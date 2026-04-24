const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "user_crud_bd",
    password: ""

})

// test route
app.get("/", (req, res) => {
  res.send("Server running ");
});


app.get("/api/posts", (req, res) => {
    db.query("SELECT * FROM user_info", (err, rows) => {
        if (err) return res.status(500).json({error: err.message})
        res.json(rows);
    });
})


app.listen(PORT, () => {
    console.log(`server is running port ${PORT}`);
})
