/**
 *  Makes JSON string human-readable
 *
 *  @param {string} json {"type": "blah", "value": 123}
 *  @return {string}
 *  @customfunction
 */
function BeautifyJson(json){
  return JSON.stringify(JSON.parse(json), JsonStringArguments(), 2);
}

function JsonStringArguments(){
  return undefined
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
function ConvertToJsonData(objectType, key, types, headers, data){
  if(objectType == "object"){
    var json = FillObject(key, types[0], headers[0], data);
  }
  else if(objectType == "array"){
    var json = FillArray(key, types[0], headers[0], data);
  }
  return JSON.stringify(json);
}

function IsEmptyObject(json){
  for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
  return true;
}

function IsEmptyArray(json){
  if(json.length > 1) { return false; }
  return true;
}

function FillArray(key, types, headers, data){
  var json = [];
  var root = FindRootIndex(types);
  
  for(var i=0; i<data.length; i++){
    if(data[i][root] != key) { continue; }
    var obj = FillObjectProperties({}, root, types, headers, data[i])
    json.push(obj);
  } 
  return json;
}

function FillObject(key, types, headers, data){
  var json = {};
  var root = FindRootIndex(types);
  
  for(var i=0; i<data.length; i++){
    if(data[i][root] != key) { continue; }
    json = FillObjectProperties(json, root, types, headers, data[i])
  }
  return json;
}

function FillObjectProperties(json, root, types, headers, data){
  for(var i=0; i<headers.length; i++){
    if(i==root){continue};
    json = AddPropertyRecursive(json, headers[i], types[i], data[i])
  }
  return json;
}

function AddPropertyRecursive(json, path, value_type, value){
  const keys = path.toString().split("/");
  if(value == "") { return json; }
  
  if(keys.length <= 1) { 
    AddValue(json, path, value_type, value) 
  }
  else{
    var key = keys[0];
    keys.shift()
    if(json[key] == undefined) { 
      AddValue(json, key, value_type, {}) 
    }
    AddPropertyRecursive(json[key], keys.join("/"), value_type, value)
  }  
  return json
}

function AddValue(json, key, value_type, value){
  if(value == "") { return json; }
  
  if(value_type == "object" || value_type == "array"){
    json[key] = JSON.parse(value)
  }
  else { 
    json[key] = value; 
  }
  
  return json;
}

function FindRootIndex(types){
  var root = "root"
  for(var i=0; i<types.length; i++){
    if(types[i]==root){ return i}
  }
  return 0;
}
