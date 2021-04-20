import React, { useEffect, useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import trafficIcon from "../../images/icons/traffic-jam.png";
import glattIcon from "../../images/icons/glatt-vei-skilt.png"; // or glatt-gulv-skilt.png for fun

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
  if (props.information.type == "weather") {
    return <WeatherItem information={props.information} />;
  } else if (props.information.type == "traffic") {
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
    <ListItem button alignItems="flex-start">
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
    </ListItem>
  );
};

const TrafficItem = (props) => {
  const classes = useStyles();

  return (
    <ListItem button alignItems="flex-start">
      <ListItemAvatar>
        <Avatar src={trafficIcon} />
      </ListItemAvatar>
      <ListItemText
        primary={props.information.location}
        secondary={
          <React.Fragment>{"      " + props.information.data}</React.Fragment>
        }
      />
    </ListItem>
  );
};

const GlattItem = (props) => {
  const classes = useStyles();

  return (
    <ListItem button alignItems="flex-start">
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
            >
            </Typography>
            {"      " +
              props.information.data }
          </React.Fragment>
        }
      />
    </ListItem>
  );
};

export default RoadInformationItem;
