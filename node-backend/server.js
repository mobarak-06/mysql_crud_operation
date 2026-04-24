const express = require("express");
const mysql = require("mysql2");

const app = express();
const PORT = 8000;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "user_crud_bd",
    password: "root"

})

// test route
app.get("/", (req, res) => {
  res.send("Server running ✅");
});


app.get("/api/posts", (req, res) => {

})


app.listen(PORT, () => {
    console.log(`server is running port ${PORT}`);
})
