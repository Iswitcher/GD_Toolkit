function getSettingsBySheetName(settingsSheetName){
  var sheetRange = getSheetRangeByName(settingsSheetName);
  var settings = getSettingsObject(sheetRange);
  return settings;
}

function getSettingsObject(range){
  var settings = {};
  var keyCoords     = getSettingsMarkerByName(settingsKeyName, range);
  var valueCoords   = getSettingsMarkerByName(settingsValueName, range);
  var endCoords     = getSettingsMarkerByName(settingsEndKey, range);
  
  if(keyCoords.y != valueCoords.y) {
    throw new Error("Key and value markers are on different rows.");
  }
  
  for (var i=keyCoords.y+1; i<endCoords.y; i++){
    var key   = range[i][keyCoords.x];
    if(isEmpty(key)) continue;
    
    settings[key] = range[i][valueCoords.x];
  }   
  return settings;
}

function getSettingsMarkerByName(name, array){
  if(isEmpty(name)) {
    throw new Error("Settings marker "+name+" isn't defined!");
  }
  
  var coordinates = {
    x:undefined,
    y:undefined
  };
  
  for(var i=0; i<array.length; i++){
    for(var j=0; j<array[i].length; j++){
      if(array[i][j] == name){
        coordinates.x = j;
        coordinates.y = i;
        return coordinates;
      }
    }
  }  
  throw new Error("Settings marker "+name+" not found in sheet!")  
}

function findSettingsValue(settings, key){
  if(!(key in settings)) {
    throw new Error("Settings key "+key+" is not present");
  }
  if(isEmpty(settings[key])){
    throw new Error("Setting "+key+" is empty.");
  }
  
  return settings[key]
}
