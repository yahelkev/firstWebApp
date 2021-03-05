const fs = require('fs')


module.exports = {
	loadData,
	searchByDesc,
	infoOnAttack,
	fs,
}

function infoOnAttack(dataBase, attackName)
{
	var result = "NOT FOUND!"
	if(dataBase.has(attackName))
	{
		result = attackName + ", "
		result += "id: " + dataBase.get(attackName).get("id") + " ; "
		result += "x_mitre_platforms: " + dataBase.get(attackName).get("x_mitre_platforms") + " ; "
		result += "x_mitre_detection: " + dataBase.get(attackName).get("x_mitre_detection") + " ; "
		result += "phase_name: " + dataBase.get(attackName).get("phase_name") + " ; "
		result += "description: " + dataBase.get(attackName).get("description") + "."

	}
	return result
}
/*
returns a map with the data it needs(description, phase_name...)
*/
function getData(parseFileData)
{
	var name_d = "NA"
	var description_d = "NA"
	var id_d = "NA"
	var x_mitre_platforms_d = "NA"
	var x_mitre_detection_d = "NA"
	var phase_name_d = "NA"

	if("name" in parseFileData)
	{
		name_d = parseFileData.name	
	}

	if("description" in parseFileData)
	{
		description_d = parseFileData.description	
	}

	if("id" in parseFileData)
	{
		id_d = parseFileData.id
	}
	
	if("x_mitre_platforms" in parseFileData)
	{
		x_mitre_platforms_d = parseFileData.x_mitre_platforms	
	}
	
	if("x_mitre_detection" in parseFileData)
	{
		x_mitre_detection_d =  parseFileData.x_mitre_detection
	}

	if("phase_name" in parseFileData)
	{
		phase_name_d = parseFileData.phase_name
	}

	return { name: name_d , id: id_d, x_mitre_platforms: x_mitre_platforms_d,
	x_mitre_detection: x_mitre_detection_d, phase_name: phase_name_d , description: description_d}
}
/*
loads the data from the files to the dataBase
*/
function loadData(dataBase, folderName)
{
	var filesNames = fs.readdirSync(folderName)
	var data = null
	var fileContent = ''
	for (var element of filesNames) {
		try{
			fileContent = fs.readFileSync(folderName + '\\' + element, 'utf-8');
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
		var newData = getData(data.objects[0])
		dataBase.insert(newData, function (err, newDocs) {
		});
	}
}
/*
serch in the dataBase and returns a string of all 
the attacks that contains the 'searchfor' in the description
*/
function searchByDesc(dataBase, searchfor, callBackFn)
{
	var result = ''
	const regex = new RegExp(searchfor, 'i') // i for case insensitive
	dataBase.find({ description: {$regex: regex} }, function (err, docs) {
		var nameList = ""
		for (var doc of docs)
		{
			//console.log(doc.name)
			nameList += doc.name + ", "
		}
		callBackFn(nameList)
	});
}