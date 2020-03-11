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
  if (data == undefined || data == null || data === ""){
    return true;
  } 
  return false;
}

function PrintLog(title, msg){
  var defaultDuration = 5;
  SpreadsheetApp.getActiveSpreadsheet().toast(msg, title, defaultDuration)
}

function GetTimeDeltaString(time){
  var delta = new Date() - time;
  return delta/1000+"s";
}