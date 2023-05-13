var express = require("express");
var bodyParser = require("body-parser");

var app = express(); // run node on express backend (client -> server only)
// socket.io needs to tie in with Express
// Create a regular HTTP server with Node that will then share with Express and Socket.IO.
// Set up HTTP server:
// Add var http require then we'll use the HTTP library from Node, call .Server on the require itself and pass in our Express app
var http = require("http").Server(app);
var io = require("socket.io")(http); // Then create io and set it to require socket.io. Pass in reference to http
var mongoose = require("mongoose");

app.use(express.static(__dirname)); // tell express to use static content
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 07_02 Tell mongoose to use default ES6 Promise Library
mongoose.Promise = Promise;

var dbUrl =
  "mongodb+srv://user:user@learning-node.qallf.mongodb.net/?retryWrites=true&w=majority";

// 06_04 Use Mongoose ODM to Save and Get Data
// 07_01 07_02
// - Use Promise and Async Await to improve nested callback
// - Mongoose not loger accept call back at connect & save
// var messages = [
//   { name: "Tim", message: "Hi" },
//   { name: "Jane", message: "Hello" },
// ];
//
// app.get("/messages", (req, res) => {
//   res.send(messages);
// });

// Capital M indiciates a model
var Message = mongoose.model("Message", {
  name: String,
  message: String,
});

// use async await
app.get("/messages", async (req, res) => {
  var messages = await Message.find({});
  res.send(messages);
});

// 09_03 TDD
// - Write test case first then implement the function here
// - Replace callback with sync await
// app.get("/messages/:user", (req, res) => {
//   var user = req.params.user;
//   Message.find({ name: user }, (err, messages) => {
//     res.send(messages);
//   });
// });
app.get("/messages/:user", async (req, res) => {
  var user = req.params.user;
  var messages = await Message.find({ name: user });
  console.log(messages);
  res.send(messages);
});

// Alternatively, Use then and chanted functions
// app.get("/messages", (req, res) => {
//   var messages;
//   Message.find({}).then((messages) => {
//     res.send(messages);
//   });
// });

// app.post("/messages", (req, res) => {
//   messages.push(req.body);
//   io.emit("message", req.body);
//   res.sendStatus(200);
// });
//
// 08_01 Try Catch block
app.post("/messages", async (req, res) => {
  try {
    // Trigger the error to catch and log in console
    // throw "some error";
    var message = new Message(req.body);

    var savedMessage = await message.save();

    console.log("saved");

    var censored = await Message.findOne({ message: "badword" });

    // if (censored) await Message.remove({ _id: censored.id }); collection.remove is depreciated
    if (censored) await Message.deleteOne({ _id: censored.id });
    else io.emit("message", req.body);

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
    return console.error(error);
  } finally {
    console.log("message post called, either saved or error");
  }
});

// add io.on and we'll check for the connection event, and we'll supply a function that takes in a socket.
// And for now, let's console.log a user connected, we can see that a Socket.IO connection has successfully
// been made from the browser since we're getting a message in the connection event and we can see a user
// connected in our Console.
io.on("connection", (socket) => {
  console.log("a user connected");
});

// connect to mongoDB using mongoose
mongoose.connect(dbUrl).catch((error) => {
  console.log(error);
});

//app.listen(3000)
// dynamic reading the port
// socket.io implemntation: need to use the new http server to listen
// var server = app.listen(3000, () => {
var server = http.listen(3000, () => {
  console.log("server is listening on port", server.address().port);
});
