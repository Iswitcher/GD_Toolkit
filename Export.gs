function testExport() {
  var sheet     = "⚔️inv_items";
  var path      = "//ZombieShop/default/inv_items";
  var method    = "separate";
  var check     = "OK";
  var log       = "";
  
  ExportToJSON(sheet, path, method, check, log)
  return true;
}

var exportAnchors = {
  techStart    : "###tech###",
  techEnd      : "###end_tech###",
  dataStart    : "###data###",
  dataEnd      : "###end_data###",
  dataOffset   : 1,
  dataActive   : "###enable###"
}

//Main method for exporting. Inputs paremetes and outputs single/multiple JSONs into selected directory
function ExportToJSON(sheet, path, method, check, log){
  if(check!="✔️READY") {
    throw new Error(sheet + " sheet seems to have some issues.")
  }
  var preppedJsonData = PrepareJsonDataBySheet(sheet);  
  
  switch(method){
    case "single":
      ExportSingle(sheet, path, preppedJsonData);
      break;
    case "separate":
      ExportSeparate(path, preppedJsonData);
      break;
  }
  return true;
}

//extracts sheet data by name and parses into JSON
function PrepareJsonDataBySheet(sheet){
  var sheetData               = GetSheetValuesByName(sheet);
  var filteredData            = FilterExportData(sheetData);
  var preparedJsonData        = PrepareJsonData(filteredData);
  return preparedJsonData;
}

//inputs prepared data from PrepareJsonDataBySheet() and outs a single JSON file named by sheet name
function ExportSingle(sheet, path, preppedJsonData){
  var jsonData    = {}
  for(var object in preppedJsonData){
    var key       = preppedJsonData[object].objName;
    var value     = preppedJsonData[object].jsonBody;
    jsonData[key] = value;
  }
  jsonData        = BeautifyJson(jsonData)
  var filename        = RemoveEmoji(sheet)+".json"
  CreateFile(path, filename, jsonData);
  return true;
}

//inputs prepared data from PrepareJsonDataBySheet() and outs multiple JSON files named after each object
function ExportSeparate(path, preppedJsonData){
  for(var object in preppedJsonData){
    var filename       = preppedJsonData[object].objName + ".json";
    var jsondata       = preppedJsonData[object].jsonBody
    var filedata       = {}
    filedata[filename] = jsondata
    
    filedata           = BeautifyJson(filedata)    
    CreateFile(path, filename, filedata);
  }
  return true;
}

//tries to find ###data### and ###end_data### anchors and filter out the data between them
function FilterExportData(data){
  var start                  = GetAnchorCoordsByName(exportAnchors.dataStart, data);
  var end                    = GetAnchorCoordsByName(exportAnchors.dataEnd, data);
  var enabled                = GetAnchorCoordsByName(exportAnchors.dataActive, data);
  
  var data                   = FilterActiveData(data, enabled);
  var filteredData           = FilterDataByAnchors(data, start, end);
  
  return filteredData
}

//filters out the objects with ###enable### anchor != true
function FilterActiveData(data, enabled){  
  for(var column=enabled.x+1; column<data[enabled.y].length; column++){
    if(!data[enabled.y][column]){
      for(var row=0; row<data.length; row++){
        data[row].splice(column, 1);
      }
      column--;
    }
  }
  return data
}

//filters data between ###data### and ###end_data### anchors
function FilterDataByAnchors(data, start, end){
  data.splice(end.y)
  data.splice(0, start.y+1);
  
  for(var row=0; row<data.length; row++){
    data[row].splice(0,start.x);
  }
  return data;
}

//gets all json keypath values from sheet
function GetJsonKeys(data){
  var keys = [];
  
  for(var i=1; i<data.length; i++){
    keys.push(data[i][0])
  }
  return keys;
}

//gets all json values from filtered objects
function GetObjectValues(filteredData, column){
  var values = [];
  
  for(var i=1; i<filteredData.length; i++){
    values.push(filteredData[i][column])
  } 
  return values;
}
