/*global google*/
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  Marker,
} from "react-google-maps";
import { withScriptjs } from "react-google-maps";

const GoogleMapExample = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      center={props.singleMarker ? props.singleMarker : { lat: 65, lng: 16 }}
      zoom={props.singleMarker ? 6 : 4}
      options={{
        gestureHandling: "cooperative",
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
      }}
    >
      {props.directions && (
        <DirectionsRenderer
          directions={props.directions}
          routeIndex={props.routeIndex}
        />
      )}
      {props.singleMarker && <Marker position={props.singleMarker} />}
      {props.temporaryMarker && <Marker position={props.temporaryMarker} />}
    </GoogleMap>
  ))
);

const Map = (props) => {
  return (
    <GoogleMapExample
      containerElement={<div style={{ height: `100%`, width: "100%" }} />}
      mapElement={<div style={{ height: `100%` }} />}
      singleMarker={props.singleMarker}
      directions={props.directions ? props.directions : null}
      showMarker={props.showMarker}
      routeIndex={props.routeIndex}
      temporaryMarker={props.temporaryMarker}
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCVeQW1Rhy24_GLHqGsLf6KHoUTkGCwAOA"
      loadingElement={<div style={{ height: `100%` }} />}
    />
  );
};

export default Map;
