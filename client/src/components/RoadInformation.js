import { useHistory } from "react-router-dom";
import DirectionsSelector from "./DirectionsSelector";
import {getWeatherFromCoordinates} from "../actions/weatherAction"
import { Redirect } from 'react-router'
import {GiTruck} from "react-icons/gi"
import Directions from "./Directions"
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import TemperatureDisplay from "./TemperatureDisplay"




const RoadInformation = () => {


    const dispatch = useDispatch();

    const weather = useSelector((state) => state.weatherReducer);

    const origin = useSelector((state) => state.placeReducer.origin);
    const destination = useSelector((state) => state.placeReducer.destination);
    
    useEffect(() => {
        dispatch(getWeatherFromCoordinates(origin.lat, origin.lng, origin.name));
        dispatch(getWeatherFromCoordinates(destination.lat, destination.lng, destination.name));
      }, []);

  return (
    <div>
     {weather[origin.name] && <TemperatureDisplay place={origin.name} time={weather[origin.name].time} temperature={weather[origin.name].data.instant.details.air_temperature} />}
    {weather[destination.name] && <TemperatureDisplay place={destination.name} time={weather[destination.name].time} temperature={weather[destination.name].data.instant.details.air_temperature} />}
        </div>
  );
};

export default RoadInformation;



