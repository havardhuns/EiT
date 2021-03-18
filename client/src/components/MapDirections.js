/*global google*/
import { withGoogleMap, DirectionsRenderer } from "react-google-maps";

const GoogleMapExample = withGoogleMap((props) => (
  <DirectionsRenderer directions={props.directions} />
));

const MapDirections = (props) => {
  return (
    <div>
      <GoogleMapExample
        containerElement={<div style={{ height: `500px`, width: "500px" }} />}
        mapElement={<div style={{ height: `100%` }} />}
        directions={props.directions}
      />
    </div>
  );
};

export default MapDirections;
