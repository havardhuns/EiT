/*global google*/
import React, { useEffect, useState } from "react";
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  Marker
} from "react-google-maps";
import { useSelector, useDispatch } from "react-redux";

const GoogleMapExample = withGoogleMap((props) => (
  <GoogleMap
    center={props.singleMarker ? props.singleMarker : { lat: 65, lng: 16 }}
    zoom={props.singleMarker ? 7 : 4}
    options={{ gestureHandling: "cooperative" }}
  >
    <DirectionsRenderer directions={props.directions} />
    <Marker position={props.singleMarker} visible={props.showMarker}/>
  </GoogleMap>
));


const Map = (props) => {


  return (
    <div>
      <GoogleMapExample
        containerElement={<div style={{ height: `99vh`, width: "99vh" }} />}
        mapElement={<div style={{ height: `100%` }} />}
        singleMarker={props.singleMarker}
        directions={props.directions ? props.directions : null}
        showmArker={props.showmArker}
      />
    </div>
  );
};

export default Map;
