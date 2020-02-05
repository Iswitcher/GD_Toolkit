function GetStatus(sheetName, enabledAnchor, okAnchor){
  var count = 0;
  var sheetData = SpreadsheetApp.getActiveSpreadsheet()
                            .getSheetByName(sheetName)
                            .getDataRange()
                            .getValues();
  var enabledAnchorCoords   = GetAnchorCoordsByName(enabledAnchor, sheetData);
  var okAnchorCoords        = GetAnchorCoordsByName(okAnchor, sheetData);
  for(var column=enabledAnchorCoords.x+1; column<sheetData[enabledAnchorCoords.y].length; column++){
    if(sheetData[okAnchorCoords.y][column] != "OK") count++;
  }
 if(count>0) return "❌ " + count + " Error(s)!";
 return "✔️READY";
}

function IsEmpty(data){
  if( data==undefined || data==null )   return true;
  else if( Array.isArray(data) )        return IsEmptyArray(data);
  else if( typeof data == "object" )    return IsEmptyObject(data);
  else                                  return IsEmptyString(data);
}

function IsEmptyArray(data){
  return data.length > 0 ? false : true;
}

function IsEmptyObject(data){
  for(var key in data) {
    if(data.hasOwnProperty(key)) return false;
  }
  return true;
}

function IsEmptyString(data){
  if (data == undefined || data == null || data == ""){
    return true;
  } 
  return false;
}