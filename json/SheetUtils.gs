function getSheetRangeByName(name){
  if(isEmpty(name)) return undefined;
  
  var range = SpreadsheetApp.getActive().getSheetByName(name)
  var rangeData = range.getDataRange().getValues()
  return rangeData;
}
