function createSidebarUI() {
  var name = "SidebarHtml"
  var title    = "GD Toolkit";
  var width    = 100;
  
  var sidebar = HtmlService.createHtmlOutputFromFile(name).setTitle(title).setWidth(width);
  SpreadsheetApp.getUi().showSidebar(sidebar);
}