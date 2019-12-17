function createJsonObject(jsonData, indexFilter){
  var result = {};
  
  for(var row=0; row<jsonData.index.length; row++){
    if(indexFilter != undefined && jsonData.index[row] != indexFilter) continue;
    
    for(var column=0; column<jsonData.keys.length; column++){
      var key = addRootToPath(jsonData.root[row], jsonData.keys[column]);
      result = addPropertyRecursive(result, key, jsonData.types[column], jsonData.data[row][column])
    }
  }
  return JSON.stringify(result);
}

function createJsonArray(jsonData, indexFilter){
  var result = [];
  for(var row=0; row<jsonData.index.length; row++){
    if(indexFilter != undefined && jsonData.index[row] != indexFilter) continue;
    
    var object = {}
    for(var column=0; column<jsonData.keys.length; column++){
      var key = addRootToPath(jsonData.root[row], jsonData.keys[column]);
      object = addPropertyRecursive(object, key, jsonData.types[column], jsonData.data[row][column])
    }
    result.push(object);
  }
  return JSON.stringify(result);
}

function addRootToPath(root, key){
  if(!isEmpty(root)){
    return root + "/" + key;
  }
  else{
    return key;
  }
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