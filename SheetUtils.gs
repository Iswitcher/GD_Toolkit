function GetAllSheets() {
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets()
  var output = [];
  for (var sheet in sheets){
    var sheetName = sheets[sheet].getSheetName();
    //sheetName = RemoveEmoji(sheetName);
    output.push(sheetName);
  }
  return output;
}

function RemoveEmoji(text){
  var re = /[^a-zA-Z0-9_]+/g
  return text.replace(re,"") 
}

function GetSheetValuesByName(name){
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name)
  
  if(sheet == undefined) throw new Error("Sheet '"+name+"' was not found.");
  else return sheet.getDataRange().getValues();
}

function GetAnchorCoordsByName(anchor, data){
  var coords = { x: 0, y: 0 }
  
  for(var row=0; row<data.length; row++){
    for(var column=0; column<data[row].length; column++){
      if(data[row][column] == anchor){
        coords.x = column;
        coords.y = row;  
      }
    }
  }
  return coords;
}
