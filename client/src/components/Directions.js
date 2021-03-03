import Map from "./Map";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withScriptjs } from "react-google-maps";
import { Redirect } from "react-router-dom"
import TemperatureDisplay from "./TemperatureDisplay"
import {getWeatherFromCoordinates} from "../actions/weatherAction"



const Directions = () => {
  const origin = useSelector((state) => state.placeReducer.origin);
  const destination = useSelector((state) => state.placeReducer.destination);

  if (!origin || !destination) {
    return (
      <Redirect to={{
          pathname: "/",
      }} />
    )
  }

  const weather = useSelector((state) => state.weatherReducer);

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getWeatherFromCoordinates(origin.lat, origin.lng, origin.name));
    dispatch(getWeatherFromCoordinates(destination.lat, destination.lng, destination.name));
  }, []);




  


  const MapLoader = withScriptjs(Map);
  return (<div>
    <MapLoader
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCVeQW1Rhy24_GLHqGsLf6KHoUTkGCwAOA"
      loadingElement={<div style={{ height: `100%` }} />}
      origin={origin}
      destination={destination}
    />
    {weather[origin.name] && <TemperatureDisplay place={origin.name} time={weather[origin.name].time} temperature={weather[origin.name].data.instant.details.air_temperature} />}
    {weather[destination.name] && <TemperatureDisplay place={destination.name} time={weather[destination.name].time} temperature={weather[destination.name].data.instant.details.air_temperature} />}
  </div>)
};

export default Directions;
