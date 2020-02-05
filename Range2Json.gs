function PrepareJsonData(filteredData){
  var keys = GetJsonKeys(filteredData)
  
  var jsonData = [];
  for(var i=1; i<filteredData[0].length; i++){
    var objValues = GetObjectValues(filteredData, i);   
    var jsonObject = {
      "objName": filteredData[0][i],
      "jsonBody": ParseToJson(keys, objValues)
    }
    jsonData.push(jsonObject)
  }  
  return jsonData;
}

function ParseToJson(fields, values){
  var outputJson = {};
  for(var field in fields){
    if( IsEmpty(fields[field]) || IsEmpty(values[field]) ){ 
      continue; 
    }
    var key = fields[field];
    var value = values[field];
    
    var jsonObject = AddJsonValueByPath(outputJson, key, value);
  }
  return outputJson;
}

function PathToArray(path){
  if(IsEmpty(path)) return [];
  return path.split("/");
}

function AddJsonValueByPath(jsonObject, path, value){
  if(IsEmpty(value)) return jsonObject;
  
  var nodes = PathToArray(path);
  AddJsonValueRecursive(jsonObject, nodes, value);
  
  return jsonObject;
}

function AddJsonValueRecursive(jsonObject, nodes, value){
  var node = nodes[0];
  
  if(nodes.length > 1){
    AddJsonNode(jsonObject, node);
    var cleanNode = GetCleanNodeName(node);
    nodes.shift();
    AddJsonValueRecursive(jsonObject[cleanNode], nodes, value)
  }
  else {
    var cleanNode = GetCleanNodeName(node);
    AddJsonValue(jsonObject, node, value);
  }
  return jsonObject;
}

function AddJsonNode(jsonObject, node){
  if(jsonObject[node] != undefined) return jsonObject;
  var type = GetNodeType(node);
  var cleanNode = GetCleanNodeName(node);
  
  switch (type){
    case "array":
      if(jsonObject[cleanNode] == undefined) {
        jsonObject[cleanNode] = []
      }
      break;
    case "nameless": 
      if(jsonObject[cleanNode] == undefined) {
        jsonObject.splice(cleanNode, 0, {})
      }
      break;
    default:
        jsonObject[cleanNode] = {}
  }
  return jsonObject;
}

function AddJsonValue(jsonObject, node, value){
  var type = GetNodeType(node);
  var cleanNode = GetCleanNodeName(node);
  switch (type){
    case "array":
      if(jsonObject[cleanNode] == undefined){
        jsonObject[cleanNode] = [];
      }
      jsonObject[cleanNode].push(value);
      break;
    default:
      jsonObject[cleanNode] = value;
  }
  return jsonObject
}

function GetNodeType(key){
  var reArray       = /\[\]/
  var reNameless    = /#/;
  
  if(key.match(reArray) != null) return "array";
  if(key.match(reNameless) != null) return "nameless";
  
  return "object";
}

function GetCleanNodeName(node){
  var reArray       = /\[\]/;
  var reNameless    = /#/;
  
  node = node.replace(reArray,"");
  
  if(node.match(reNameless) != null){
    node = node.replace(reNameless, "");
    node = GetNodeValueIndex(node);
  }
  return node
}

function GetNodeValueIndex(node){
  var re = /[^0-9]/
  if(node.match(re) != undefined){
    throw new Error("Nameless value key must be: '#[0-9]+'")
  }
  return parseInt(node-1)
}