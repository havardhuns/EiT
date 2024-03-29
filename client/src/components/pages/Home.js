import { useSelector } from "react-redux";
import Directions from "../directions/Directions";
import DirectionsSelector from "../directions/DirectionsSelector";
import RoadInformation from "../information/RoadInformation";
const Home = () => {
  const origin = useSelector((state) => state.placeReducer.origin);
  const destination = useSelector((state) => state.placeReducer.destination);

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
