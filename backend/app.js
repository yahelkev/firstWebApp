const express = require('express')

const app = express()
const port = 5000

const bodyParser = require('body-parser')
var path = require('path');


app.use(bodyParser.json());
app.use('../json', express.static(path.join(__dirname, 'json')));
app.use('/', express.static(__dirname + '/'));
app.use(bodyParser.json())

var myMap = new Map()
myMap.set("name",new Map([["description", "loll"]]))
myMap.get("name").set("aoo", "hi")
console.log(myMap.get("name"))

app.get('/', (req, res) => {
	console.log(req)

  res.send('Hello World!')
})
/*
app.get('/byDescription', (req, res) => {
	console.log(req)

  res.send('YYou searched for --')
})
*/
app.post('/byDescription', function(req, res) {
  res.send('You searched for: ' + req.body.searchingFor)
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})