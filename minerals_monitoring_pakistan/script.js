document.addEventListener('DOMContentLoaded', function() {
  // Ensure elements are available in the DOM
  const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
  const sidebar = document.getElementById('sidebar');

  if (sidebarToggleBtn && sidebar) {
      // JavaScript for sidebar toggle
      sidebarToggleBtn.addEventListener('click', function() {
          sidebar.classList.toggle('active');
      });
  }

  // Mapbox GL JS initialization
  mapboxgl.accessToken = 'pk.eyJ1IjoiZW5ncmtpIiwiYSI6ImNrc29yeHB2aDBieDEydXFoY240bXExcWoifQ.WS7GVtVGZb4xgHn9dleszQ';  
  // Marker data with coordinates and popup content
  // Marker data with coordinates and popup content
const markers = [
    { coordinates: [73.2215, 34.1688], popupText: '', imageUrl: 'Abbottabad.png' },
    { coordinates: [71.5130, 34.7313], popupText: '', imageUrl: 'Bajaur.png' },
    { coordinates: [70.6455, 32.9910], popupText: '', imageUrl: 'Bannu.png' },
    { coordinates: [72.6151, 34.3943], popupText: '', imageUrl: 'Boner.png' },
    { coordinates: [71.7385, 34.1986], popupText: '', imageUrl: 'Charsadda.png' },
    { coordinates: [72.1416, 36.1113], popupText: '', imageUrl: 'Chitral.png' },
    { coordinates: [70.6217, 31.7448], popupText: '', imageUrl: 'DI Khan.png' },
    { coordinates: [72.8515, 34.0403], popupText: '', imageUrl: 'Haripur.png' },
    { coordinates: [71.0973, 33.1277], popupText: '', imageUrl: 'Karak.png' },
    { coordinates: [71.1552, 34.1054], popupText: '', imageUrl: 'Khyber.png' },
    { coordinates: [71.5249, 33.4973], popupText: '', imageUrl: 'Kohat.png' },
    { coordinates: [73.2765, 35.2611], popupText: '', imageUrl: 'Kohistan.png' },
    { coordinates: [70.3361, 33.6960], popupText: '', imageUrl: 'Kurram.png' },
    { coordinates: [71.8097, 34.9161], popupText: '', imageUrl: 'Lower Dir.png' },
    { coordinates: [71.9046, 34.5030], popupText: '', imageUrl: 'Malakand.png' },
    { coordinates: [73.3709, 34.6744], popupText: '', imageUrl: 'Manshera.png' },
    { coordinates: [72.0468, 34.3100], popupText: '', imageUrl: 'Mardan.png' },
    { coordinates: [71.2874, 34.5356], popupText: '', imageUrl: 'Mohmand.png' },
    { coordinates: [71.9876, 34.0105], popupText: '', imageUrl: 'Nowshera.png' },
    { coordinates: [70.9547, 33.6671], popupText: '', imageUrl: 'Orakzai.png' },
    { coordinates: [72.4732, 34.0719], popupText: '', imageUrl: 'Swabi.png' },
    { coordinates: [72.4258, 35.2227], popupText: '', imageUrl: 'Swat.png' },
    // Add more markers as needed
  ];
  const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [69.3451, 30.3753], // starting position [lng, lat]
      zoom: 5 // starting zoom
  });

  map.on('style.load', () => {
      map.setFog({}); // Set the default atmosphere style
  });
  map.addControl(new mapboxgl.NavigationControl());


  let markerObjects = [];

  function addMarkers() {
    markers.forEach(marker => {
      // Create a popup
      const popup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(`
              <div class="popup-content">
                  <h3>${marker.popupText}</h3>
                  <img src="${marker.imageUrl}" alt="Marker Image">
              </div>
          `);
  
      // Create DOM element for the marker
      const el = document.createElement('div');
      el.className = 'marker'; // Use marker class for styling
  
      // Create the marker and add it to the map
      const mapMarker = new mapboxgl.Marker(el)
          .setLngLat(marker.coordinates)
          .setPopup(popup) // Set a popup on this marker
          .addTo(map);
      
      markerObjects.push(mapMarker);
    });
  }
  
  function removeMarkers() {
    markerObjects.forEach(marker => marker.remove());
    markerObjects = [];
  }
  
  map.on('load', () => {
      // Adding sources and layers with initial visibility set to 'none'
      map.addSource('geology', {
          'type': 'raster',
          'tiles': [
              'http://172.18.1.37:8080/geoserver/geology/wms?service=WMS&version=1.1.0&request=GetMap&layers=Geology&bbox={bbox-epsg-3857}&width=768&height=558&srs=EPSG:3857&styles=&format=image/png&transparent=true'
          ],
          'tileSize': 256
      });

      map.addLayer({
          'id': 'geology',
          'type': 'raster',
          'source': 'geology',
          'paint': { 'raster-opacity': 0.7 },
          'layout': { 'visibility': 'none' } // Set to 'none' initially
      });

      map.addSource('soiltype', {
          'type': 'raster',
          'tiles': [
              'http://172.18.1.37:8080/geoserver/minerals_final/wms?service=WMS&version=1.1.0&request=GetMap&layers=minerals_soil&bbox={bbox-epsg-3857}&width=768&height=558&srs=EPSG:3857&styles=&format=image/png&transparent=true'
          ],
          'tileSize': 256
      });

      map.addLayer({
          'id': 'soiltype',
          'type': 'raster',
          'source': 'soiltype',
          'paint': { 'raster-opacity': 1 },
          'layout': { 'visibility': 'none' } // Set to 'none' initially
      });

      map.addSource('South_balochistan', {
        'type': 'raster',
        'tiles': [
            'http://172.18.1.37:8080/geoserver/minerals_final/wms?service=WMS&version=1.1.0&request=GetMap&layers=S.Balochistan&bbox={bbox-epsg-3857}&width=768&height=558&srs=EPSG:3857&styles=&format=image/png&transparent=true'
        ],
        'tileSize': 256
    });

    map.addLayer({
        'id': 'South_balochistan',
        'type': 'raster',
        'source': 'South_balochistan',
        'paint': { 'raster-opacity': 0.7 },
        'layout': { 'visibility': 'none' } // Set to 'none' initially
    });


    map.addSource('north_balochistan', {
        'type': 'raster',
        'tiles': [
            'http://172.18.1.37:8080/geoserver/minerals_final/wms?service=WMS&version=1.1.0&request=GetMap&layers=N.Balochistan&bbox={bbox-epsg-3857}&width=768&height=558&srs=EPSG:3857&styles=&format=image/png&transparent=true'
        ],
        'tileSize': 256
    });

    map.addLayer({
        'id': 'north_balochistan',
        'type': 'raster',
        'source': 'north_balochistan',
        'paint': { 'raster-opacity': 0.7 },
        'layout': { 'visibility': 'none' } // Set to 'none' initially
    });

    map.addSource('makran_cost', {
        'type': 'raster',
        'tiles': [
            'http://172.18.1.37:8080/geoserver/minerals_final/wms?service=WMS&version=1.1.0&request=GetMap&layers=Makran_Coast&bbox={bbox-epsg-3857}&width=768&height=558&srs=EPSG:3857&styles=&format=image/png&transparent=true'
        ],
        'tileSize': 256
    });

    map.addLayer({
        'id': 'makran_cost',
        'type': 'raster',
        'source': 'makran_cost',
        'paint': { 'raster-opacity': 0.7 },
        'layout': { 'visibility': 'none' } // Set to 'none' initially
    });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Add a GeoJSON source containing place coordinates and information.
// Add a GeoJSON source containing place coordinates and information.
map.addSource('placeser', {
    'type': 'geojson',
    'data': kpk_regions // Replace with your GeoJSON data variable or path
});

map.addLayer({
    'id': 'region-fills',
    'type': 'fill',
    'source': 'placeser',
    'layout': {
        'visibility': 'none'
    },
    'paint': {
        'fill-color': [
            'match',
            ['get', 'NAME_2'],
            'Bannu', '#581845',
            'Dera Ismail Khan', '#900C3F',
            'Hazara', '#C70039',
            'Kohat', '#FF5733',
            'Malakand', '#FFC300',
            'Mardan', '#DAF7A6',
            'Peshawar', '#CF6650',
            '#000000' // default color
        ],
        'fill-opacity': 0.7
    }
});

// Optional: Add a border around the regions
map.addLayer({
    'id': 'region-borders',
    'type': 'line',
    'source': 'placeser',
    'layout': {
        'visibility': 'none'
    },
    'paint': {
        'line-color': '#000',
        'line-width': 2
    }
});

// Add labels for the regions
map.addLayer({
    'id': 'region-labels',
    'type': 'symbol',
    'source': 'placeser',
    'layout': {
      
        'text-field': ['get', 'Minerals'],
        'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
        'text-radial-offset': 0.3,
        'text-justify': 'auto',
        'text-font': ['Open Sans Bold'], // Ensure the font is available
        'text-size': 10, // Adjust the font size as needed
        'visibility': 'none'

    },
    'paint': {
        'text-color': '#0E2FF9'
    }
});
 


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    map.addSource('kohistan', {
        'type': 'raster',
        'tiles': [
            'http://172.18.1.37:8080/geoserver/minerals_final/wms?service=WMS&version=1.1.0&request=GetMap&layers=Kohistan_Kashmir&bbox={bbox-epsg-3857}&width=768&height=558&srs=EPSG:3857&styles=&format=image/png&transparent=true'
        ],
        'tileSize': 256
    });

    map.addLayer({
        'id': 'kohistan',
        'type': 'raster',
        'source': 'kohistan',
        'paint': { 'raster-opacity': 0.7 },
        'layout': { 'visibility': 'none' } // Set to 'none' initially
    });


    map.addSource('hindukush', {
        'type': 'raster',
        'tiles': [
            'http://172.18.1.37:8080/geoserver/minerals_final/wms?service=WMS&version=1.1.0&request=GetMap&layers=Hindukush&bbox={bbox-epsg-3857}&width=768&height=558&srs=EPSG:3857&styles=&format=image/png&transparent=true'
        ],
        'tileSize': 256
    });

    map.addLayer({
        'id': 'hindukush',
        'type': 'raster',
        'source': 'hindukush',
        'paint': { 'raster-opacity': 0.7 },
        'layout': { 'visibility': 'none' } // Set to 'none' initially
    });


    map.addSource('faultline', {
        'type': 'raster',
        'tiles': [
            'http://172.18.1.37:8080/geoserver/minerals_final/wms?service=WMS&version=1.1.0&request=GetMap&layers=pakistan_faults&bbox={bbox-epsg-3857}&width=768&height=558&srs=EPSG:3857&styles=&format=image/png&transparent=true'
        ],
        'tileSize': 256
    });

    map.addLayer({
        'id': 'faultline',
        'type': 'raster',
        'source': 'faultline',
        'paint': { 'raster-opacity': 1 },
        'layout': { 'visibility': 'none' }, // Set to 'none' initially
        
    });

    map.addSource('pga', {
        'type': 'raster',
        'tiles': [
            'http://172.18.1.37:8080/geoserver/minerals_final/wms?service=WMS&version=1.1.0&request=GetMap&layers=pga&bbox={bbox-epsg-3857}&width=768&height=558&srs=EPSG:3857&styles=&format=image/png&transparent=true'
        ],
        'tileSize': 256
    });

    map.addLayer({
        'id': 'pga',
        'type': 'raster',
        'source': 'pga',
        'paint': { 'raster-opacity': 0.6 },
        'layout': { 'visibility': 'none' } // Set to 'none' initially
    });

    map.addSource('gb', {
        'type': 'raster',
        'tiles': [
            'http://172.18.1.4:8080/geoserver/areej_fatima/wms?service=WMS&version=1.1.0&request=GetMap&layers=areej_fatima:LANDSLIDE_MAP_AJKGB&bbox={bbox-epsg-3857}&width=768&height=558&srs=EPSG:3857&styles=&format=image/png&transparent=true'
        ],
        'tileSize': 256
    });

    map.addLayer({
        'id': 'gb',
        'type': 'raster',
        'source': 'gb',
        'paint': { 'raster-opacity': 0.8 },
        'layout': { 'visibility': 'none' } // Set to 'none' initially
    });
   
        map.addSource('kpk', {
            'type': 'raster',
            'tiles': [
                'http://172.18.1.4:8080/geoserver/areej_fatima/wms?service=WMS&version=1.1.0&request=GetMap&layers=areej_fatima:Landslide1&bbox={bbox-epsg-3857}&width=768&height=558&srs=EPSG:3857&styles=&format=image/png&transparent=true'
            ],
            'tileSize': 256
        });
    
        map.addLayer({
            'id': 'kpk',
            'type': 'raster',
            'source': 'kpk',
            'paint': { 'raster-opacity': 0.8 },
            'layout': { 'visibility': 'none' } // Set to 'none' initially
        });
    
       
            map.addSource('balo', {
                'type': 'raster',
                'tiles': [
                    'http://172.18.1.4:8080/geoserver/areej_fatima/wms?service=WMS&version=1.1.0&request=GetMap&layers=areej_fatima:Landslide_zonation_Bal1&bbox={bbox-epsg-3857}&width=768&height=558&srs=EPSG:3857&styles=&format=image/png&transparent=true'
                ],
                'tileSize': 256
            });
        
            map.addLayer({
                'id': 'balo',
                'type': 'raster',
                'source': 'balo',
                'paint': { 'raster-opacity': 0.8 },
                'layout': { 'visibility': 'none' } // Set to 'none' initially
            });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            map.loadImage(
                'https://i.ibb.co/y5jxZf3/Pngtree-mountain-landslide-warning-icon-4728272-removebg-preview.png',
                (error, image) => {
                    if (error) throw error;
        
                    // Add the image to the map style.
                    map.addImage('cat', image);
        
                    // Add a data source containing one point feature.
                    map.addSource('point102', {
                        'type': 'geojson',
                        'data': final_inventories
        
                    });
        
                    // Add a layer to use the image to represent the data.
                    map.addLayer({
                        'id': 'points102',
                        'type': 'symbol',
                        'source': 'point102', // reference the data source
                       
                        'layout': {
                            'icon-image': 'cat', // reference the image
                            'icon-size': 0.05,
                            'visibility': 'none'
                        }
                    });
                }
            );
 // Adding sources and layers with initial visibility set to 'none'
 map.addSource('indundation_ten', {
    'type': 'raster',
    'tiles': [
        'http://172.18.1.37:8080/geoserver/punjab_flood/wms?service=WMS&version=1.1.0&request=GetMap&layers=ten&bbox={bbox-epsg-3857}&width=768&height=558&srs=EPSG:3857&styles=&format=image/png&transparent=true'

    ],
    'tileSize': 256
});

map.addLayer({
    'id': 'indundation_ten',
    'type': 'raster',
    'source': 'indundation_ten',
    'paint': { 'raster-opacity': 0.7 },
    'layout': { 'visibility': 'none' }
});
map.addSource('indundation_eleven', {
    'type': 'raster',
    'tiles': [
        'http://172.18.1.37:8080/geoserver/punjab_flood/wms?service=WMS&version=1.1.0&request=GetMap&layers=eleven&bbox={bbox-epsg-3857}&width=768&height=558&srs=EPSG:3857&styles=&format=image/png&transparent=true'

    ],
    'tileSize': 256
});

map.addLayer({
    'id': 'indundation_eleven',
    'type': 'raster',
    'source': 'indundation_eleven',
    'paint': { 'raster-opacity': 0.7 },
    'layout': { 'visibility': 'none' }
});


map.addSource('indundation_twelve', {
    'type': 'raster',
    'tiles': [
        'http://172.18.1.37:8080/geoserver/punjab_flood/wms?service=WMS&version=1.1.0&request=GetMap&layers=twelve&bbox={bbox-epsg-3857}&width=768&height=558&srs=EPSG:3857&styles=&format=image/png&transparent=true'

    ],
    'tileSize': 256
});

map.addLayer({
    'id': 'indundation_twelve',
    'type': 'raster',
    'source': 'indundation_twelve',
    'paint': { 'raster-opacity': 0.7 },
    'layout': { 'visibility': 'none' }
});

  // Adding sources and layers with initial visibility set to 'none'
  map.addSource('indundation_thirteen', {
    'type': 'raster',
    'tiles': [
        'http://172.18.1.37:8080/geoserver/punjab_flood/wms?service=WMS&version=1.1.0&request=GetMap&layers=thirteen&bbox={bbox-epsg-3857}&width=768&height=558&srs=EPSG:3857&styles=&format=image/png&transparent=true'

    ],
    'tileSize': 256
});

map.addLayer({
    'id': 'indundation_thirteen',
    'type': 'raster',
    'source': 'indundation_thirteen',
    'paint': { 'raster-opacity': 0.7 },
    'layout': { 'visibility': 'none' }
});


map.addSource('indundation_forteen', {
    'type': 'raster',
    'tiles': [
        'http://172.18.1.37:8080/geoserver/punjab_flood/wms?service=WMS&version=1.1.0&request=GetMap&layers=fourteen&bbox={bbox-epsg-3857}&width=768&height=558&srs=EPSG:3857&styles=&format=image/png&transparent=true'

    ],
    'tileSize': 256
});

map.addLayer({
    'id': 'indundation_forteen',
    'type': 'raster',
    'source': 'indundation_forteen',
    'paint': { 'raster-opacity': 0.7 },
    'layout': { 'visibility': 'none' }
});

 // Adding sources and layers with initial visibility set to 'none'
 map.addSource('indundation_fifteen', {
    'type': 'raster',
    'tiles': [
        'http://172.18.1.37:8080/geoserver/punjab_flood/wms?service=WMS&version=1.1.0&request=GetMap&layers=fifteen&bbox={bbox-epsg-3857}&width=768&height=558&srs=EPSG:3857&styles=&format=image/png&transparent=true'

    ],
    'tileSize': 256
});

map.addLayer({
    'id': 'indundation_fifteen',
    'type': 'raster',
    'source': 'indundation_fifteen',
    'paint': { 'raster-opacity': 0.7 },
    'layout': { 'visibility': 'none' }
});
 // Adding sources and layers with initial visibility set to 'none'
 map.addSource('indundation_twentytwo', {
    'type': 'raster',
    'tiles': [
        'http://172.18.1.37:8080/geoserver/punjab_flood/wms?service=WMS&version=1.1.0&request=GetMap&layers=2022flood&bbox={bbox-epsg-3857}&width=768&height=558&srs=EPSG:3857&styles=&format=image/png&transparent=true'

    ],
    'tileSize': 256
});

map.addLayer({
    'id': 'indundation_twentytwo',
    'type': 'raster',
    'source': 'indundation_twentytwo',
    'paint': { 'raster-opacity': 0.7 },
    'layout': { 'visibility': 'none' }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 // Adding sources and layers with initial visibility set to 'none'

    map.addSource('lulc', {
        'type': 'raster',
        'tiles': ['https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi?SERVICE=WMS&REQUEST=GetMap&LAYERS=MODIS_Combined_L3_IGBP_Land_Cover_Type_Annual&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}'],
        'tileSize': 256
    });

    map.addLayer({
        'id': 'lulc1',
        'type': 'raster',
        'source': 'lulc',
        'paint': { 'raster-opacity': 0.7 },
    });

    // Set the default visibility of the soil layer to 'none'
    map.setLayoutProperty('lulc1', 'visibility', 'none');
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
map.addSource('affected_areas', {
    'type': 'raster',
    'tiles': [
        'http://172.18.1.37:8080/geoserver/minerals_final/wms?service=WMS&version=1.1.0&request=GetMap&layers=minerals_final:final_areasthis_circlw&bbox={bbox-epsg-3857}&width=256&height=256&srs=EPSG:3857&styles=&format=image/png&transparent=true'
    ],
    'tileSize': 256
});

map.addLayer({
    'id': 'affected_areas1',
    'type': 'raster',
    'source': 'affected_areas',
    'paint': { 'raster-opacity': 1 }
});

// Set the default visibility of the soil layer to 'none'
map.setLayoutProperty('affected_areas1', 'visibility', 'none');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
map.addSource('affected_areas_final', {
    'type': 'raster',
    'tiles': [
        'http://172.18.1.37:8080/geoserver/minerals_final/wms?service=WMS&version=1.1.0&request=GetMap&layers=Predicted_Cave_In_(8.1)_-_Reko_Diq_—_Predicted_Cave_In_(8.1)_-_Reko_Diq&bbox={bbox-epsg-3857}&width=256&height=256&srs=EPSG:3857&styles=&format=image/png&transparent=true'
    ],
    'tileSize': 256
});

map.addLayer({
    'id': 'affected_areas1_final',
    'type': 'raster',
    'source': 'affected_areas_final',
    'paint': { 'raster-opacity': 1 }
});

// Set the default visibility of the soil layer to 'none'
map.setLayoutProperty('affected_areas1_final', 'visibility', 'none');
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
map.addSource('affected_areas_final_2', {
    'type': 'raster',
    'tiles': [
        'http://172.18.1.37:8080/geoserver/minerals_final/wms?service=WMS&version=1.1.0&request=GetMap&layers=8.3_to_8.4_-_Sandaik_mine_hazard_—_8.3_to_8.4_-_Sandaik_mine_hazard&bbox={bbox-epsg-3857}&width=256&height=256&srs=EPSG:3857&styles=&format=image/png&transparent=true'
    ],
    'tileSize': 256
});

map.addLayer({
    'id': 'affected_areas1_final_2',
    'type': 'raster',
    'source': 'affected_areas_final_2',
    'paint': { 'raster-opacity': 1 }
});

// Set the default visibility of the soil layer to 'none'
map.setLayoutProperty('affected_areas1_final_2', 'visibility', 'none');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
map.loadImage(
    'https://i.ibb.co/9g0hsGG/mine-3639720.png',
    (error, image) => {
        if (error) throw error;

        // Add the image to the map style.
        map.addImage('mines', image);

        // Add a data source containing one point feature.
        map.addSource('balo_mines', {
            'type': 'geojson',
            'data': balo_mines
        });

        // Add a layer to use the image to represent the data.
        map.addLayer({
            'id': 'balo_mines',
            'type': 'symbol',
            'source': 'balo_mines', // reference the data source
           
            'layout': {
                'icon-image': 'mines',
                'icon-size': 0.10,
                'visibility': 'none',
                'text-field': ['get', 'Name'],
                'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
                'text-radial-offset': 0.5,
                'text-justify': 'auto',
                'text-font': ['Open Sans Bold'], // Ensure the font is available
                
            },
            'paint': {
                'text-color': '#0000FF' // Specify the color under 'paint'
            }
        });
    }

);

map.on('load', () => {
    // Add a GeoJSON source containing place coordinates and information.
    map.addSource('places', {
        'type': 'geojson',
        'data': places
    });

    map.addLayer({
        'id': 'poi-labels',
        'type': 'symbol',
        'source': 'places',
        'layout': {
            'text-field': ['get', 'description'],
            'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
            'text-radial-offset': 0.5,
            'text-justify': 'auto',
            'icon-image': ['get', 'icon']
        }
    });

    map.rotateTo(180, { duration: 10000 });
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  });



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const categoryIcons = {
    "Amphibolites": "https://i.ibb.co/QX100PP/icon1.png",
    "Antimony": "https://i.ibb.co/r06Crfm/icon2.png",
    "Barytes": "https://i.ibb.co/KVh2N1P/icon3.png",
    "Bentonite": "https://i.ibb.co/KNZtZhX/icon4.png",
    "Boulangerite": "https://i.ibb.co/Pj7P2qz/icon5.png",
    "Calcite": "https://i.ibb.co/pW7RF92/icon6.png",
    "China Clay": "https://i.ibb.co/XLvNq1m/icon7.png",
    "Chromite": "https://i.ibb.co/k30kx4V/icon8.png",
    "Coal": "https://i.ibb.co/cXQxZST/icon9.png",
    "Copper": "https://i.ibb.co/094gXgD/icon10.png",
    "Dolomite": "https://i.ibb.co/4ZSqBwr/icon11.png",
    "Emerald ( grams)": "https://i.ibb.co/2hMP6Gy/icon12.png",
    "Feldspar": "https://i.ibb.co/xYh63CK/icon13.png",
    "Fire Clay": "https://i.ibb.co/NyNqxFZ/icon14.png",
    "Flourite": "https://i.ibb.co/D5Mtdh7/icon16.png",
    "Garnitic Schist": "https://i.ibb.co/0mWzv91/icon18.png",
    "Granite (Black)": "https://i.ibb.co/pQXvv5G/icon19.png",
    "Granite (others)": "https://i.ibb.co/pQXvv5G/icon19.png",
    "Graphite": "https://i.ibb.co/VYq8fbM/icon20.png",
    "Gypsum": "https://i.ibb.co/M5MVNVQ/icoon26.png",
    "Iron ore": "https://i.ibb.co/JBbx8Cm/icon30.png",
    "Jade": "https://i.ibb.co/grLDsMD/icon28.png",
    "Laterite": "https://i.ibb.co/5FQ1M13/icon27.png",
    "Lead": "https://i.ibb.co/J3snFJt/icon26.png",
    "Limestone (others)": "https://i.ibb.co/wK8yrY2/icon23.png",
    "Magnesite": "https://i.ibb.co/fpBdFnd/cuboid.png",
    "Marble (Other)": "https://i.ibb.co/BqgZnnR/circular-shape.png",
    "Nephrite": "https://i.ibb.co/r73jybP/plo.png",
    "Phosphate": "https://i.ibb.co/sj3S8LZ/klmn.png",
    "Potash": "https://i.ibb.co/GQkYYZZ/Rock-Salt.png",
    "Quartz": "https://i.ibb.co/GQkYYZZ/Rock-Salt.png",
    "Quartzite": "https://i.ibb.co/GQkYYZZ/Rock-Salt.png",
    "Rock Salt": "https://i.ibb.co/GQkYYZZ/Rock-Salt.png",
    "Sand Stone (Others)": "https://i.ibb.co/GQkYYZZ/Rock-Salt.png",
    "Serpentine": "https://i.ibb.co/GQkYYZZ/Rock-Salt.png",
    "Shale Clay (Others)": "https://i.ibb.co/GQkYYZZ/Rock-Salt.png",
    "Silica": "https://i.ibb.co/GQkYYZZ/Rock-Salt.png",
    "Silica Quartz": "https://i.ibb.co/GQkYYZZ/Rock-Salt.png",
    "Silica Sand": "https://i.ibb.co/GQkYYZZ/Rock-Salt.png",
    "Slate Stone (Others)": "https://i.ibb.co/GQkYYZZ/Rock-Salt.png",
    "Soap Stone": "https://i.ibb.co/GQkYYZZ/Rock-Salt.png"

};
const addedImages = new Set();
const imagePromises = [];

const createIconWithCircle = (imgUrl, iconName) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const size = 64;  // Setting size to 64x64 to meet power of two requirement
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');

            // Draw black circle
            ctx.beginPath();
            ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.01)';

            ctx.fill();

            // Draw the image on top of the black circle
            const imgSize = size * 0.8; // Adjust the size of the image
            ctx.drawImage(img, (size - imgSize) / 2, (size - imgSize) / 2, imgSize, imgSize);

            const imgData = ctx.getImageData(0, 0, size, size);
            map.addImage(iconName, imgData);
            resolve();
        };
        img.onerror = reject;
        img.src = imgUrl;
    });
};

