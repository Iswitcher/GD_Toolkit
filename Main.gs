var mainSheetName = "Main"

var mainAnchors = {
  action     : "#ACTION",
  object     : "#OBJECT",
  path       : "#PATH",
  method     : "#METHOD",
  check     : "#CHECK",
  last_date  : "#LAST_DATE",
  log        : "#LOG"
}

function DoExport(){
  var objects = GetObjects(mainSheetName, mainAnchors);
  for(var object in objects){
    ExportToJSON(
      objects[object].object, 
      objects[object].path, 
      objects[object].method,
      objects[object].check,
      objects[object].log
    )
  }
}

function GetObjects(sheetName, mainAnchors){
  var sheetData =  GetSheetValuesByName(sheetName);
  var anchors = GetMainAnchors(mainAnchors, sheetData);
  var exportObjects = GetExportObject(sheetData, anchors)
  
  return exportObjects;
}

function GetMainAnchors(anchors, data){
  var result = {}
  for(var anchor in anchors){
    var key     = anchor;
    var coords  = GetAnchorCoordsByName(anchors[anchor], data);
    
    result[key] = {
      "id"      :anchors[anchor],
      "x"       :coords.x,
      "y"       :coords.y
    };
  }
  return result;
}

function FilterMainSheetDataByRow(data, row){
  return data.splice(0, row);
}

function GetExportObject(data, anchors){
  var result = [];
  
  for(var row in data){
    if(row <= anchors.action.y) continue;
    if(data[row][anchors.action.x] != true) continue;
    if(data[row][anchors.action.x] == true && IsEmpty(data[row][anchors.object.x])) continue;
    var object = {}
    for(var anchor in anchors){
      var key     = anchor
      var value   = data[row][anchors[anchor].x];
      object[key] = value;
    }
    result.push(object)
  }
  return result;
}

function GetSheetLastUpdateDate(sheetName){
  return undefined; //TODO
}

function PostLog(sheetName){
  return undefined; //TODO
}