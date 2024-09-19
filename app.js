const express = require("express");
const path = require("path");
// --------------- bcrypt ---------------
const bcrypt = require("bcrypt");

const app = express();
const port = 3000;

// -------database connection--------
const con = require("./config/db");

// app.listen(port, function () {
//     console.log("sever is ready at " + port);
// });

app.use("/public", express.static(path.join(__dirname, "public")));

// --------for json change--------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ------------------- Login ------------------
// app.post("/login", function (req, res) {
//     const username = req.body.username;
//     const password = req.body.password;

//     if (username == "admin" && password == "1234") {
//         res.send("Login success");
//     }
//     else {
//         res.status(401).send("login failed");
//     }
//     // res.sendFile(path.join(__dirname, "view/login.html"));
// });


// ------------หน้า Login------------------
app.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname, "view/login.html"));
});

// ------------- ดึงข้อมูล Login -------------------
app.post("/login", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const sql = "SELECT user_id, user_name FROM user WHERE user_name = ? AND password = ?";

    con.query(sql, [username, password], function (err, results) {
        if (err) {
            // console.error(err);
            return res.status(500).send("Database server error");
        }
        if (results.length != 1) {
            return res.status(400).send("Wrong username or password");
        }
        bcrypt.compare(password, results[0].password, function (err, same) {
            if (err) {
                res.status(503).send("Authentication sever error");
            }
            else if (same == true) {
                res.send("/dashadmin");
            }
            else {
                res.status(400).send("Wrong password");
            }
        });


        // bcrypt.compare(password, results[0].password, function (err, same) {
        //     if (err) {
        //         return res.status(503).send("Authentication server error");
        //     }
        //     else if (same) {
        //         //correct login send destination URL to client
        //         res.status(200).send("/dashadmin");
        //     }
        //     else {
        //         //wrong password
        //         res.status(400).send("Wrong password");
        //     }
        // });
    });
});

// --------------- เช็ค Password ----------------
app.get("/password/:pass", function (req, res) {
    // const username = req.params.username;
    const password = req.params.pass;
    const saltRounds = 10; //the cost of encrypting see https://github.com/ kelektiv / node.bcrypt.js#a - note - on - rounds

    bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) {
            return res.status(500).send("Hashing error");
        }
        // const sql = "INSERT INTO user (user_name, password) VALUES (?,?)";
        // con.query(sql, [username, hash], function (err, result) {
        //     if (err) {
        //         return res.status(500).send("Database insert error");
        //     }
        //     res.send("User registered successfully");
        // });
        // return hashed password, 60 characters
        // console.log(hash.length);
        res.send(hash);
    });
});





// ------------หน้า Register---------------
app.get("/register", function (req, res) {
    res.sendFile(path.join(__dirname, "view/register.html"));
});


// ---------------------------Role User----------------------------------------
// app.post("/login", function (req, res) {
//     const username = req.body.username;
//     const password = req.body.password;
//     const sql = "SELECT id, username, role FROM user WHERE username = ? AND password = ? ";

//     con.query(sql, [username, password], function (err, results) {
//         if (err) {
//             return res.status(500).send("Database server error");
//         }
//         if (results.length != 1) {
//             return res.status(401).send("Wrong username or password");
//         }
//         res.send("Login successful");
//     });
// });

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
    res.sendFile(path.join(__dirname, "view/User/ReportUser.html"));
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

// ----------- ดึงระบบใน Dashadmin ----------------
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


app.listen(port, function () {
    console.log("Server is ready at " + port);
});