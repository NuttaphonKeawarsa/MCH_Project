const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");

// -------database connection--------
const con = require("./config/db");

const app = express();
app.use("/public", express.static(path.join(__dirname, "public")));

// --------for json change--------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;
app.listen(port, function () {
    console.log("Server is ready at " + port);
});



// ------------หน้า Login------------------
app.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname, "view/login.html"));
});

// ------------หน้า Register---------------
app.get("/register", function (req, res) {
    res.sendFile(path.join(__dirname, "view/register.html"));
});

// ---------------------------Role Admin----------------------------------------
// ------------หน้า DashAdmin---------------
app.get("/dashadmin", function (_req, res) {
    res.sendFile(path.join(__dirname, "view/Admin/DashAdmin.html"));
    // const sql = "SELECT * FROM ระบบงานหลัก";
    // con.query(sql, function (err, results) {
    //     if (err) {
    //         console.error(err);
    //         return res.status(500).send("Database server error");
    //     }
    //     res.json(results);
    // });
});

app.get("/data", function (_req, res) {
    const sql = "SELECT * FROM ระบบงานหลัก";
    con.query(sql, function (err, results) {
        if (err) {
            console.error(err);
            return res.status(500).send("Database server error");
        }
        res.json(results);
    });
});
// ------------หน้า RequestAdmin---------------
app.get("/requestadmin", function (req, res) {
    res.sendFile(path.join(__dirname, "view/Admin/Request.html"));
});

// ------------หน้า ReportAdmin---------------
app.get("/reportadmin", function (req, res) {
    res.sendFile(path.join(__dirname, "view/Admin/ReportAdmin.html"));
});

// ------------หน้า Report2Admin---------------
app.get("/report2admin", function (req, res) {
    res.sendFile(path.join(__dirname, "view/Admin/Report2Admin.html"));
});

// ---------------------------Role User----------------------------------------
// ------------หน้า DashUser1---------------
app.get("/dashuser1", function (req, res) {
    res.sendFile(path.join(__dirname, "view/User/DashUser1.html"));
});

// ------------หน้า DashUser2---------------
app.get("/dashuser2", function (req, res) {
    res.sendFile(path.join(__dirname, "view/User/DashUser2.html"));
});

// ------------หน้า StatusUser---------------
app.get("/statususer", function (req, res) {
    res.sendFile(path.join(__dirname, "view/User/StatusUser.html"));
});

// ------------หน้า ReportUser---------------
app.get("/reportuser", function (req, res) {
    res.sendFile(path.join(__dirname, "view/User/StatusUser.html"));
});

