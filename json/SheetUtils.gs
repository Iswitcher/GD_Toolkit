function getRangeBySheetName(name){
  if(isEmpty(name)) return undefined;
  
  var range = SpreadsheetApp.getActive().getSheetByName(name)
  return range.getDataRange().getValues()
}

function filterRangeDataByAnchor(range, anchor){
  var coords = searchAnchorCoordsByName(range, anchor.name);
  coords = addAnchorOffset(coords, anchor);
  
  range = filterRangeColumns(range, coords.coordX, anchor.isRight, anchor.columns);
  range = filterRangeRows(range, coords.coordY, anchor.isDown, anchor.rows);
  return range;  
}

function searchAnchorCoordsByName(range, anchor){
  for (var y=0; y<range.length; y++){
    for (var x=0; x<range[y].length; x++){
      if(range[y][x] == anchor) {
        return { coordX:x, coordY:y }
      }
    }
  }
  return undefined;
}

function addAnchorOffset(coords, anchor){
  var offsetX = anchor.offsetX;
  var offsetY = anchor.offsetY;
  
  coords.coordX += offsetX;
  coords.coordY += offsetY;
  
  return coords;
}

function filterRangeColumns(range, start, isRight, count){
  if(isEmpty(start))   throw new Error("Column starting point not defined");
  if(isRight===undefined) isRight = true;
  if(isEmpty(count))   count = 0; //ignore limit if not defined

  var result = []
  for(var i=0; i<range.length; i++){
    if(isRight && count<1)           result.push(range[i].slice(start))
    else if(isRight && count>=1)     result.push(range[i].slice(start, start+count))
    else if(!isRight && count<1)     result.push(range[i].slice(undefined, start+1))
    else                             result.push(range[i].slice(start-count, start+1))
  }
  return result;
}

function filterRangeRows(range, start, isDown, count){
  if(isEmpty(start))   throw new Error("Column starting point not defined");
  if(isDown===undefined) isDown = true;
  if(isEmpty(count))   count = 0; //ignore limit if not defined
  
  if(isDown && count<1)           return range.slice(start)
  else if(isDown && count>=1)     return range.slice(start, start+count)
  else if(!isDown && count<1)     return range.slice(undefined, start+1)
  else                            return range.slice(start-count, start+1)
}
