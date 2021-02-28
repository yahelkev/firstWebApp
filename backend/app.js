const express = require('express')

const app = express()
const port = 5000

app.use(express.json());


var myMap = new Map()
myMap.set("name",new Map([["description", "loll"]]))
myMap.get("name").set("aoo", "hi")
console.log(myMap.get("name"))

app.post('/byDescription', function(req, res) {
	res.send(req.body["searchingFor"])
	console.log(req.body["searchingFor"])
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})