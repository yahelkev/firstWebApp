const handleDataBase = require('./handleDataBase.js');

const express = require('express')
const app = express()
const port = 5000
const attcks_folder = '../attack-pattern'

handleDataBase.fs.truncate('DATA_BASE.db', 0, function(){})
const Datastore = require('nedb'); 
const allAttacks = new Datastore("DATA_BASE.db");
allAttacks.loadDatabase();


//so it can  read the requests
app.use(express.json());


handleDataBase.loadData(allAttacks, attcks_folder)


app.post('/infoOnAttack', function(req, res) {
	handleDataBase.infoOnAttack(allAttacks,(req.body["searchingFor"]), function(attackInfo){
		res.send(attackInfo)
	})
	console.log("info Attack: ", req.body["searchingFor"])
})

app.post('/byDescription', function(req, res) {
	handleDataBase.searchByDesc(allAttacks,(req.body["searchingFor"]), function(namelist){
		res.send(namelist)
	})	
	console.log("Searching for: ", req.body["searchingFor"])
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})