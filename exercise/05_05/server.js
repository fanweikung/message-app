var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var http = require("http").Server(app); // setup a node http server
var io = require("socket.io")(http); // setup socket.io to tie with express refrencing http

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var messages = [
  { name: "Tim", message: "Hi" },
  { name: "Jane", message: "Hello" },
];

app.get("/messages", (req, res) => {
  res.send(messages);
});

app.post("/messages", (req, res) => {
  messages.push(req.body);
  res.sendStatus(200);
});

// A callback for the socket connection event that will let us know whenever a new user connects.
// Check for the connection event, and we'll supply a function that takes in a socket.
io.on("connection", (socket) => {
  console.log("a user connected");
});

// listen from http instead of express; verify sock.io js is loaded in the chrome network
var server = http.listen(3000, () => {
  console.log("server is listening on port", server.address().port);
});
