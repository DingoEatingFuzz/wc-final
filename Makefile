.PHONY: tippecanoe gcs

tippecanoe:
	sudo docker run -it --rm \
    -v /mnt/disks/fast/home/michael/ndjson:/json \
    tippecanoe:latest \
    tippecanoe \
      -f \
			--maximum-zoom=g \
			--no-feature-limit \
			--no-tile-size-limit \
	    --named-layer=area:/json/Area.ndjson \
	    --named-layer=line:/json/Line.ndjson \
	    --named-layer=point-event-fc:/json/PointEventFC.ndjson \
	    --named-layer=point:/json/Point.ndjson \
	    --named-layer=waterbody:/json/Waterbody.ndjson \
	    --named-layer=flowline:/json/Flowline.ndjson \
	    --read-parallel \
	    --name=NHD \
	    --output-to-directory=/json/nhd-tiles

gcs:
	gsutil -m -h 'Content-Encoding:gzip' \
		rsync -d -r ../ndjson/nhd-tiles gs://nhd-tiles/v2

tippewater:
	sudo docker run -it --rm \
        -v /mnt/disks/fast/home/michael/ndjson:/json \
        tippecanoe:latest \
        tippecanoe \
                -f \
		--maximum-zoom=g \
		--no-feature-limit \
		--no-tile-size-limit \
    --named-layer=waterbody:/json/Waterbody.ndjson \
    --read-parallel \
    --name=NHD \
    --output-to-directory=/json/nhd-tiles-water

gcswater:
	gsutil -m -h 'Content-Encoding:gzip' \
		rsync -d -r ../ndjson/nhd-tiles-water gs://nhd-tiles/v3
tippeflow:
	sudo docker run -it --rm \
    -v /mnt/disks/fast/home/michael/ndjson:/json \
    tippecanoe:latest \
    tippecanoe \
      -f \
			--maximum-zoom=12 \
			--drop-smallest-as-needed \
			--maximum-tile-bytes=2000000 \
      --named-layer=flowline:/json/Flowline.ndjson \
      --read-parallel \
      --name=NHDFlow \
      --output-to-directory=/json/nhd-tiles-flow

gcsflow:
	gsutil -m -h 'Content-Encoding:gzip' \
		rsync -d -r ../ndjson/nhd-tiles-flow gs://nhd-tiles/v3/flow
