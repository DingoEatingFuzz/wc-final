#!/usr/bin/env node

/**

Due to joining two tables in ArcGIS, the exported geojson
has verbose keys. simplifying the property names makes them easier
to work with while also reducing the file size.

**/

var JSONStream = require('JSONStream');
var fs = require('fs');

var geojsonStream = process.stdin;
var desiredKeys = [
  'NHDFlowline.PERMANENT_IDENTIFIER',
  'NHDFlowline.FDATE',
  'NHDFlowline.RESOLUTION',
  'NHDFlowline.GNIS_ID',
  'NHDFlowline.GNIS_NAME',
  'NHDFlowline.LENGTHKM',
  'NHDFlowline.REACHCODE',
  'NHDFlowline.FLOWDIR',
  'NHDFlowline.FTYPE',
  'NHDFlowline.FCODE',
  'NHDFlowline.SHAPE_Length',
  'NHDFlowline.INNETWORK',
  'NHDFlowline.MAINPATH',
  'NHDFlowlineVAA.STREAMLEVEL',
  'NHDFlowlineVAA.STREAMORDER',
  'NHDFlowlineVAA.FROMNODE',
  'NHDFlowlineVAA.TONODE',
  'NHDFlowlineVAA.LEVELPATHID',
  'NHDFlowlineVAA.PATHLENGTHKM',
  'NHDFlowlineVAA.TERMINALPATHID',
  'NHDFlowlineVAA.ARBOLATESUMKM',
  'NHDFlowlineVAA.DIVERGENCEFLAG',
  'NHDFlowlineVAA.STARTFLAG',
  'NHDFlowlineVAA.TERMINALFLAG',
  'NHDFlowlineVAA.DNLEVEL',
  'NHDFlowlineVAA.THINNERCODE',
  'NHDFlowlineVAA.UPLEVELPATHID',
  'NHDFlowlineVAA.DNLEVELPATHID',
  'NHDFlowlineVAA.DNDRAINCOUNT',
  'NHDFlowlineVAA.GLOBALID',
  'NHDFlowline.GLOBALID',
];

geojsonStream.pipe(JSONStream.parse()).on('data', geojson => {
  geojson.properties = Object.keys(geojson.properties).reduce((newProps, key) => {
    if (desiredKeys.includes(key)) {
      switch (key) {
        case 'NHDFlowlineVAA.GLOBALID':
          newProps['VAA.GLOBALID'] = geojson.properties[key];
          break;
        case 'NHDFlowline.GLOBALID':
          newProps['Flowline.GLOBALID'] = geojson.properties[key];
          break;
        default:
          newProps[key.split('.')[1]] = geojson.properties[key];
      }
    }
    return newProps;
  }, {});

  process.stdout.write(JSON.stringify(geojson) + '\n');
});
