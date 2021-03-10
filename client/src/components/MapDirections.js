/*global google*/
import React, { useEffect, useState } from "react";
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} from "react-google-maps";
import { useSelector, useDispatch } from "react-redux";

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
