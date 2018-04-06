import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GoogleMapsLoader from 'google-maps';

class App extends Component {

  componentDidMount() {
    GoogleMapsLoader.LIBRARIES = ['places'];
    GoogleMapsLoader.KEY = 'AIzaSyDtuwsuOlHZYkxN5PRE7F7oB4H01Jop5s0';
    GoogleMapsLoader.load(google => {
      const map = new google.maps.Map(this._map, {
        center: {lat: -33.8688, lng: 151.2195},
        zoom: 13,
        mapTypeId: 'roadmap'
      });

      const searchBox = new google.maps.places.SearchBox(this._input);

      // Bias the SearchBox results towards current map's viewport.
      map.addListener('bounds_changed', () => {
        searchBox.setBounds(map.getBounds());
      });

      let markers = [];

      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();

        if (places.length === 0) return;

        // Clear out the old markers.
        markers.forEach(marker => marker.setMap(null));
        markers = [];

        // For each place, get the icon, name and location.
        const bounds = new google.maps.LatLngBounds();

        places.forEach(place => {
          if (!place.geometry) return;
          const icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };

          // Create a marker for each place.
          markers.push(new google.maps.Marker({
            map: map,
            icon: icon,
            title: place.name,
            position: place.geometry.location
          }));

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Where would you like to go?</h1>
          <input
            type="text"
            className="form-control"
            ref={ref => (this._input = ref)}
            placeholder="The world is your oyster..."
          />
        </header>
        <div className="App-map" ref={ref => (this._map = ref)} />
      </div>
    );
  }
}

export default App;
