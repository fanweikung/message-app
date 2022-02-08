var express = require("express")
var bodyParser = require("body-parser")
var io = require("socket.io")
var mongoose = require("mongoose")
const { sendStatus } = require("express/lib/response")
//const { MongoClient } = require('mongodb')

var app = express() // run node on express backend (client -> server only) 
/* socket.io needs to tie in with Express, and the game plan is that we'll create a regular HTTP server with Node that will then share with Express and Socket.IO. 
First let's set up that HTTP server: 
- Add var http require then we'll use the HTTP library from Node and we'll call .Server on the require itself and pass in our Express app
- Then let's create io and set it to require socket.io and we'll pass in reference to http*/
var http = require("http").Server(app)
var io = require("socket.io")(http)
/* 
mongo connection
const uri = "mongodb+srv://user:user@learning-node.qallf.mongodb.net/"
*/

/* mongoose connection */
const dbUrl = "mongodb+srv://user:user@learning-node.qallf.mongodb.net/"

// tell express to use static content
app.use(express.static(__dirname))
app.use(bodyParser.json()) // expect json 
app.use(bodyParser.urlencoded({extended: false})) // browser data

// object data model
var Message = mongoose.model('message', {
    name: String,
    message: String
})

/* no longer need the hard coded messages for get 
    TODO: why will it crash when removing the messages array??? */    
var messages = [
    {name: "Tim", message: "Hi"}, 
    {name: "Jane", message: "Hello"}
]

app.get('/messages', (req, res) => {
    /* instead of send the hard coded messages, send from mongoDB with no filter {<field>: 'value'} applied
    res.send(messages)*/
    Message.find({}, (err, messages) => {
        res.send(messages)
    })
})

app.post('/messages', (req, res) => {
    // console.log(req.body) - this should log the json data in the console from postman request for debugging
    //console.log(req.body)

    // instance of ODM
    var message = new Message(req.body)
    message.save((err) => {
        if (err)
        sendStatus(500)

        // nested callbacks
        Message.findOne({message: 'badword'}, (err, censored) => {
            if(censored){
                console.log('censored words found', censored)
                Message.remove({_id: censored.id}, (err) =>{
                    console.log('removed censored message')
                })
            }
        })

    
        // if saved to mongodb
        io.emit("message", req.body)
        messages.push(req.body)
        res.sendStatus(200)    


    })
    /*
    io.emit("message", req.body)
    messages.push(req.body) now change to put it to the messages array
    res.sendStatus(200) */
})

/* add io.on and we'll check for the connection event, and we'll supply a function that takes in a socket. And for now, let's console.log a user connected, we can see that a Socket.IO connection has successfully been made from the browser since we're getting a message in the connection event and we can see a user connected in our Console. */    
io.on("connection", (socket) => {
    console.log("a user connected")
})

/* connect to mongoDB directly instead of using mongoose 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  if (err) throw {err}
  console.log('mongo db connection')
  client.close();
}) */

/* connect to mongoDB using mongoose */
mongoose.connect(dbUrl, err => {
    if (err){console.error(`$err`)}
    console.log('connect to db using mongoose')
})

//app.listen(3000)
// dynamic reading the port
/* socket.io implemntation: need to use the new http server to listen
var server = app.listen(3000, () => {*/
var server = http.listen(3000, () => {    
    console.log(`Express server is listening on port ${server.address().port}`)
})
