import Map from "./Map";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withScriptjs } from "react-google-maps";
import { Redirect } from "react-router-dom"
import TemperatureDisplay from "./TemperatureDisplay"
import {getWeatherFromCoordinates} from "../actions/weatherAction"
import {setDirections} from "../actions/directionsAcions"



const Directions = () => {
  const origin = useSelector((state) => state.placeReducer.origin);
  const destination = useSelector((state) => state.placeReducer.destination);
  const singleMarker = useSelector((state) => state.placeReducer.singleMarker);
  const directions = useSelector((state) => state.directionsReducer.directions);

  const dispatch = useDispatch();

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
          const timer = setTimeout(() => {
            dispatch(setDirections(result))
          }, 500);
          
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
      dispatch(setDirections(null))
    }
  }, [origin, destination]);


  const MapLoader = withScriptjs(Map);
  return (
    <MapLoader
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCVeQW1Rhy24_GLHqGsLf6KHoUTkGCwAOA"
      loadingElement={<div style={{ height: `100%` }} className="lol" />}
      singleMarker={singleMarker}
      showMarker={!directions || (singleMarker != origin && singleMarker != destination)}
      directions={directions}
    />)
};

export default Directions;
