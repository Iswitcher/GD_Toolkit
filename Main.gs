function DoExport(){
  var time = new Date()
  PrintLog("Start", "Gathering main data");
  
  var schedule = GetSheetByName(mainSheetName);
  var anchors = GetMainAnchors(mainAnchors,schedule.getValues());
  var user = Session.getActiveUser().getEmail();
  
  LoopExport(schedule, anchors, user)  
  PrintLog("Finish", "Done in "+GetTimeDeltaString(time), -1);
}

function GetMainAnchors(anchors, data){
  if(anchors==undefined){ throw new Error("Anchors are not defined") }
  if(data==undefined){ throw new Error("Data is not defined") }
  
  var result = {}
  for(var anchor in anchors){
    var key     = anchor;
    var coords  = GetAnchorCoordsByName(anchors[anchor], data);
    result[key] = { "x": coords.x, "y": coords.y };
  }
  return result;
}

function LoopExport(range, anchors, user){
  PrintLog("Start", "Looping through objects");
  var objects = range.getValues();
  
  for (var row = anchors.action.y+1; row<objects.length; row++){
    if(objects[row][anchors.action.x] != true) { continue; }
    ExportObject(range, objects, row, anchors, user)
  }
}

function ExportObject(range, objects, row, anchors, user){
  PrintLog("In progress", "Exporting "+objects[row][anchors.object.x]);
  var jsonVersion = GetJsonVersion(objects, row, anchors)
  ExportToJSON(
    objects[row][anchors.object.x], 
    objects[row][anchors.path.x],
    jsonVersion,
    objects[row][anchors.method.x],
    objects[row][anchors.check.x]
  )
  UpdateLastDate(row, anchors.lastDate.x)
  UpdateLog(row, anchors.log.x, user, objects[row][anchors.entities.x])
}

function UpdateLastDate(row, column){
  var range = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(mainSheetName).getRange(row+1, column+1)
  var values = range.getValues()
  values[0][0] = new Date();
  range.setValues(values)
  range.getValues()
}

function UpdateLog(row, column, user, entities){
  var range = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(mainSheetName).getRange(row+1, column+1)
  var values = range.getValues()
  values[0][0] = "User "+ user + " exported " + entities + " objects.";
  range.setValues(values)
  range.getValues()
}

function GetJsonVersion(objects, row, column){
  var versionCheck  = objects[row][column.do_version.x];
  
  var versionNumber = objects[row][column.ver_number.x];
  if(IsEmpty(versionNumber)) versionNumber = 0;
  
  if(versionCheck) {
    return UpdateJsonVersion(row, column.ver_number.x, versionNumber);
  }
  return undefined;
}

function UpdateJsonVersion(row, column, version){
  var range = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(mainSheetName).getRange(row+1, column+1)
  var values = range.getValues()
  values[0][0] = parseInt(values[0][0])+1
  range.setValues(values)
  range.getValues()
  
  return values[0][0]
}