# GD_Toolkit

## What is it about? 
Here I decided to aggregate all the toolkits I use for translating Google Spreadsheet data to JSON, which would be imported into server game data. 
While having a lot of different sheets and structures, I've decided to make the universal library I can include and call from any Google Spreadsheet and get the JSON i want. 

## Modules
This project is divided into 3 modules:
* import (json2sheet) 
* export (sheet2json) 
* convert (sheetRange2jsonData)

## Word of notice
This project works only with Google assets, which are:
* Drive (import and export) 
* Mail
* Google Sheet (functions are to be called from there) 
