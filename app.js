const express = require("express");
const path = require("path");
const app = express();

const port = 3000;
app.listen(port, function(){
    console.log("Server is ready at " + port);
});

app.use("/public", express.static(path.join(__dirname, "public")));

// ------------หน้า Login------------------
app.get("/login", function (req, res){
    res.sendFile(path.join(__dirname, "view/login.html"));
});

// ------------หน้า Register---------------
app.get("/register", function (req, res){
    res.sendFile(path.join(__dirname, "view/register.html"));
});

// ---------------------------Role Admin----------------------------------------
// ------------หน้า DashAdmin---------------
app.get("/dashadmin", function (req, res){
    res.sendFile(path.join(__dirname, "view/Admin/DashAdmin.html"));
});

// ------------หน้า RequestAdmin---------------
app.get("/requestadmin", function (req, res){
    res.sendFile(path.join(__dirname, "view/Admin/Request.html"));
});

// ------------หน้า ReportAdmin---------------
app.get("/reportadmin", function (req, res){
    res.sendFile(path.join(__dirname, "view/Admin/ReportAdmin.html"));
});

// ------------หน้า Report2Admin---------------
app.get("/report2admin", function (req, res){
    res.sendFile(path.join(__dirname, "view/Admin/Report2Admin.html"));
});

// ---------------------------Role User----------------------------------------
// ------------หน้า DashUser1---------------
app.get("/dashuser1", function (req, res){
    res.sendFile(path.join(__dirname, "view/User/DashUser1.html"));
});

// ------------หน้า DashUser2---------------
app.get("/dashuser2", function (req, res){
    res.sendFile(path.join(__dirname, "view/User/DashUser2.html"));
});

// ------------หน้า StatusUser---------------
app.get("/statususer", function (req, res){
    res.sendFile(path.join(__dirname, "view/User/StatusUser.html"));
});

// ------------หน้า ReportUser---------------
app.get("/reportuser", function (req, res){
    res.sendFile(path.join(__dirname, "view/User/StatusUser.html"));
});

