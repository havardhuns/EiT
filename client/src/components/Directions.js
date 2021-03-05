import Map from "./Map";
import MapDirections from "./MapDirections"
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withScriptjs } from "react-google-maps";
import { Redirect } from "react-router-dom"
import TemperatureDisplay from "./TemperatureDisplay"
import {getWeatherFromCoordinates} from "../actions/weatherAction"



const Directions = () => {
  const origin = useSelector((state) => state.placeReducer.origin);
  const destination = useSelector((state) => state.placeReducer.destination);
  const singleMarker = useSelector((state) => state.placeReducer.singleMarker);

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
          console.log(result)
          setDirections(result)
        } else {
          console.log("Error fetching directions...");
        }
      }
    );
  };


  useEffect(() => {
    if (origin && destination) {
      getDirections(origin, destination)
    } 
    else {
      setDirections(null)
    }
  }, [origin, destination]);


  const MapLoader = withScriptjs(Map);
  return (
    <MapLoader
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCVeQW1Rhy24_GLHqGsLf6KHoUTkGCwAOA"
      loadingElement={<div style={{ height: `100%` }} />}
      singleMarker={singleMarker}
      showMarker={!directions || (singleMarker != origin && singleMarker != destination)}
      directions={directions}
    />)
};

export default Directions;