Object.keys(categoryIcons).forEach(Name_of_Mi => {
    if (!addedImages.has(Name_of_Mi)) {
        const imagePromise = createIconWithCircle(categoryIcons[Name_of_Mi], Name_of_Mi);
        imagePromises.push(imagePromise);
        addedImages.add(Name_of_Mi);
    }
});

Promise.all(imagePromises).then(() => {
    console.log("All images loaded successfully.");
    map.on('load', () => {
        map.addSource("places", {
            type: "geojson",
            data: kpkminerals
        });

        console.log("GeoJSON source added.");

        map.addLayer({
            id: "tourism-points",
            type: "symbol",
            source: "places",
            layout: {
                "icon-image": ["get", "Name_of_Mi"],
                "icon-size": 0.8,
                "icon-allow-overlap": true,
                "visibility": 'none',
                "text-field": ["get", "Name_of_Mi"],
                "text-variable-anchor": ["top", "bottom", "left", "right"],
                "text-radial-offset": 0.5,
                "text-justify": "auto",
                "text-font": ["Open Sans Bold"] // Ensure the font is available
            },
            paint: {
                "text-color": "#0000FF" // Specify the color under 'paint'
            }
        });

        console.log("Tourism points layer added.");
    });
}).catch(error => {
    console.error("Error loading one or more images:", error);
});

