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
	var data = null
	var fileContent = ''
	try{
		fileContent += fs.readFileSync(folderName + '\\' + filesNames[0], 'utf-8');
	}
	catch(err) {
		console.log('Error reading file: ', err)
	}
	try{
		data = JSON.parse(fileContent)
	}
	catch (err) {
		console.log('Error parsing Json: ', err)
	}
		if("name" in data.objects[0])
		{
			dataBase.set(data.objects[0].name, getData(data.objects[0]))	
		}
}
/*
serch in the dataBase and returns a string of all 
the attacks that contains the 'searchfor' in the description
*/
function searchByDesc(dataBase,searchfor)
{
	return "abcdefg".toLowerCase().includes(searchfor.toLowerCase())
}