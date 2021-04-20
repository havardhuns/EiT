import React, { useEffect, useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import trafficIcon from "../../images/icons/traffic-jam.png";
import glattIcon from "../../images/icons/glatt-vei-skilt.jpg"; // or glatt-gulv-skilt.png for fun
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { setTemporaryMarker } from "../../actions/placeActions";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

const RoadInformationItem = (props) => {
  const dispatch = useDispatch();

  return (
    <ListItem
      button
      alignItems="flex-start"
      onClick={() =>
        dispatch(
          setTemporaryMarker({
            lat: props.information.lat,
            lng: props.information.lng,
          })
        )
      }
    >
      <ItemContent information={props.information} />
      {props.marker &&
        props.marker.lon === props.information.lon &&
        props.marker.lng === props.information.lng && (
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => dispatch(setTemporaryMarker(null))}
            >
              <CloseIcon />
            </IconButton>
          </ListItemSecondaryAction>
        )}
    </ListItem>
  );
};

const ItemContent = (props) => {
  if (props.information.type === "weather") {
    return <WeatherItem information={props.information} />;
  } else if (props.information.type === "traffic") {
    return <TrafficItem information={props.information} />;
  } else if (props.information.type == "glatt") {
    return <GlattItem information={props.information} />;
  } else {
    return <div>wtf</div>;
  }
};

const WeatherItem = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <ListItemAvatar>
        <Avatar
          src={
            "https://folk.ntnu.no/haavarhu/weathericon/svg/" +
            props.information.data.next_1_hours.summary.symbol_code +
            ".svg"
          }
        />
      </ListItemAvatar>
      <ListItemText
        primary={props.information.location}
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
              props.information.data.instant.details.air_temperature +
              "°C"}
          </React.Fragment>
        }
      />
    </React.Fragment>
  );
};

const TrafficItem = (props) => {
  return (
    <React.Fragment>
      <ListItemAvatar>
        <Avatar src={trafficIcon} />
      </ListItemAvatar>
      <ListItemText
        primary={props.information.location}
        secondary={
          <React.Fragment>{"      " + props.information.data}</React.Fragment>
        }
      />
    </React.Fragment>
  );
};

const GlattItem = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <ListItemAvatar>
        <Avatar src={glattIcon} />
      </ListItemAvatar>
      <ListItemText
        primary={props.information.location}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            ></Typography>
            {"      " + props.information.data}
          </React.Fragment>
        }
      />
    </React.Fragment>
  );
};

export default RoadInformationItem;
