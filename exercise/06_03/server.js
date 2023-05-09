var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var mongoose = require("mongoose");

app.use(express.static(__dirname));
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
// TODO: TypeError: Message.remove is not a function
app.post("/messages", async (req, res) => {
  var message = new Message(req.body);

  var savedMessage = await message.save();

  console.log("saved");

  var censored = await Message.findOne({ message: "badword" });

  // if (censored) await Message.remove({ _id: censored.id }); collection.remove is depreciated
  if (censored) await Message.deleteOne({ _id: censored.id });
  else io.emit("message", req.body);

  res.sendStatus(200);

  // .catch((err) => {
  //     res.sendStatus(500)
  //     return console.error(err)
  // })
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

mongoose.connect(dbUrl).catch((error) => {
  console.log(error);
});

var server = http.listen(3000, () => {
  console.log("server is listening on port", server.address().port);
});