console.log("GeoJSON Data:", kpkminerals);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const categoryIcons2 = {
    "Rock-Salt": "https://i.ibb.co/GQkYYZZ/Rock-Salt.png",
    "Potash-Brine": "https://i.ibb.co/GQkYYZZ/Rock-Salt.png",
    "Limestone": "https://i.ibb.co/wK8yrY2/icon23.png",
    "Iron-Ore": "https://i.ibb.co/JBbx8Cm/icon30.png",
    "Argillaceous-Clay": "https://i.ibb.co/2hMP6Gy/icon12.png",
    "Gypsum": "https://i.ibb.co/M5MVNVQ/icoon26.png",
    "Coal": "https://i.ibb.co/BTfpzrm/triangle.png",
    "Latrite": "https://i.ibb.co/M5MVNVQ/icoon26.png",
    "Bauxite": "https://i.ibb.co/Pj7P2qz/icon5.png",   
    "Bentonite": "https://i.ibb.co/KNZtZhX/icon4.png",
    "Fireclay": "https://i.ibb.co/NyNqxFZ/icon14.png",
    "Silica-Sand": "https://i.ibb.co/GQkYYZZ/Rock-Salt.png",
    "China-Clay": "https://i.ibb.co/XLvNq1m/icon7.png",
    "Ocher": "https://i.ibb.co/QX100PP/icon1.png",  
};

