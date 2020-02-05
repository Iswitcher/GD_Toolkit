function BeautifyJson(data){
  return JSON.stringify(data, jsonFormatArguments(), 2);
}

function jsonFormatArguments(){
  return undefined;
}