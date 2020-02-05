function CreateFile(path, filename, data){
  var folder = GetFolderByPath(path) 
  
  var isDuplicateClear = DeleteDuplicates(folder, filename)
  folder.createFile(filename, data, "application/json")
  return true;
}

function DeleteDuplicates(folder, filename){
  var duplicates = folder.getFilesByName(filename);
  
  while ( duplicates.hasNext() ){
    duplicates.next().setTrashed(true);
  }
}

function GetFolderByPath(path){
  var parsedPath = ParsePath(path);
  var rootFolder = DriveApp.getRootFolder()
  return RecursiveSearchAndAddFolder(parsedPath, rootFolder);
}

function ParsePath(path){
  while ( CheckPath(path) ){
    var pathArray = path.match(/\w+/g);
    return pathArray;
  }
  return undefined;
}

function CheckPath(path){
  var re = /\/\/(\w+\/)+/;
  if(path.match(re)==null){
    throw new Error("File path "+path+" is invalid, it must be: '//.../'");
  }
  return true;
}

function RecursiveSearchAndAddFolder(parsedPath, parentFolder){
  if(parsedPath.length == 0) return parentFolder;
   
  var pathSegment = parsedPath.splice(0,1).toString();

  var folder = SearchOrCreateChildByName(parentFolder, pathSegment);
  
  return RecursiveSearchAndAddFolder(parsedPath, folder);
}

function SearchOrCreateChildByName(parent, name){
  var childFolder = SearchFolderChildByName(parent, name); 
  
  if(childFolder==undefined){
    childFolder = parent.createFolder(name);
  }
  return childFolder
}

function SearchFolderChildByName(parent, name){
  var folderIterator = parent.getFolders();
  
  while (folderIterator.hasNext()){
    var child = folderIterator.next();
    if(child.getName() == name){ 
      return child;
    }
  }
  return undefined;
}
