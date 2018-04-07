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

    // Update store with state
    dispatch(mapInitialized());

    // Placeholder for a marker
    let marker = null;

    // Add relivant listeners to the search-box
    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();

      // Guard against bugs
      if (places && places.length === 0) return;

      // Just focus on the first place
      const place = places[0];

      // Check. TODO
      if (!place.geometry) return;

      // Set the map bounds - focus in on result
      const bounds = new google.maps.LatLngBounds();
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport); // Only geocodes have viewport.
      } else {
        bounds.extend(place.geometry.location);
      }
      map.fitBounds(bounds);

      // Get the icon, name and location.
      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Get rid of old marker
      if (marker) {
        marker.setMap(null);
      }

      // Create a marker.
      marker = new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      });
    });
  });
}
