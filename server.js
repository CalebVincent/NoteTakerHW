var express = require("express");
var path = require("path");

var app = express();

var PORT = process.env.PORT || 8080;

// app.use(express.urlencodded({ extended: true }));
// app.use(express.json()); 


// router

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
  });

// listener

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});