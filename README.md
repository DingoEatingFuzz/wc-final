# Web Cartography Final

Often missing from political discourse is geographical features. A recent example is how
the North Dakota Access Pipeline was being built on private property with apporval of the
owners and the Standing Rock tribe, not being the owners of said property, have no right
to protest. This ignores that fact that water sources on private property come from upstream,
which may not be on the same owners property. A visual aid may do better than words can
to describe the relationship between geography and property.

By creating a map using only geographical water bodies data alongside US county political borders,
the conversation is forced to be about the interplay between the two givens. Additionally,
the magnitude of the data (there are a lot of counties, and a dizzying complex network of water),
should put into perspective how difficult and nuanced this problem is.



## Data Pipeline

Water data comes from the [USGS National Hydrography Dataset](https://nhd.usgs.gov/index.html) and political boundary data is TBD. Most likely just county data from the census.



### Processing NHD Data

1. Data is downloaded as an ESRI Geodatabase from [NHD High Resolution S3 Bucket](http://prd-tnm.s3-website-us-west-2.amazonaws.com/?prefix=StagedProducts/Hydrography/NHD/National/HighResolution/GDB/)
2. Data is then converted to various geojson files using ArcGIS
   1. Ideally, ogr2ogr could be used to create a fully scripted, easily reproduced process, but the datasets are too larger for ogr2ogr.
3. Geojson files are then processed into vector tiles using [Tippecanoe](https://github.com/mapbox/tippecanoe) 
   1. Geojson files could be shared through Dat to avoid the processing step again
4. Vector tiles are hosted by a custom tile server
   1. Hosting options include Digital Ocean (personal account), Heroku, or AWS Lambda + S3



### Processing County Data

1. Data is downloaded as geojson
2. Geojson is then processed into vector tiles using Tippecanoe
3. Vector tiles are hosted the same way the NHD tiles are hosted



## Interactive Map

Mapbox GL is used to serve the custom vector tiles. On hover, counties will highlight water sources that lead into the county. 