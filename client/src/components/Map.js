/*global google*/
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  Marker,
} from "react-google-maps";

const GoogleMapExample = withGoogleMap((props) => (
  <GoogleMap
    center={props.singleMarker ? props.singleMarker : { lat: 65, lng: 16 }}
    zoom={props.singleMarker ? 7 : 4}
    options={{
      gestureHandling: "cooperative",
      fullscreenControl: false,
      mapTypeControl: false,
      streetViewControl: false,
    }}
  >
    <DirectionsRenderer
      directions={props.directions}
      routeIndex={props.routeIndex}
    />
    <Marker position={props.singleMarker} visible={props.showMarker} />
  </GoogleMap>
));

const Map = (props) => {
  return (
    <GoogleMapExample
      containerElement={<div style={{ height: `100%`, width: "100%" }} />}
      mapElement={<div style={{ height: `100%` }} />}
      singleMarker={props.singleMarker}
      directions={props.directions ? props.directions : null}
      showmArker={props.showmArker}
      routeIndex={props.routeIndex}
    />
  );
};

export default Map;
