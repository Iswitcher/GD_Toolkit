//=======CONFIG=======
var mainSheetName = "###main###";
var settingsStart = "###setting###";
var dataStart     = "###data###";

var exportFlagIndex = 0;
var rootIndex  = 2;

var typesIndex = 0;
var keysIndex  = 1;
var startIndex = 2;

//========TEST========
function TestSingle(){
  ExportSingleFile();
}

function TestSeparate(){
  ExportSeparateFile();
}

//=======EXPORT======

/**
 *  Grabs "###main###" sheet and parses the contents as single json
 *
 *  @param {number} index 
 *  @return {array}
 * @customfunction
 *
 */
function ExportSingleFile() {
  var mainSheet  = ReadSheet();
  var settings   = ReadSettings(mainSheet);
  var data       = ReadData(mainSheet);
  
  var json       = {}; //TODO!
  
  var filename   = settings.filename + ".json";
  
  var fileCreate = CreateFileByPath(settings.folder, filename, json);
  return true;
}

/**
 *  Grabs "###main###" sheet and parses the contents as separate json files
 *
 *  @param {number} index 
 *  @return {array}
 * @customfunction
 *
 */
function ExportSeparateFile() {
  var mainSheet = ReadSheet();
  var settings  = ReadSettings(mainSheet);
  var data      = ReadData(mainSheet);
  
  for (var i=startIndex; i<data.length; i++){
    if(data[i][exportFlagIndex] == true && data[i][rootIndex] != ""){
      var json          = PrepareSeparateJson(data, i);
      var formattedJson = FormatJson(json)
      var filename      = data[i][rootIndex] + ".json";
      var fileCreate    = CreateFileByPath(settings.folder, filename, formattedJson);
    }    
  }  
  return true;
}

//=======JSON_UTILS=======
function FormatJson(json){
  return JSON.stringify(json, undefined, 4);
}

function PrepareSeparateJson(data, recordIndex){
  var json = {};
  
  var rootKey = data[recordIndex][rootIndex];
  json[rootKey] = {};
  
  var types  = data[typesIndex].slice(rootIndex+1);
  var keys   = data[keysIndex].slice(rootIndex+1);
  var record = data[recordIndex].slice(rootIndex+1);
  
  for(var i=0; i<record.length; i++){
    var type  = types[i];
    var key   = keys[i];
    var value = record[i];
    
    if (value == "") { continue; }
    
    if(type=="object" || type=="array"){
      json[rootKey][key] = JSON.parse(value)
    }
    else { json[rootKey][key] = value; }
  }
  
  return json;
}

//=======SHEET_UTILS========

function ReadSheet(){
  var range = SpreadsheetApp.getActive().getSheetByName(mainSheetName)
  var rangeData = range.getDataRange().getValues()
  return rangeData;
}

function ReadSettings(rangeData){
  var settings    = {}  
  var keyIndexX   = 0;
  var valueIndexX = 1;
  
  var dataStartIndexY = GetDataIndex(rangeData); 
  var data = rangeData.slice(0,dataStartIndexY);
  
  var settingsData = FillSettings(data, keyIndexX, valueIndexX);  
  return settingsData;
}

function FillSettings(data, keyIndexX, valueIndexX){
  var settings = {}
  for (var i=0; i<data.length; i++){
    if(data[i][keyIndexX] != "" && data[i][keyIndexX] != settingsStart){
      var key       = data[i][keyIndexX];
      var value     = data[i][valueIndexX];
      settings[key] = value;
    }
  }
  return settings;
}

function ReadData(rangeData){
  var dataStartIndexY = GetDataIndex(rangeData);
  return rangeData.slice(dataStartIndexY);
}

function GetDataIndex(data){
  for (var i=0; i<data.length ; i++){
    if(data[i][0] == dataStart){
      return i;
    }
  }
  return undefined;
}

//=======FILE_UTILS========

function DeleteDuplicate(filename){
  var file = DriveApp.getFilesByName(filename);
  if(file.hasNext()) { 
    file.next().setTrashed(true);
  }
  return true
}

function CreateFileByPath(path, filename, data){
  var folder = DriveApp.getFoldersByName(path);
  if(folder.hasNext()){
    DeleteDuplicate(filename);
    var file = folder.next().createFile(filename, data);
  }
  return true;
}