const addedImages1 = new Set();
const imagePromises1 = [];

const createIconWithCircle1 = (imgUrl, iconName) => {
    return new Promise((resolve, reject) => {
        if (!imgUrl || imgUrl.trim() === "") {
            resolve(); // Skip empty or invalid URLs
            return;
        }

        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const size = 64;  // Setting size to 64x64 to meet power of two requirement
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');

            // Draw black circle
            ctx.beginPath();
            ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.01)';
            ctx.fill();

            // Draw the image on top of the black circle
            const imgSize = size * 0.8; // Adjust the size of the image
            ctx.drawImage(img, (size - imgSize) / 2, (size - imgSize) / 2, imgSize, imgSize);

            const imgData = ctx.getImageData(0, 0, size, size);

            // Check if the image already exists before adding
            if (!map.hasImage(iconName)) {
                map.addImage(iconName, imgData);
                resolve();
            } else {
                resolve();
            }
        };
        img.onerror = reject;
        img.src = imgUrl;
    });
};

Object.keys(categoryIcons2).forEach(Mineral_Na => {
    if (!addedImages1.has(Mineral_Na)) {
        const imagePromise1 = createIconWithCircle1(categoryIcons2[Mineral_Na], Mineral_Na);
        imagePromises1.push(imagePromise1);
        addedImages1.add(Mineral_Na);
    }
});

