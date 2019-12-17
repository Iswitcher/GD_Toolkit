function onOpen() {
  var ui = SpreadsheetApp.getUi();
  var mainMenu = ui.createMenu("[GD Toolkit]");
  mainMenu.addSubMenu(ui.createMenu('Sheet2Json')
                      .addItem("Export data to single JSON", "exportSingleJson")
                      .addItem("Export data to separate JSONs", "exportSeparateJson"));
  
  mainMenu.addSeparator()
  mainMenu.addItem("Show config sidebar", "createSidebarUI")

  mainMenu.addToUi();
};