import { useHistory } from "react-router-dom";
import DirectionsSelector from "./DirectionsSelector";
import {getWeatherFromCoordinates} from "../actions/weatherAction"
import { Redirect } from 'react-router'
import {GiTruck} from "react-icons/gi"
import Directions from "./Directions"
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import TemperatureDisplay from "./TemperatureDisplay"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import WeatherIcon from 'react-icons-weather';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }));

const RoadInformation = () => {

    const classes = useStyles();


    const dispatch = useDispatch();

    const weather = useSelector((state) => state.weatherReducer);

    const origin = useSelector((state) => state.placeReducer.origin);
    const destination = useSelector((state) => state.placeReducer.destination);
    
    useEffect(() => {
        dispatch(getWeatherFromCoordinates(origin.lat, origin.lng, origin.name));
        dispatch(getWeatherFromCoordinates(destination.lat, destination.lng, destination.name));
      }, []);

    const names = [origin.name, destination.name]


  return (
    <List className={classes.root}>
    {weather[origin.name] && weather[destination.name] && names.map((name) => 
    <div>
        <ListItem button alignItems="flex-start">
            <ListItemAvatar>
              <Avatar src={'https://folk.ntnu.no/haavarhu/weathericon/svg/' + weather[name].data.next_1_hours.summary.symbol_code + '.svg'}/>
            </ListItemAvatar>
            <ListItemText
            primary={name}
            secondary={
                <React.Fragment>
                <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                >
                    Temperatur
                </Typography>
                {"      " + weather[name].data.instant.details.air_temperature + "°C"}
                </React.Fragment>
            }
            />
        </ListItem>
      <Divider variant="inset" component="li" />
      </div>
      
    )}
    </List>
  );
};

export default RoadInformation;



{/*<div>
     {weather[origin.name] && <TemperatureDisplay place={origin.name} time={weather[origin.name].time} temperature={weather[origin.name].data.instant.details.air_temperature} />}
    {weather[destination.name] && <TemperatureDisplay place={destination.name} time={weather[destination.name].time} temperature={weather[destination.name].data.instant.details.air_temperature} />}
</div>*/}