Promise.all(imagePromises1).then(() => {
    console.log("All images loaded successfully.");
    map.on('load', () => {
        map.addSource("places1", {
            type: "geojson",
            data: punjab_minerals
        });

        console.log("GeoJSON source added.");

        map.addLayer({
            id: "tourism-points1",
            type: "symbol",
            source: "places1",
            layout: {
                "icon-image": ["get", "Mineral_Na"],
                "icon-size": 0.8,
                "icon-allow-overlap": true,
                "visibility": "visible", // Ensure it's visible initially
                "text-field": ["get", "Mineral_Na"],
                "text-variable-anchor": ["top", "bottom", "left", "right"],
                "text-radial-offset": 0.5,
                "text-justify": "auto",
                "text-font": ["Open Sans Bold"], // Ensure the font is available
                'visibility': 'none'

            },
            paint: {
                "text-color": "#0000FF" // Specify the color under 'paint'
            }
        });

        console.log("Tourism points layer added.");

        // Attach the event listener after the map and layer are fully loaded
       
    });
}).catch(error => {
    console.error("Error loading one or more images:", error);
});

console.log("GeoJSON Data:", punjab_minerals);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const categoryIcons3 = {
//     "COAL": " ",
//     "MARBLE": "https://i.ibb.co/BqgZnnR/circular-shape.png",
//     "Serpentine": "https://i.ibb.co/GQkYYZZ/Rock-Salt.png",
//     "Iron Ore": "https://i.ibb.co/JBbx8Cm/icon30.png",
//     "Chromite": "https://i.ibb.co/k30kx4V/icon8.png",
//     "Gemstone": "https://i.ibb.co/QX100PP/icon1.png",
//     "Mangnacite": "https://i.ibb.co/XLvNq1m/icon7.png",
//     "Barite": "",
//     "Pumice": "",
//     "Mangnese": "",
//     "Antimony": "https://i.ibb.co/r06Crfm/icon2.png",
//     "Anarthosite": " ",
//     "Agglomerate": " ",
//     "Marble Oynx": "",
//     "Sulphar": " ",
//     "Granite": "https://i.ibb.co/pQXvv5G/icon19.png",
//     "Granodiorite": "",
//     "Flourite": "https://i.ibb.co/D5Mtdh7/icon16.png",
//     "Copper Ore": " ",
//     "Copper  Finshed Product Saindak": "",
//     "Au (oz) Saindak": " ",
//     "Diorite": "",
//     "Rhyolite": " ",
//     "Gneiss": " ",
//     "Galina": " ",
//     "Clay": " ",
//     "Gabro": " ",
//     "Quartize": " ",
//     "Quartzite": "https://i.ibb.co/GQkYYZZ/Rock-Salt.png",
//     "Mica": " ",
//     "Dolomite": "https://i.ibb.co/4ZSqBwr/icon11.png",
//     "Conglomerate": " ",
//     "Ordinary Stone": " ",
//     "Basalt": " ",
//     "Limestone": "https://i.ibb.co/wK8yrY2/icon23.png",
//     "Shale": " ",
//     "Travertine": "",
//     "Calcite": "https://i.ibb.co/pW7RF92/icon6.png",
//     "Lead/Zinc. (pb+zn concentrate Tons)": " ",
//     "Lead/Zinc. (pb+zn metal  Tons)": "",
//     "Copper Ore": "https://i.ibb.co/BTfpzrm/triangle.png",
//     "Marble Oynx": "https://i.ibb.co/BTfpzrm/triangle.png",
// };

// const addedImages3 = new Set();
// const imagePromises3 = [];

// const createIconWithCircle3 = (imgUrl, iconName) => {
//     return new Promise((resolve, reject) => {
//         if (!imgUrl || imgUrl.trim() === "") {
//             resolve(); // Skip empty or invalid URLs
//             return;
//         }

//         const img = new Image();
//         img.crossOrigin = 'Anonymous';
//         img.onload = () => {
//             const canvas = document.createElement('canvas');
//             const size = 64;  // Setting size to 64x64 to meet power of two requirement
//             canvas.width = size;
//             canvas.height = size;
//             const ctx = canvas.getContext('2d');

//             // Draw black circle
//             ctx.beginPath();
//             ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
//             ctx.fillStyle = 'rgba(0, 0, 0, 0.01)';
//             ctx.fill();

//             // Draw the image on top of the black circle
//             const imgSize = size * 0.8; // Adjust the size of the image
//             ctx.drawImage(img, (size - imgSize) / 2, (size - imgSize) / 2, imgSize, imgSize);

//             const imgData = ctx.getImageData(0, 0, size, size);

//             // Check if the image already exists before adding
//             if (!map.hasImage(iconName)) {
//                 map.addImage(iconName, imgData);
//                 resolve();
//             } else {
//                 resolve();
//             }
//         };
//         img.onerror = reject;
//         img.src = imgUrl;
//     });
// };

// Object.keys(categoryIcons3).forEach(Name => {
//     if (!addedImages3.has(Name)) {
//         const imagePromise3 = createIconWithCircle3(categoryIcons3[Name], Name);
//         imagePromises3.push(imagePromise3);
//         addedImages3.add(Name);
//     }
// });

// Promise.all(imagePromises3).then(() => {
//     console.log("All images loaded successfully.");
//     map.on('load', () => {
//         map.addSource("places89", {
//             type: "geojson",
//             data: balochistan_minerals
//         });

//         console.log("GeoJSON source added.");

//         map.addLayer({
//             id: "tourism-points3",
//             type: "symbol",
//             source: "places89",
//             layout: {
//                 "icon-image": ["get", "Name"],
//                 "icon-size": 0.8,
//                 "icon-allow-overlap": true,
//                 "visibility": "visible", // Ensure it's visible initially
//                 "text-field": ["get", "Name"],
//                 "text-variable-anchor": ["top", "bottom", "left", "right"],
//                 "text-radial-offset": 0.5,
//                 "text-justify": "auto",
//                 "text-font": ["Open Sans Bold"], // Ensure the font is available
//             },
//             paint: {
//                 "text-color": "#0000FF" // Specify the color under 'paint'
//             }
//         });

//         console.log("Tourism points layer added.");
//     });
// }).catch(error => {
//     console.error("Error loading one or more images:", error);
// });
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const categoryIcons23 = {
    "COAL": " ",
        "MARBLE": "https://i.ibb.co/BqgZnnR/circular-shape.png",
        "Serpentine": "https://i.ibb.co/GQkYYZZ/Rock-Salt.png",
        "Iron Ore": "https://i.ibb.co/JBbx8Cm/icon30.png",
        "Chromite": "https://i.ibb.co/k30kx4V/icon8.png",
        "Gemstone": "https://i.ibb.co/QX100PP/icon1.png",
        "Mangnacite": "https://i.ibb.co/XLvNq1m/icon7.png",
        "Barite": "https://i.ibb.co/pQXvv5G/icon19.png",
        "Pumice": "https://i.ibb.co/QX100PP/icon1.png",
        "Mangnese": "https://i.ibb.co/KNZtZhX/icon4.png",
        "Antimony": "https://i.ibb.co/r06Crfm/icon2.png",
        "Anarthosite": "https://i.ibb.co/QX100PP/icon1.png",
        "Agglomerate": "https://i.ibb.co/4ZSqBwr/icon11.png",
        "Marble Oynx": "https://i.ibb.co/pQXvv5G/icon19.png",
        "Sulphar": "https://i.ibb.co/QX100PP/icon1.png",
        "Granite": "https://i.ibb.co/pQXvv5G/icon19.png",
        "Granodiorite": "https://i.ibb.co/KNZtZhX/icon4.png",
        "Flourite": "https://i.ibb.co/D5Mtdh7/icon16.png",
        "Copper Ore": "https://i.ibb.co/KNZtZhX/icon4.png",
        "Copper  Finshed Product Saindak": "https://i.ibb.co/KNZtZhX/icon4.png",
        "Au (oz) Saindak": "https://i.ibb.co/KNZtZhX/icon4.png",
        "Diorite": "https://i.ibb.co/pQXvv5G/icon19.png",
        "Rhyolite": "https://i.ibb.co/4ZSqBwr/icon11.png",
        "Gneiss": "https://i.ibb.co/KNZtZhX/icon4.png",
        "Galina": "https://i.ibb.co/KNZtZhX/icon4.png",
        "Clay": "https://i.ibb.co/QX100PP/icon1.png",
        "Gabro": "https://i.ibb.co/KNZtZhX/icon4.png",
        "Quartize": "https://i.ibb.co/KNZtZhX/icon4.png ",
        "Quartzite": "https://i.ibb.co/GQkYYZZ/Rock-Salt.png",
        "Mica": "https://i.ibb.co/KNZtZhX/icon4.png",
        "Dolomite": "https://i.ibb.co/4ZSqBwr/icon11.png",
        "Conglomerate": "https://i.ibb.co/pQXvv5G/icon19.png",
        "Ordinary Stone": "https://i.ibb.co/xYh63CK/icon13.png",
        "Basalt": "https://i.ibb.co/pQXvv5G/icon19.png",
        "Limestone": "https://i.ibb.co/wK8yrY2/icon23.png",
        "Shale": "https://i.ibb.co/BTfpzrm/triangle.png",
        "Travertine": "https://i.ibb.co/VYq8fbM/icon20.png",
        "Calcite": "https://i.ibb.co/pW7RF92/icon6.png",
        "Lead/Zinc. (pb+zn concentrate Tons)": "https://i.ibb.co/BqgZnnR/circular-shape.png",
        "Lead/Zinc. (pb+zn metal  Tons)": "https://i.ibb.co/KNZtZhX/icon4.png",
        "Copper Ore": "https://i.ibb.co/BTfpzrm/triangle.png",
        "Marble Oynx": "https://i.ibb.co/BTfpzrm/triangle.png",
};

const addedImages13 = new Set();
const imagePromises13 = [];

const createIconWithCircle13 = (imgUrl, iconName) => {
    return new Promise((resolve, reject) => {
        if (!imgUrl || imgUrl.trim() === "") {
            resolve(); // Skip empty or invalid URLs
            return;
        }

        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const size = 64;  // Setting size to 64x64 to meet power of two requirement
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');

            // Draw black circle
            ctx.beginPath();
            ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.01)';
            ctx.fill();

            // Draw the image on top of the black circle
            const imgSize = size * 0.8; // Adjust the size of the image
            ctx.drawImage(img, (size - imgSize) / 2, (size - imgSize) / 2, imgSize, imgSize);

            const imgData = ctx.getImageData(0, 0, size, size);

            // Check if the image already exists before adding
            if (!map.hasImage(iconName)) {
                map.addImage(iconName, imgData);
                resolve();
            } else {
                resolve();
            }
        };
        img.onerror = reject;
        img.src = imgUrl;
    });
};

