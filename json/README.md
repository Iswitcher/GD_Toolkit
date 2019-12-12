# What is this?
This is a collection of Google Apps Scripts I've designed to be used as a Google Sheed Add-On, allowing to:
1. Export Spreadsheet data as single or separate JSON file(s)

# General description

## Main methods:
1. exportSingleJson() - Exports JSON objects in a sigle JSON file to directory from Google Sheet settings
2. exportSeparateJson() - Exports each JSON object as separate JSON file to directory from Google Sheet settings

## Required sheet table structure

| ###data### |  | ###type### |
| ---------- | - | ----------|
| ###index### | ###root### | ###key### |
