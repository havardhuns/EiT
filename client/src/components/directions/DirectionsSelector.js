import PlaceSearch from "./PlaceSearch";
import IconButton from "@material-ui/core/IconButton";
import {
  setOrigin,
  setDestination,
  setSingleMarker,
} from "../../actions/placeActions";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { RiMapPinRangeLine, RiMapPinLine } from "react-icons/ri";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdSwapVert } from "react-icons/md";

const DirectionsSelector = (props) => {
  const dispatch = useDispatch();
  const [hover, setHover] = useState(false);

  const origin = useSelector((state) => state.placeReducer.origin);
  const destination = useSelector((state) => state.placeReducer.destination);

  const setOrg = (coordinates) => {
    dispatch(setOrigin(coordinates));
    if (coordinates && !destination) {
      dispatch(setSingleMarker(coordinates));
    } else {
      dispatch(setSingleMarker(destination));
    }
  };

  const setDest = (coordinates) => {
    dispatch(setDestination(coordinates));
    if (coordinates && !origin) {
      dispatch(setSingleMarker(coordinates));
    } else {
      dispatch(setSingleMarker(origin));
    }
  };

  const swap = () => {
    dispatch(setOrigin(destination));
    dispatch(setDestination(origin));
  };

  useEffect(() => {
    setHover(false);
  }, [origin, destination]);

  const hide = origin && destination && !hover;

  return (
    <div
      style={{ ...style.lol, ...(hide && style.lolHidden) }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={style.icons}>
        <RiMapPinRangeLine color="#00a4eb" size="2em" />
        <BiDotsVerticalRounded
          size="2em"
          style={{ padding: "4px 0" }}
          color="rgba(0,0,0,0.6)"
        />
        <RiMapPinLine color="#ff3328" size="2em" />
      </div>
      <div
        style={{ ...style.inputBars, ...(hide && { visibility: "hidden" }) }}
      >
        <PlaceSearch
          onSelect={setOrg}
          placeholder={"Velg startsted"}
          value={origin}
        />
        <PlaceSearch
          onSelect={setDest}
          placeholder={"Velg destinasjon"}
          value={destination}
        />
      </div>
      <div style={{ ...style.button, ...(hide && { visibility: "hidden" }) }}>
        <IconButton variant="contained" onClick={swap}>
          <MdSwapVert size="1.5em" />
        </IconButton>
      </div>
    </div>
  );
};

const style = {
  lol: {
    display: "flex",
    width: "435px",
    padding: "20px",
    border: "1px solid rgba(0,0,0,0.2)",
    borderRadius: "10px",
    margin: "10px",
    boxShadow: "2px 2px 10px #999999",
    backgroundColor: "rgba(255,255,255,0.9)",
    transition: "width 0.3s, height 0.3s",
    overflow: "hidden",
  },
  lolHidden: {
    width: "35px",
    transition: "width 0.3s",
  },
  icons: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
  },
  inputBars: {
    display: "flex",
    flexDirection: "column",
  },
  button: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    paddingLeft: "30px",
  },
};

export default DirectionsSelector;
