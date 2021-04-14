import { useSelector } from "react-redux";
import Directions from "../directions/Directions";
import DirectionsSelector from "../directions/DirectionsSelector";
import RoadInformation from "../information/RoadInformation";
import { createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import CssBaseline from "@material-ui/core/CssBaseline";

const Home = () => {
  const origin = useSelector((state) => state.placeReducer.origin);
  const destination = useSelector((state) => state.placeReducer.destination);
  const routePath = useSelector((state) => state.directionsReducer.routePath);

  const directionsSelected = origin && destination;

  return (
    <div style={{ height: "100%" }}>
      <div style={directionsSelected ? style.mapSmall : style.map}>
        <Directions />
        <div style={style.directionsSelector}>
          <DirectionsSelector />
        </div>
      </div>
      {directionsSelected && <RoadInformation />}
    </div>
  );
};

export default Home;

const style = {
  map: {
    width: "100%",
    height: "100%",
    transition: "height 1s",
  },
  mapSmall: {
    width: "100%",
    height: "50%",
    transition: "height 1s",
  },
  directionsSelector: {
    position: "absolute",
    top: 0,
    left: "25%",
  },
};
