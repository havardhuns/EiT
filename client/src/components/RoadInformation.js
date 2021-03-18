import { getWeatherFromCoordinates } from "../actions/weatherAction";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { setSingleMarker } from "../actions/placeActions";
import Button from "@material-ui/core/Button";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import { setSelectedRouteIndex } from "../actions/directionsAcions";
import ListSubheader from "@material-ui/core/ListSubheader";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

const RoadInformation = () => {
  const classes = useStyles();

  const directions = useSelector((state) => state.directionsReducer.directions);
  const index = useSelector(
    (state) => state.directionsReducer.selectedRouteIndex
  );

  console.log(index);

  const dispatch = useDispatch();

  const weather = useSelector((state) => state.weatherReducer);

  const origin = useSelector((state) => state.placeReducer.origin);
  const destination = useSelector((state) => state.placeReducer.destination);

  const [showAlternativeRoutes, setShowAlternativeRoutes] = useState(false);

  useEffect(() => {
    dispatch(getWeatherFromCoordinates(origin.lat, origin.lng, origin.name));
    dispatch(
      getWeatherFromCoordinates(
        destination.lat,
        destination.lng,
        destination.name
      )
    );
  }, []);

  const selectRoute = (index) => {
    dispatch(setSelectedRouteIndex(index));
    setShowAlternativeRoutes(false);
  };

  const names = [origin.name, destination.name];

  return (
    <div>
      {!showAlternativeRoutes ? (
        <List
          className={classes.root}
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Informasjon om kjøreforhold for ruten
            </ListSubheader>
          }
        >
          {weather[origin.name] &&
            weather[destination.name] &&
            names.map((name) => (
              <div>
                <ListItem button alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      src={
                        "https://folk.ntnu.no/haavarhu/weathericon/svg/" +
                        weather[name].data.next_1_hours.summary.symbol_code +
                        ".svg"
                      }
                    />
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
                        {"      " +
                          weather[name].data.instant.details.air_temperature +
                          "°C"}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </div>
            ))}
        </List>
      ) : (
        <div>
          <List
            className={classes.root}
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Velg en rute
              </ListSubheader>
            }
          >
            {directions.routes.map((route, index) => (
              <div>
                <ListItem
                  button
                  alignItems="flex-start"
                  onClick={() => selectRoute(index)}
                >
                  <ListItemAvatar style={{ margin: "auto" }}>
                    <DriveEtaIcon style={{ color: "#606060" }} size="large" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={"via " + route.summary}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {route.legs[0].duration.text}
                        </Typography>
                        {"      " + route.legs[0].distance.text}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </div>
            ))}
          </List>
        </div>
      )}
      <Button
        variant="contained"
        onClick={() => setShowAlternativeRoutes(!showAlternativeRoutes)}
      >
        {showAlternativeRoutes ? "Tilbake" : "Velg en annen rute"}
      </Button>
    </div>
  );
};

export default RoadInformation;
