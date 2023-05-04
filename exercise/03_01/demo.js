var fs = require("fs"); // require library
var data = require("./data.json"); // require the file directly

console.log(data.name); // verified data is an object

fs.readFile("./data.json", "utf-8", (err, data) => {
  var data = JSON.parse(data); // convert from String to Object
  console.log(data);
  console.log(data.name);
});
