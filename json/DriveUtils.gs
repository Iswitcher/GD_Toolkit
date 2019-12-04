function createFile(path, filename, data){
  var folder = getFolderByPath(path) 
  
  var isDuplicateClear = DeleteDuplicates(folder, filename)
  folder.createFile(filename, data, "application/json")
  
  return true;
}

function DeleteDuplicates(folder, filename){
  var duplicates = folder.getFilesByName(filename);
  
  while ( duplicates.hasNext() ){
    duplicates.next().setTrashed(true);
  }
  return true;
}

function getFolderByPath(path){
  var parsedPath = parsePath(path);
  var rootFolder = DriveApp.getRootFolder()
  var folder = recursiveSearchAndAddFolder(parsedPath, rootFolder);
  return folder;
}

function recursiveSearchAndAddFolder(parsedPath, parentFolder){
  if(parsedPath.length == 0) return parentFolder;
   
  var pathSegment = parsedPath.splice(0,1).toString();

  var folder = searchOrCreateChildByName(parentFolder, pathSegment);
  
  return recursiveSearchAndAddFolder(parsedPath, folder);
}

function searchOrCreateChildByName(parent, name){
  var childFolder = searchFolderChildByName(parent, name); 
  
  if(childFolder==undefined){
    childFolder = parent.createFolder(name);
  }
  return childFolder
}

function searchFolderChildByName(parent, name){
  var folderIterator = parent.getFolders();
  
  while (folderIterator.hasNext()){
    var child = folderIterator.next();
    if(child.getName() == name){ 
      return child;
    }
  }
  return undefined;
}

function parsePath(path){
  while ( checkPath(path) ){
    var pathArray = path.match(/\w+/g);
    return pathArray;
  }
  return undefined;
}

function checkPath(path){
  var re = /\/\/(\w+\/)+/;
  if(path.match(re)==null){
    throw new Error("File path "+path+" is invalid, it must be: '//.../'");
    return false;
  }
  return true;
}
