const fs = require('fs')


module.exports = {
	loadData,
	searchByDesc,
}
/*
returns a map with the data it needs(description, phase_name...)
*/
function getData(parseFileData)
{
	var dataMap = new Map()
	if("description" in parseFileData)
	{
		dataMap.set('description', parseFileData.description)	
	}
	else {	dataMap.set('description', "NA")}

	if("id" in parseFileData)
	{
		dataMap.set('id', parseFileData.id)	
	}
	else {	dataMap.set('id', "NA")	}
	
	if("x_mitre_platforms" in parseFileData)
	{
		dataMap.set('x_mitre_platforms', parseFileData.x_mitre_platforms)	
	}
	else {	dataMap.set('x_mitre_platforms', "NA")	}
	
	if("x_mitre_detection" in parseFileData)
	{
		dataMap.set('x_mitre_detection', parseFileData.x_mitre_detection)	
	}
	else {	dataMap.set('x_mitre_detection', "NA")	}

	if("phase_name" in parseFileData)
	{
		dataMap.set('phase_name', parseFileData.phase_name)	
	}
	else {	dataMap.set('phase_name', "NA")	}

	return dataMap
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
		fileContent = fs.readFileSync(folderName + '\\' + filesNames[0], 'utf-8');
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
	var result = ''
	for (var entry of dataBase.entries())
	{
		var key = entry[0],
			value = entry[1];
		if(value.get("description").toLowerCase().includes(searchfor.toLowerCase()))
		{
			result += key
		}	
	}
	return result
}