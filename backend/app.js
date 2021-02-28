const handleDataBase = require('./handleDataBase.js');

const express = require('express')
const app = express()
const port = 5000

const attcks_folder = '../attack-pattern'

//so it can  read the requests
app.use(express.json());


var allAttacks = new Map()
handleDataBase.loadData(allAttacks, attcks_folder)
//console.log(handleDataBase.searchByDesc(allAttacks, ""))
console.log(allAttacks.size)


app.post('/byDescription', function(req, res) {
	res.send(handleDataBase.searchByDesc(allAttacks,(req.body["searchingFor"])))
	console.log("Searching for: ", req.body["searchingFor"])
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})