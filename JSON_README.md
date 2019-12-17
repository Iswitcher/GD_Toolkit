# What is this?
This is a collection of Google Apps Scripts I've designed to be used as a Google Sheed Add-On, allowing to:
1. Export Spreadsheet data as single or separate JSON file(s)

# General description

## Main methods:
1. exportSingleJson() - Exports JSON objects in a sigle JSON file to directory from Google Sheet settings
2. exportSeparateJson() - Exports each JSON object as separate JSON file to directory from Google Sheet settings

## Required sheet table structure
 
![alt text](https://service.crazypanda.ru/v/monosnap/2019-12-12-17-44-25-uglkh.png "Example of sheet data to be parsed as JSON")


| ###data### |  | ###type### |
| ---------- | - | ----------|
| ###index### | ###root### | ###key### |

```JSON
{
  "aa": {
    "main": {
      "type": "blah1",
      "value": 1
    },
    "some_array": [
      1,
      2,
      3
    ],
    "some_object": {
      "type": "top",
      "name": "kek",
      "value": 123
    }
  }
}
```
