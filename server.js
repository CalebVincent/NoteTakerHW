var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();
// add environment variable (port is local)
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(express.static("public"));
app.use(express.static("db"));

// router, sends the app user to this page, reads the page

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    let allNotes;
    fs.readFile(path.join(__dirname,"/db/db.json"), function(err, data) {
        var parseData = JSON.parse(data);
        allNotes = [].concat(parseData);
        res.send(allNotes);

    })
    // var notes = res.sendFile(path.join(__dirname, "./db/db.json"));
    // return res.send(JSON.parse(notes))
});

// post, puts the information in the file
app.post("/api/notes", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newNote = req.body;
    console.log(newNote);
    const newStr = JSON.stringify(newNote);
    console.log(newStr);

    fs.readFile(path.join(__dirname, "/db/db.json"), function(err, data) {
        const allNotes = JSON.stringify(data);
        console.log(allNotes);

    })
    
    // add the json the user sent to the character array
    // fs.appendFile(path.join(__dirname, "/db/db.json"), JSON.stringify(newNote), "UTF8", (error) =>{
    // if (error) throw error;
    // });
    // return res.send(newNote);
});

//     // We then display the JSON to the users
//     res.json(newcharacter);
//   });
  

// listener
app.listen(PORT, function () {
    console.log("App listening on http://localhost:" + PORT);
});

