function DoExport(){
  var time = new Date()
  PrintLog("Start", "Gathering main data");
  
  var schedule = GetSheetByName(mainSheetName);
  var anchors = GetMainAnchors(mainAnchors,schedule.getValues());
  var user = Session.getActiveUser().getEmail();
  
  LoopExport(schedule, anchors, user)  
  PrintLog("Finish", "Done in "+GetTimeDeltaString(time));
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
  ExportToJSON(
    objects[row][anchors.object.x], 
    objects[row][anchors.path.x], 
    objects[row][anchors.method.x],
    objects[row][anchors.check.x]
  )
  UpdateLastDate(range, row, anchors.lastDate.x)
  UpdateLog(range, row, anchors.log.x, user, objects[row][anchors.entities.x])
}

function UpdateLastDate(range, row, column){
  var values = range.getValues();
  values[row][column] = new Date();
  range.setValues(values)
  range.getValues()
}

function UpdateLog(range, row, column, user, entities){
  var values = range.getValues();
  values[row][column] = "User "+ user + " uploaded " + entities + " objects.";
  range.setValues(values)
  range.getValues()
}