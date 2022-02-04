var express = require("express")

var app = express()

// tell express to use static content
app.use(express.static(__dirname))

//app.listen(3000)

var server = app.listen(3000, () => {
    console.log(`Express server is listening on port ${server.address().port}`)
})
