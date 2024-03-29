import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import {
  setSelectedRouteIndex,
  getRoutePath,
} from "../../actions/directionsAction";
import ListSubheader from "@material-ui/core/ListSubheader";
import load from "../../images/loading/delivery-truck.gif";
import {
  getWeatherFromCoordinates,
  getTrafficSituationsFromCoordinates,
  getGlatt,
  clearRoadInformation,
} from "../../actions/roadInformationAction";
import RoadInformationItem from "./RoadInformationItem";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

function calcCrow(lat1, lon1, lat2, lon2) {
  var R = 6371; // km
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  lat1 = toRad(lat1);
  lat2 = toRad(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

// Converts numeric degrees to radians
function toRad(Value) {
  return (Value * Math.PI) / 180;
}

const RoadInformation = () => {
  const classes = useStyles();

  const directions = useSelector((state) => state.directionsReducer.directions);
  const temporaryMarker = useSelector(
    (state) => state.placeReducer.temporaryMarker
  );
  const index = useSelector(
    (state) => state.directionsReducer.selectedRouteIndex
  );
  const routePath = useSelector((state) => state.directionsReducer.routePath);

  const dispatch = useDispatch();

  const roadInformation = useSelector((state) => state.roadInformationReducer);
  const origin = useSelector((state) => state.placeReducer.origin);

  const [showAlternativeRoutes, setShowAlternativeRoutes] = useState(false);

  const getRoadInformation = (path) => {
    dispatch(clearRoadInformation());
    dispatch(getWeatherFromCoordinates(path[0]));
    dispatch(getWeatherFromCoordinates(path[path.length - 1]));
    dispatch(getTrafficSituationsFromCoordinates(path));
    dispatch(getGlatt(path));
  };

  useEffect(() => {
    if (routePath) {
      getRoadInformation(routePath);
    }
  }, [routePath]);

  const sortRoadInformation = (origin, roadInformationList) => {
    let sortedInfo = roadInformationList.sort(
      (a, b) =>
        calcCrow(a.lat, a.lng, origin.lat, origin.lng) -
        calcCrow(b.lat, b.lng, origin.lat, origin.lng)
    );
    if (sortedInfo[sortedInfo.length - 1].type !== "weather") {
      for (let i = sortedInfo.length - 1; i >= 0; i--) {
        if (sortedInfo[i].type === "weather") {
          sortedInfo.push(sortedInfo.splice(i, 1).pop());
          break;
        }
      }
    }
    return sortedInfo;
  };

  const selectRoute = (newIndex) => {
    if (newIndex !== index) {
      dispatch(getRoutePath(directions, newIndex));
    }
    dispatch(setSelectedRouteIndex(newIndex));
    setShowAlternativeRoutes(false);
  };

  return (
    <div style={{ height: "50%" }}>
      {roadInformation.error ? (
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "red",
          }}
        >
          <h1>ERROR</h1>
          <h3>{roadInformation.error}</h3>
          <h3>Please try again</h3>
        </div>
      ) : !(
          roadInformation.roadInformationList.length !== 0 &&
          roadInformation.loading.length === 0
        ) ? (
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={load} alt="loading..." style={{ width: "20%" }} />
          <Typography
            component="span"
            variant="body1"
            className={classes.inline}
            color="textPrimary"
          >
            Henter kjøreforhold...
          </Typography>
        </div>
      ) : (
        <div style={{ height: "98%" }}>
          {!showAlternativeRoutes ? (
            <List
              style={{ maxHeight: "100%", overflow: "auto" }}
              className={classes.root}
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  Informasjon om kjøreforhold for ruten{" "}
                  <b>
                    (via{" "}
                    {directions.routes[index].summary +
                      ", " +
                      directions.routes[index].legs[0].distance.text +
                      ", " +
                      directions.routes[index].legs[0].duration.text}
                    )
                  </b>
                </ListSubheader>
              }
            >
              {sortRoadInformation(
                origin,
                roadInformation.roadInformationList
              ).map((information, i) => (
                <div key={i}>
                  <RoadInformationItem
                    information={information}
                    marker={temporaryMarker}
                  />
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
                    Velg en annen rute
                  </ListSubheader>
                }
              >
                {directions.routes.map((route, index) => (
                  <div key={index}>
                    <ListItem
                      button
                      alignItems="flex-start"
                      onClick={() => selectRoute(index)}
                    >
                      <ListItemAvatar style={{ margin: "auto" }}>
                        <DriveEtaIcon
                          style={{ color: "#606060" }}
                          size="large"
                        />
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
            style={{
              position: "absolute",
              top: "calc(50% + 5px)",
              right: "25px",
              zIndex: 1,
            }}
          >
            {showAlternativeRoutes
              ? "Tilbake til kjøreforhold"
              : "Alternative ruter"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default RoadInformation;