Object.keys(categoryIcons23).forEach(Name => {
    if (!addedImages13.has(Name)) {
        const imagePromise13 = createIconWithCircle13(categoryIcons23[Name], Name);
        imagePromises13.push(imagePromise13);
        addedImages13.add(Name);
    }
});

Promise.all(imagePromises13).then(() => {
    console.log("All images loaded successfully.");
    map.on('load', () => {
        map.addSource("places13", {
            type: "geojson",
            data: balochistan_minerals
        });

        console.log("GeoJSON source added.");

        map.addLayer({
            id: "tourism-points13",
            type: "symbol",
            source: "places13",
            layout: {
                "icon-image": ["get", "Name"],
                "icon-size": 0.8,
                "icon-allow-overlap": true,
                "visibility": "visible", // Ensure it's visible initially
                "text-field": ["get", "Name"],
                "text-variable-anchor": ["top", "bottom", "left", "right"],
                "text-radial-offset": 0.5,
                "text-justify": "auto",
                "text-font": ["Open Sans Bold"], // Ensure the font is available
                'visibility': 'none'

            },
            paint: {
                "text-color": "#0000FF" // Specify the color under 'paint'
            }
        });

        console.log("Tourism points layer added.");

        // Attach the event listener after the map and layer are fully loaded
       
    });
}).catch(error => {
    console.error("Error loading one or more images:", error);
});

