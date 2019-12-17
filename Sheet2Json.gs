/**
 *  Export selected range data as single JSON
 *
 *  @param {string} 
 *  @return {string}
 *  @customfunction
 */
function exportSingleJson() {
  var settings = getSettingsBySheetName(config.settingsSheetName);
  var path = findSettingsValue(settings, "path");
  
  var filename = findSettingsValue(settings, "filename") + ".json";
  
  var dataObject = rangeToJsonObject(getRangeBySheetName(config.mainSheetName));
  var json = createJsonObject(dataObject);
  
  var result = createFile(path, filename, beautifyJson(json))
  return result;
}

/**
 *  Export selected range data as separate JSONs
 *
 *  @param {string} 
 *  @return {string}
 *  @customfunction
 */
function exportSeparateJson() {
  return true;
}

/**
 *  Makes JSON string human-readable
 *
 *  @param {string} json {"type": "blah", "value": 123}
 *  @return {string}
 *  @customfunction
 */
function beautifyJson(data){
  return JSON.stringify(JSON.parse(data), jsonFormatArguments(), 2);
}

/**
 *  Returns parsed JSON array or object with parameters
 *
 *  @param {string} objectType "array"
 *  @param {string} key "dummy_1"
 *  @param {string} range "C1:F10"
 *  @return {array} Parsed JSON array or object with parameters
 * @customfunction
 *
 */
function toJson(objectType, key, range){
  var dataObject = rangeToJsonObject(range);
  
  switch (objectType){
    case "object":
      return createJsonObject(dataObject, key);
    case "array":
      return createJsonArray(dataObject, key);
    default: throw new Error("objectType must be array or object")
  }
}