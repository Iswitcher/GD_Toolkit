function isEmpty(data){
  if( data==undefined || data==null )   return true;
  else if( Array.isArray(data) )        return isEmptyArray(data);
  else if( typeof data == "object" )    return isEmptyObject(data);
  else                                  return isEmptyString(data);
  
  return false;
}

function isEmptyArray(data){
  return data.length > 0 ? false : true;
}

function isEmptyObject(data){
  for(var key in data) {
    if(data.hasOwnProperty(key)) return false;
  }
  return true;
}

function isEmptyString(data){
  if (data == undefined || data == null || data == ""){
    return true;
  } 
  return false;
}