console.log("GeoJSON Data:", balochistan_minerals);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const categoryIcons4 = {
"Ruby": " ",
"Graphite":"https://i.ibb.co/VYq8fbM/icon20.png",
"Tourmaline": "https://i.ibb.co/k30kx4V/icon8.png",
"Feldspar":"https://i.ibb.co/xYh63CK/icon13.png",
"Marble":"https://i.ibb.co/BqgZnnR/circular-shape.png",
"Soap Stone": "https://i.ibb.co/GQkYYZZ/Rock-Salt.png",
"Limonite":"https://i.ibb.co/XLvNq1m/icon7.png",
"Pyrite":"https://i.ibb.co/NyNqxFZ/icon14.png",
"Slate":"https://i.ibb.co/GQkYYZZ/Rock-Salt.png",
"Pozollana": "https://i.ibb.co/JBbx8Cm/icon30.png",
"Cement Material":"https://i.ibb.co/r06Crfm/icon2.png",
"Bauxite":"https://i.ibb.co/4ZSqBwr/icon11.png",
"Fireclay":"https://i.ibb.co/NyNqxFZ/icon14.png",
"Bentonite":"https://i.ibb.co/KNZtZhX/icon4.png",
  };
  
  const addedImages4 = new Set();
  const imagePromises4 = [];
  
  const createIconWithCircle4 = (imgUrl, iconName) => {
    return new Promise((resolve, reject) => {
      if (!imgUrl || imgUrl.trim() === "") {
        resolve(); // Skip empty or invalid URLs
        return;
      }
  
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const size = 64;  // Setting size to 64x64 to meet power of two requirement
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
  
        // Draw black circle
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.01)';
        ctx.fill();
  
        // Draw the image on top of the black circle
        const imgSize = size * 0.8; // Adjust the size of the image
        ctx.drawImage(img, (size - imgSize) / 2, (size - imgSize) / 2, imgSize, imgSize);
  
        const imgData = ctx.getImageData(0, 0, size, size);
  
        // Check if the image already exists before adding
        if (!map.hasImage(iconName)) {
          map.addImage(iconName, imgData);
          resolve();
        } else {
          resolve();
        }
      };
      img.onerror = reject;
      img.src = imgUrl;
    });
  };
  
  Object.keys(categoryIcons4).forEach(Id => {
    if (!addedImages4.has(Id)) {
      const imagePromise4 = createIconWithCircle4(categoryIcons4[Id], Id);
      imagePromises4.push(imagePromise4);
      addedImages4.add(Id);
    }
  });
  
  Promise.all(imagePromises4).then(() => {
    console.log("All images loaded successfully.");
    map.on('load', () => {
      map.addSource("places89", {
        type: "geojson",
        data: ajkminerals
      });
  
      console.log("GeoJSON source added.");
  
      map.addLayer({
        id: "tourism-points4",
        type: "symbol",
        source: "places89",
        layout: {
          "icon-image": ["get", "Ruby"],
          "icon-size": 0.8,
          "icon-allow-overlap": true,
          "text-field": ["get", "Ruby"],
          "text-variable-anchor": ["top", "bottom", "left", "right"],
          "text-radial-offset": 0.5,
          "text-justify": "auto",
          "text-font": ["Open Sans Bold"], // Ensure the font is available
          'visibility': 'none'

        },
        paint: {
          "text-color": "#0000FF" // Specify the color under 'paint'
        }
      });
  
      console.log("Tourism points layer added.");
  
      // Attach the event listener after the map and layer are fully loaded

    });
  }).catch(error => {
    console.error("Error loading one or more images:", error);
  });
  console.log("GeoJSON Data:ajkminerals",);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function to toggle layer visibility
