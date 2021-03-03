import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import TemperatureDisplay from "./TemperatureDisplay";
import PlaceSearch from "./PlaceSearch";
import Button from "@material-ui/core/Button";
import { setOrigin, setDestination } from "../actions/placeActions";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();

  const [selectedOrigin, setSelectedOrigin] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);

  let history = useHistory();

  const redirect = (path) => {
    history.push(path);
  };


  const setPlaces = () => {
    dispatch(setOrigin(selectedOrigin));
    dispatch(setDestination(selectedDestination));
    redirect("/Directions")
  };

  return (
    <div style={style.frontPage}>
      <div style={style.bar}>
        <div>Veikvalitet for lastebiler</div>
        <div onClick={() => redirect("/about")}>About</div>
        fra:
        <PlaceSearch onSelect={setSelectedOrigin} />
        til:
        <PlaceSearch onSelect={setSelectedDestination} />
          <Button onClick={setPlaces} variant="contained" disabled={!(selectedOrigin && selectedDestination)}>
            Få Veibeskrivelse
          </Button>
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
