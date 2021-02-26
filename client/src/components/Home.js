import Map from "./Map";
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import TemperatureDisplay from "./TemperatureDisplay";
import { withScriptjs } from "react-google-maps";
import PlaceSearch from "./PlaceSearch";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import { setOrigin, setDestination } from "../actions/placeActions";

const Home = () => {
  const dispatch = useDispatch();

  const [selectedOrigin, setSelectedOrigin] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);

  const origin = useSelector((state) => state.placeReducer.origin);
  const destination = useSelector((state) => state.placeReducer.destination);

  let history = useHistory();

  const redirect = (path) => {
    history.push(path);
  };

  const MapLoader = withScriptjs(Map);

  const setPlaces = () => {
    dispatch(setOrigin(selectedOrigin));
    dispatch(setDestination(selectedDestination));
  };

  return (
    <div style={style.frontPage}>
      <div style={style.bar}>
        <div>Veikvalitet for lastebiler</div>
        <div onClick={() => redirect("/about")}>About</div>
        <div onClick={() => redirect("/users")}>Users</div>
        <TemperatureDisplay />
        fra:
        <PlaceSearch onSelect={setSelectedOrigin} />
        til:
        <PlaceSearch onSelect={setSelectedDestination} />
        {selectedOrigin && selectedDestination && (
          <Button onClick={setPlaces} variant="contained">
            Få Veibeskrivelse
          </Button>
        )}
      </div>
      <div style={style.map}>
        <MapLoader
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCVeQW1Rhy24_GLHqGsLf6KHoUTkGCwAOA"
          loadingElement={<div style={{ height: `100%` }} />}
          origin={origin}
          destination={destination}
        />
      </div>
    </div>
  );
};

const style = {
  frontPage: {
    display: "flex",
    height: "100vh",
  },
  bar: {
    height: "50%",
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  map: {
    height: "100%",
    width: "50%",
  },
};

export default Home;
