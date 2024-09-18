const express = require("express");
const app = express();
const port = 3000;

app.listen(port, function () {
    console.log("sever is ready at " + port);
});

app.get("/login", function (req, res){
    res.sendFile(Path.join(__dirname, "view/login.html"));
});