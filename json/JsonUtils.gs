function rangeToJsonObject(range){  
  var index = toFlatList(filterRangeDataByAnchor(range, config.mainIndexAnchor));
  var root = toFlatList(filterRangeDataByAnchor(range, config.mainRootAnchor));
  var types = toFlatList(filterRangeDataByAnchor(range, config.mainTypeAnchor));
  var keys = toFlatList(filterRangeDataByAnchor(range, config.mainKeyAnchor));
  var data = filterRangeDataByAnchor(range, config.mainDataAnchor);
  
  return result = {
    index: index,
    root: root,
    types: types,
    keys: keys,
    data: data
  }
}

function toFlatList(array){
  var result = [];
  
  for(var i=0; i<array.length; i++){
    for(var j=0; j<array[i].length; j++){
      result.push(array[i][j])
    }
  } 
  return result;
}

function createJsonObject(jsonData){
  var result = {};
  
  for(var row=0; row<jsonData.index.length; row++){
    for(var column=0; column<jsonData.keys.length; column++){
      var key = jsonData.root[row] + "/" + jsonData.keys[column];     
      result = addPropertyRecursive(result, key, jsonData.types[column], jsonData.data[row][column])
    }
  }
  return JSON.stringify(result);
}

function createJsonArray(jsonData){
  var result = [];
  return JSON.stringify(result);
}

function addPropertyRecursive(jsonObject, path, type, value){
  if(value == "") return jsonObject;
  
  const keys = path.toString().split("/");
  
  if(keys.length <= 1) { 
    addValue(jsonObject, path, type, value) 
  }
  else{
    var key = keys[0];
    keys.shift()
    if(jsonObject[key] == undefined) { 
      addValue(jsonObject, key, type, {}) 
    }
    addPropertyRecursive(jsonObject[key], keys.join("/"), type, value)
  }  
  return jsonObject
}

function addValue(jsonObject, key, type, value){
  if(value == "") return jsonObject;
  
  switch (type){
    case "object":
      jsonObject[key] = JSON.parse(value);
      break;
    case "array":
      jsonObject[key] = JSON.parse(value);
      break;
    default:
      jsonObject[key] = value;
      break;
  }
  return jsonObject;
}

function jsonFormatArguments(){
  return undefined;
}
