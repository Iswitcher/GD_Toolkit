/**
 *  Returns list of price objects
 *
 *  @param {number} index 
 *  @return {array}
 * @customfunction
 *
 */
function BeautifyJson(json){
  return JSON.stringify(JSON.parse(json), undefined, 2);
}

/**
 *  Returns list of price objects
 *
 *  @param {number} index 
 *  @return {array}
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
  const keys = path.split("/");
  
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
