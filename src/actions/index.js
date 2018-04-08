import GoogleMapsLoader from 'google-maps';
import { MAP_INITIALIZED } from '../constants'


// Setup google maps api
GoogleMapsLoader.LIBRARIES = ['places'];
GoogleMapsLoader.KEY = 'AIzaSyDtuwsuOlHZYkxN5PRE7F7oB4H01Jop5s0';


// Remote actions
const mapInitialized = () => ({ type: MAP_INITIALIZED })


// Local actions
export const loadMap = (div, input) => dispatch => {
  // Fetch google lib
  GoogleMapsLoader.load(google => {

    // Create the map
    const map = new google.maps.Map(div, {
      zoom: 2.25,
      mapTypeId: 'roadmap',
      center: { lat: 23, lng: -18 }
    });

    // Create the search-box
    const searchBox = new google.maps.places.SearchBox(input);

    // Tell the store we have loaded the map ok
    dispatch(mapInitialized());

    // Placeholder for a marker
    let marker = null;

    // Add a listener for a user selecting a place
    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();

      // Guard against no matches
      if (places && places.length === 0) return;

      // Just focus on the first place
      const place = places[0];

      if (!place.geometry) return;

      // Set the map bounds - focus in on result
      const bounds = new google.maps.LatLngBounds();
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport); // Only geocodes have viewport.
      } else {
        bounds.extend(place.geometry.location);
      }
      map.fitBounds(bounds);

      // Get rid of old marker
      if (marker) { marker.setMap(null); }

      // Create a marker.
      marker = new google.maps.Marker({
        map: map,
        title: place.name,
        position: place.geometry.location
      });

      // Show a message when the user clicks on the marker
      const infoWindow = new google.maps.InfoWindow({
        content: place.name
      });
      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
    });
  });
}
