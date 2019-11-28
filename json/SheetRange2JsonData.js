/**
 *  Makes JSON string human-readable
 *
 *  @param {string} json {"type": "blah", "value": 123}
 *  @return {string}
 *  @customfunction
 */
function beautifyJson(data){
  var parsedJson = JSON.parse(data)
  return JSON.stringify(parsedJson, jsonFormatArguments(), 2);
}

function jsonFormatArguments(){
  return undefined;
}

/**
 *  Returns parsed JSON array or object with parameters
 *
 *  @param {string} objectType "array"
 *  @param {string} key "dummy_1"
 *  @param {string} types 
 *                  [
 *                    ["string", "number", "array", "object"]
 *                  ]
 *  @param {string} headers 
 *                  [
 *                    ["name", "id", "levels", "props"]
 *                  ]
 *  @param {string} data 
 *                  [
 *                    ["dummy_1", "1", [1,2,3], {"type": "blah"}],
 *                    ["dummy_2", "2", [4,5,6], {"type": "blah"}]
 *                  ]
 *  @return {array} Parsed JSON array or object with parameters
 * @customfunction
 *
 */
function convertToJsonData(objectType, key, types, headers, data){
  var result = "";
  
  switch (objectType) {
    case "object": 
      result = fillObject(key, types[0], headers[0], data);
      break;
    case "array":
      result = fillArray(key, types[0], headers[0], data);
      break;
  }
  return JSON.stringify(result);
}

//Outputs array of unnamed objects. Object parameters are picked from single data row.
function fillArray(key, types, headers, data){
  var result = [];
  var root = findRootIndex(types);
  
  for(var i=0; i<data.length; i++){
    if(data[i][root] != key) continue;
    
    var obj = fillObjectProperties({}, root, types, headers, data[i])
    result.push(obj);
  } 
  return result;
}

//Outputs single object with parameters from full data array, matched by key
function fillObject(key, types, headers, data){
  var result = {};
  var root = findRootIndex(types);
  
  for(var i=0; i<data.length; i++){
    if(data[i][root] != key) { continue; }
    result = fillObjectProperties(result, root, types, headers, data[i])
  }
  return result;
}

//==========ADD_NODES_AND_DATA==========

function fillObjectProperties(jsonObject, root, types, headers, data){
  for(var i=0; i<headers.length; i++){
    if( i==root ) continue;
    if( isEmpty(types[i], data[i]) ) continue; 
    
    jsonObject = addPropertyRecursive(jsonObject, headers[i], types[i], data[i])
  }
  return jsonObject;
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

//==========UTILS==========

function findRootIndex(types){
  var root = "root"
  for(var i=0; i<types.length; i++){
    if(types[i]==root){ return i}
  }
  return 0;
}

function isEmpty(type, data){
  if(data == "") return true;
  
  switch (type){
    case "array":
      return isEmptyArray(data);
    case "object":
      return isEmptyObject(data);
    default:
      return isEmptyString(data);
  }
}

function isEmptyArray(data){
  return data.length > 0 ? false : true;
}

function isEmptyObject(data){
  var dataEntries = Object.keys(JSON.parse(data))
  return dataEntries.length > 0 ? false : true;
}

function isEmptyString(data){
  return data.length == 0 ? true : false;
}
