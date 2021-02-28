const fs = require('fs')


module.exports = {
	loadData,
	searchByDesc,
}
/*
returns a map with the data it needs(description, phase_name...)
*/
function getData(jsonfileData)
{
	return new Map([["description", "loll"]])
}
/*
loads the data from the files to the dataBase
*/
function loadData(dataBase, folderName)
{
	var filesNames = fs.readdirSync(folderName)
	fs.readFile(folderName + '\\' + filesNames[0], 'utf-8', (err, jsonString) => {
		if (err) {
			console.log(err)
		}
		else{
			try{
				const data = JSON.parse(jsonString)
				if("name" in data.objects[0])
				{
					dataBase.set("data.objects[0].name", getData())
					console.log(data.objects[0].name, "hayy" , " *adedd*")		
				}
			}
			catch (err) {
				console.log('Error parsing Json', err)
			}
		}
	})
	//dataBase.set("name",getData())
}
/*
serch in the dataBase and returns a string of all 
the attacks that contains the 'searchfor' in the description
*/
function searchByDesc(dataBase,searchfor)
{
	return "abcdefg".toLowerCase().includes(searchfor.toLowerCase())
}