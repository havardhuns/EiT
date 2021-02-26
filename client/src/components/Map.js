/*global google*/
import React, { useEffect, useState } from "react";
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} from "react-google-maps";
import { useSelector, useDispatch } from "react-redux";

const GoogleMapExample = withGoogleMap((props) => (
  <GoogleMap
    defaultCenter={{ lat: 71, lng: 8 }}
    defaultZoom={3}
    options={{ gestureHandling: "cooperative" }}
  >
    <DirectionsRenderer directions={props.directions} />
  </GoogleMap>
));

const Map = (props) => {
  const [directions, setDirections] = useState(null);

  const getDirections = (origin, destination) => {
    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.log("Error fetching directions...");
        }
      }
    );
  };

  useEffect(() => {
    getDirections(props.origin, props.destination);
  }, [props.origin, props.destination]);

  return (
    <div>
      <GoogleMapExample
        containerElement={<div style={{ height: `500px`, width: "500px" }} />}
        mapElement={<div style={{ height: `100%` }} />}
        directions={directions}
      />
    </div>
  );
};

export default Map;
