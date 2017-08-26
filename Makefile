.PHONY: tippecanoe

tippecanoe:
        sudo docker run -it --rm \
        -v ~/ndjson:/json \
        tippecanoe:latest \
        tippecanoe \
                -f \
                --maximum-zoom=g \
                --drop-densest-as-needed \
                --named-layer=area:/json/Area.ndjson \
                --named-layer=line:/json/Line.ndjson \
                --named-layer=point-event-fc:/json/PointEventFC.ndjson \
                --named-layer=point:/json/Point.ndjson \
                --named-layer=waterbody:/json/Waterbody.ndjson \
                --named-layer=flowline:/json/Flowline.ndjson \
                --read-parallel \
                --name=NHD \
                --output-to-directory=/json/nhd-tiles