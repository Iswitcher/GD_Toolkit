function BeautifyJson(data){
  return JSON.stringify(data, jsonFormatArguments(), 2);
}

function jsonFormatArguments(){
  return undefined;
}

function TrimJsonEmptyObjects(data){
  var result = JSON.stringify(data)
  result = result.replace(/{},?\r?\n?/gm,"")
  return JSON.parse(result)
}