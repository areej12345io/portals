	// TO MAKE THE MAP APPEAR YOU MUST
	// ADD YOUR ACCESS TOKEN FROM
	// https://account.mapbox.com
  
	mapboxgl.accessToken = 'pk.eyJ1IjoiZW5ncmtpIiwiYSI6ImNrc29yeHB2aDBieDEydXFoY240bXExcWoifQ.WS7GVtVGZb4xgHn9dleszQ';
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: [69.3451,30.3753], // starting position [lng, lat]
        zoom: 3, // starting zoom
        // pitch: 62, // starting pitch
        // bearing: -20 // starting bearing

    });
     // Add a scale control to the map
     map.addControl(new mapboxgl.ScaleControl());

    map.on('style.load', () => {
        map.addSource('line', {
            type: 'geojson',
            lineMetrics: true,
            data: {
                type: 'LineString',
                coordinates: [
                    [2.293389857555951, 48.85896319631851],
                    [2.2890810326441624, 48.86174223718291]
                ]
            }
        });

        map.addLayer({
            id: 'line',
            source: 'line',
            type: 'line',
            paint: {
                'line-width': 12,
                // The `*-emissive-strength` properties control the intensity of light emitted on the source features.
                // To enhance the visibility of a line in darker light presets, increase the value of `line-emissive-strength`.
                'line-emissive-strength': 0.8,
                'line-gradient': [
                    'interpolate',
                    ['linear'],
                    ['line-progress'],
                    0,
                    'red',
                    1,
                    'blue'
                ]
            }
        });
    });

    document
        .getElementById('lightPreset')
        .addEventListener('change', function () {
            map.setConfigProperty('basemap', 'lightPreset', this.value);
        });

    document
        .querySelectorAll('.map-overlay-inner input[type="checkbox"]')
        .forEach((checkbox) => {
            checkbox.addEventListener('change', function () {
                map.setConfigProperty('basemap', this.id, this.checked);
            });
        })


    map.addControl(
        new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
        })
    );

 // Add zoom and rotation controls to the map.
 map.addControl(new mapboxgl.NavigationControl());

 map.addControl(
    new MapboxDirections({
        accessToken: mapboxgl.accessToken
    }),
    'top-left'
);

// These options control the camera position after animation
const start = {
    center: [80, 36],
    zoom: 1,
    pitch: 0,
    bearing: 0
};
const end = {
    center: [69.3451,30.3753],
    zoom: 12.5,
    bearing: 130,
    pitch: 75
};
let isAtStart = true;

    document.getElementById('fly').addEventListener('click', () => {
        // depending on whether we're currently at point a or b,
        // aim for point a or b
        const target = isAtStart ? end : start;
        isAtStart = !isAtStart;

        map.flyTo({
            ...target, // Fly to the selected target
            duration: 12000, // Animate over 12 seconds
            essential: true // This animation is considered essential with
            //respect to prefers-reduced-motion
        });
    });
    const distanceContainer = document.getElementById('distance');

    // GeoJSON object to hold our measurement features
    const geojson = {
        'type': 'FeatureCollection',
        'features': []
    };

    // Used to draw a line between points
    const linestring = {
        'type': 'Feature',
        'geometry': {
            'type': 'LineString',
            'coordinates': []
        }
    };

    map.on('load', () => {
        map.addSource('geojson', {
            'type': 'geojson',
            'data': geojson
        });

        // Add styles to the map
        map.addLayer({
            id: 'measure-points',
            type: 'circle',
            source: 'geojson',
            paint: {
                'circle-radius': 5,
                'circle-color': '#000'
            },
            filter: ['in', '$type', 'Point']
        });
        map.addLayer({
            id: 'measure-lines',
            type: 'line',
            source: 'geojson',
            layout: {
                'line-cap': 'round',
                'line-join': 'round'
            },
            paint: {
                'line-color': '#000',
                'line-width': 2.5
            },
            filter: ['in', '$type', 'LineString']
        });

        map.on('click', (e) => {
            const features = map.queryRenderedFeatures(e.point, {
                layers: ['measure-points']
            });

            // Remove the linestring from the group
            // so we can redraw it based on the points collection.
            if (geojson.features.length > 1) geojson.features.pop();

            // Clear the distance container to populate it with a new value.
            distanceContainer.innerHTML = '';

            // If a feature was clicked, remove it from the map.
            if (features.length) {
                const id = features[0].properties.id;
                geojson.features = geojson.features.filter(
                    (point) => point.properties.id !== id
                );
            } else {
                const point = {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [e.lngLat.lng, e.lngLat.lat]
                    },
                    'properties': {
                        'id': String(new Date().getTime())
                    }
                };

                geojson.features.push(point);
            }

            if (geojson.features.length > 1) {
                linestring.geometry.coordinates = geojson.features.map(
                    (point) => point.geometry.coordinates
                );

                geojson.features.push(linestring);

                // Populate the distanceContainer with total distance
                const value = document.createElement('pre');
                const distance = turf.length(linestring);
                value.textContent = `Total distance: ${distance.toLocaleString()}km`;
                distanceContainer.appendChild(value);
            }

            map.getSource('geojson').setData(geojson);
        });
    });

    map.on('mousemove', (e) => {
        const features = map.queryRenderedFeatures(e.point, {
            layers: ['measure-points']
        });
        // Change the cursor to a pointer when hovering over a point on the map.
        // Otherwise cursor is a crosshair.
        map.getCanvas().style.cursor = features.length
            ? 'pointer'
            : 'crosshair';
    });
// Add geolocate control to the map.
map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true
    })
);
map.addControl(new mapboxgl.FullscreenControl());


$(document).ready(function() {
    $('#menu-btn').click(function() {
        $('#sidebar').toggleClass('open');
    });
});