function toggleLayersVisibility(layerIds) {
    layerIds.forEach(layerId => {
        const visibility = map.getLayoutProperty(layerId, 'visibility');
        map.setLayoutProperty(layerId, 'visibility', visibility === 'visible' ? 'none' : 'visible');
    });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // Add event listener for the button to toggle layer visibility
  document.getElementById('customSwitch101').addEventListener('click', function() {
      toggleLayersVisibility(['geology']);
  });

  document.getElementById('customSwitch102').addEventListener('click', function() {
      toggleLayersVisibility(['soiltype']);
  });
  document.getElementById('customSwitch1').addEventListener('click', function() {
    toggleLayersVisibility(['tourism-points']);
});

document.getElementById('customSwitch3').addEventListener('click', function() {
    toggleLayersVisibility(['tourism-points4']);
});

document.getElementById('customSwitch789').addEventListener('click', function() {
    toggleLayersVisibility(['tourism-points13']);
});
document.getElementById('customSwitch9').addEventListener('click', function() {
    toggleLayersVisibility(['South_balochistan', 'north_balochistan']);
});
document.getElementById('customSwitch20').addEventListener('click', function() {
    toggleLayersVisibility(['makran_cost']);
});
document.getElementById('customSwitch21').addEventListener('click', function() {
    toggleLayersVisibility(['kohistan']);
});
document.getElementById('customSwitch23').addEventListener('click', function() {
    toggleLayersVisibility(['hindukush']);
});
document.getElementById('customSwitch24').addEventListener('click', function() {
    toggleLayersVisibility(['faultline']);
});
document.getElementById('customSwitch25').addEventListener('click', function() {
    toggleLayersVisibility(['pga']);
});

document.getElementById('customSwitch301').addEventListener('click', function() {
    toggleLayersVisibility(['gb', 'kpk', 'balo']);
});
document.getElementById('customSwitch302').addEventListener('click', function() {
    toggleLayersVisibility(['points102']);
});

document.getElementById('customSwitch5').addEventListener('click', function() {
    toggleLayersVisibility(['tourism-points1']);
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.getElementById('customSwitch130').addEventListener('click', function() {
    toggleLayersVisibility(['indundation_ten']);
});
document.getElementById('customSwitch140').addEventListener('click', function() {
    toggleLayersVisibility(['indundation_eleven']);
});

document.getElementById('customSwitch142').addEventListener('click', function() {
    toggleLayersVisibility(['indundation_twelve']);
});

document.getElementById('customSwitch143').addEventListener('click', function() {
    toggleLayersVisibility(['indundation_thirteen']);
});

document.getElementById('customSwitch144').addEventListener('click', function() {
    toggleLayersVisibility(['indundation_forteen']);
});
document.getElementById('customSwitch145').addEventListener('click', function() {
    toggleLayersVisibility(['indundation_fifteen']);
});

document.getElementById('customSwitch146').addEventListener('click', function() {
    toggleLayersVisibility(['indundation_twentytwo']);
});

document.getElementById('customSwitch1003').addEventListener('click', function() {
    toggleLayersVisibility(['lulc1']);
});

document.getElementById('customSwitch909').addEventListener('click', function() {
    toggleLayersVisibility(['balo_mines']);
});
document.getElementById('customSwitch1234').addEventListener('change', function() {
    if (this.checked) {
      addMarkers();
    } else {
      removeMarkers();
    }
  });
// document.getElementById('customSwitch123').addEventListener('click', function() {
//     toggleLayersVisibility(['region-fills', 'region-borders']);
// });
var intervalId1, intervalId2;

// Toggle for affected_areas1 layer


// Toggle layers on and off with a single button
document.getElementById('customSwitch123').addEventListener('click', function() {
    const labelsVisibility = map.getLayoutProperty('region-labels', 'visibility');
    const bordersVisibility = map.getLayoutProperty('region-borders', 'visibility');
    const fillsVisibility = map.getLayoutProperty('region-fills', 'visibility');

    // Toggle visibility of all layers based on current state
    if (labelsVisibility === 'visible' && bordersVisibility === 'visible' && fillsVisibility === 'visible') {
        map.setLayoutProperty('region-labels', 'visibility', 'none');
        map.setLayoutProperty('region-borders', 'visibility', 'none');
        map.setLayoutProperty('region-fills', 'visibility', 'none');
    } else {
        map.setLayoutProperty('region-labels', 'visibility', 'visible');
        map.setLayoutProperty('region-borders', 'visibility', 'visible');
        map.setLayoutProperty('region-fills', 'visibility', 'visible');
    }
});


document.getElementById('customSwitch9090').addEventListener('click', function() {
    if (intervalId1) {
        clearInterval(intervalId1); // Clear the blinking interval if it's already running
        intervalId1 = null;
        map.setLayoutProperty('affected_areas1', 'visibility', 'none'); // Set layer visibility to 'none' when toggle is off
    } else {
        intervalId1 = setInterval(function() {
            const visibility = map.getLayoutProperty('affected_areas1', 'visibility');
            map.setLayoutProperty('affected_areas1', 'visibility', visibility === 'visible' ? 'none' : 'visible');
        }, 500); // Adjust blinking speed (in milliseconds) as needed
    }
});

var intervalId2; // Variable to hold the interval ID for affected_areas1_final2 layer

document.getElementById('customSwitch90900').addEventListener('click', function() {
    if (intervalId2) {
        clearInterval(intervalId2); // Clear the blinking interval if it's already running
        intervalId2 = null;
        map.setLayoutProperty('affected_areas1_final', 'visibility', 'none'); // Set affected_areas1_final visibility to 'none' when toggle is off
        map.setLayoutProperty('affected_areas1_final_2', 'visibility', 'none'); // Set affected_areas1_final2 visibility to 'none' when toggle is off
    } else {
        intervalId2 = setInterval(function() {
            const visibility1 = map.getLayoutProperty('affected_areas1_final', 'visibility');
            const visibility2 = map.getLayoutProperty('affected_areas1_final_2', 'visibility');
            
            map.setLayoutProperty('affected_areas1_final', 'visibility', visibility1 === 'visible' ? 'none' : 'visible');
            map.setLayoutProperty('affected_areas1_final_2', 'visibility', visibility2 === 'visible' ? 'none' : 'visible');
        }, 500); // Adjust blinking speed (in milliseconds) as needed
    }
});

// Assuming there's a button with ID 'toggleBlinkButton' in your HTML

  function toggleLayersVisibility(layerIds) {
      layerIds.forEach(layerId => {
          var layer = map.getLayer(layerId);
          if (!layer) return;

          var visibility = map.getLayoutProperty(layerId, 'visibility');
          if (visibility === 'visible') {
              map.setLayoutProperty(layerId, 'visibility', 'none');
          } else {
              map.setLayoutProperty(layerId, 'visibility', 'visible');
          }
      });
  }
  
});

document.getElementById('customSwitch26').addEventListener('click', function() {
    var popupWindow = document.getElementById('popupWindow');
    if (popupWindow.style.display === 'none' || popupWindow.style.display === '') {
        popupWindow.style.display = 'block';
    } else {
        popupWindow.style.display = 'none';
    }
});


document.getElementById('customSwitch808').addEventListener('click', function() {
    var popupWindow2 = document.getElementById('popupWindow2');
    if (popupWindow2.style.display === 'none' || popupWindow2.style.display === '') {
        popupWindow2.style.display = 'block';
    } else {
        popupWindow2.style.display = 'none';
    }
});

document.getElementById('customSwitch808').addEventListener('click', function() {
    var popupWindow3 = document.getElementById('popupWindow3');
    if (popupWindow3.style.display === 'none' || popupWindow3.style.display === '') {
        popupWindow3.style.display = 'block';
    } else {
        popupWindow3.style.display = 'none';
    }
});

document.getElementById('customSwitchP1079').addEventListener('click', function() {
    var popupWindow4 = document.getElementById('popupWindow4');
    if (popupWindow4.style.display === 'none' || popupWindow4.style.display === '') {
      popupWindow4.style.display = 'block';
    } else {
      popupWindow4.style.display = 'none';
    }
  });

  document.getElementById('customSwitchP10798').addEventListener('click', function() {
    var popupWindow5 = document.getElementById('popupWindow5');
    if (popupWindow5.style.display === 'none' || popupWindow5.style.display === '') {
      popupWindow5.style.display = 'block';
    } else {
      popupWindow5.style.display = 'none';
    }
  });
  document.getElementById('customSwitchP107981').addEventListener('click', function() {
    var popupWindow6 = document.getElementById('popupWindow6');
    if (popupWindow6.style.display === 'none' || popupWindow6.style.display === '') {
      popupWindow6.style.display = 'block';
    } else {
      popupWindow6.style.display = 'none';
    }
  });

  document.getElementById('customSwitchP1079').addEventListener('click', function() {
    var popupWindow7 = document.getElementById('popupWindow7');
    if (popupWindow7.style.display === 'none' || popupWindow7.style.display === '') {
      popupWindow7.style.display = 'block';
    } else {
      popupWindow7.style.display = 'none';
    }
  });
  document.getElementById('customSwitch90900').addEventListener('click', function() {
    var popupWindow7 = document.getElementById('popupWindow8');
    if (popupWindow7.style.display === 'none' || popupWindow7.style.display === '') {
      popupWindow7.style.display = 'block';
    } else {
      popupWindow7.style.display = 'none';
    }
  });

  document.getElementById('customSwitch101').addEventListener('click', function() {
    toggleLayersVisibility(['geology']);
    var popupWindow9 = document.getElementById('popup-window9');
    if (popupWindow9.style.display === 'none' || popupWindow9.style.display === '') {
      popupWindow9.style.display = 'block';
    } else {
      popupWindow9.style.display = 'none';
    }
  });