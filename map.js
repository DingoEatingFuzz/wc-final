mapboxgl.accessToken =
  'pk.eyJ1IjoiZGluZ29lYXRpbmdmdXp6IiwiYSI6ImNpbjJwbm5qbzBiZmZ1cmtrY3QxbWF2NTIifQ.-6hI-N6_neBpAN5tDL-1iQ';

var map = new mapboxgl.Map({
  container: 'map',
  center: [-124.2, 45.1],
  zoom: 9,
  style: 'test.json',
});

var pointsOfInterest = [
  {
    name: 'Central California',
    description: 'Well-documented flowlines make for a rich picture of the passage of water.',
    at: [-121.11932399442739, 37.05406381571352, 9],
  },
  {
    name: 'Disappearing Louisiana',
    description: 'As the state sinks and erodes while the gulf rises, total area shrinks.',
    at: [-93.0497256550815, 29.973843734441573, 8],
  },
  {
    name: 'Land of 10,000 Lakes',
    description: 'Minnesota is known for its lakes.',
    at: [-94.35819403563433, 47.141922572405946, 7],
  },
  {
    name: 'Mt. Hood',
    description: 'Through lakes and glaciers alone, the shape of the mountain is distinct.',
    at: [-121.70078229409123, 45.37237653244699, 11],
  },
  {
    name: 'Deadhorse',
    description: 'An outlet to the Arctic Ocean.',
    at: [-148.15915877850824, 70.22203655390581, 9],
  },
  {
    name: 'Puerto Rico',
    description: 'Although not a state, still detailed in the NHD.',
    at: [-66.44890781793832, 18.231122299468723, 9],
  },
  {
    name: 'Canadian River Basin',
    description: 'Topology made obvious by gravity.',
    at: [-100.81765627653866, 35.97221279696855, 9],
  },
  {
    name: 'Salton Sea',
    description: 'The biggest lake in California. Now mostly a feat of engineering.',
    at: [-115.64782819378479, 33.13350957328285, 9],
  },
];

map.on('load', function() {
  map.addSource('land', {
    type: 'geojson',
    data: 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_land.geojson',
  });

  map.addLayer(
    {
      id: 'land',
      type: 'fill',
      source: 'land',
      paint: {
        'fill-color': '#13391C',
        'fill-outline-color': '#3B5D25',
      },
    },
    'flowlines'
  );

  map.addSource('states', {
    type: 'geojson',
    data: '/states.json',
  });

  map.addLayer({
    id: 'states',
    type: 'line',
    source: 'states',
    paint: {
      'line-color': '#FFFFFF',
      'line-width': 1,
      'line-opacity': 0.8,
    },
  });

  map.addLayer(
    {
      id: 'us-bg',
      type: 'fill',
      source: 'states',
      paint: {
        'fill-color': '#536345',
      },
    },
    'flowlines'
  );

  map.addSource('counties', {
    type: 'geojson',
    data: '/counties.json',
  });

  map.addLayer({
    id: 'counties',
    type: 'line',
    source: 'counties',
    minzoom: 5,
    paint: {
      'line-color': '#FFFFFF',
      'line-width': 0.5,
      'line-opacity': 0.6,
    },
  });

  var poiList = document.querySelector('.poi-list');
  pointsOfInterest.forEach(function(poi) {
    var el = document.createElement('li');
    el.innerHTML = '<h3>' + poi.name + '</h3><p>' + poi.description + '</p>';
    el.setAttribute('data-lng', poi.at[0]);
    el.setAttribute('data-lat', poi.at[1]);
    el.setAttribute('data-zoom', poi.at[2]);
    el.addEventListener('click', flyToPoi);
    poiList.appendChild(el);
  });

  document.querySelector('.poi').classList.remove('hidden');

  map.on('click', loc =>
    console.log(`[ ${loc.lngLat.lng}, ${loc.lngLat.lat}, ${Math.round(map.getZoom())} ]`)
  );
});

function flyToPoi(evt) {
  var el = evt.currentTarget;

  map.flyTo({
    center: [parseFloat(el.getAttribute('data-lng')), parseFloat(el.getAttribute('data-lat'))],
    zoom: parseFloat(el.getAttribute('data-zoom')),
  });
}
