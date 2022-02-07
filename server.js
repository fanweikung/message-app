var express = require("express")
var bodyParser = require("body-parser")

var app = express()

// tell express to use static content
app.use(express.static(__dirname))
app.use(bodyParser.json()) // expect json 
app.use(bodyParser.urlencoded({extended: false})) // browser data

var messages = [
    {name: "Tim", message: "Hi"}, 
    {name: "Jane", message: "Hello"}
]

app.get('/messages', (req, res) => {
    res.send(messages)
})

app.post('/messages', (req, res) => {
    // console.log(req.body) - this should log the json data in the console from postman request for debugging
    //console.log(req.body)
    messages.push(req.body) // now change to put it to the messages array
    res.sendStatus(200)
})
//app.listen(3000)
// dynamic reaing the port
var server = app.listen(3000, () => {
    console.log(`Express server is listening on port ${server.address().port}`)
})
