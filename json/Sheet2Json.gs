var settingsSheetName = "###settings###";
var mainSheetName     = "###main###";

var settingsKeyName   = "###key###";
var settingsValueName = "###value###";
var settingsEndKey    = "###end###";

/**
 *  Export selected range data as single JSON
 *
 *  @param {string} 
 *  @return {string}
 *  @customfunction
 */
function exportSingleJson() {
  var settings = getSettingsBySheetName(settingsSheetName);
  var path = findSettingsValue(settings, "path");
  var filename = findSettingsValue(settings, "filename") + ".json";
  
  var data = {};//TODO!
  
  var result = createFile(path, filename, data)
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
