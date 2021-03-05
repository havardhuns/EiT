import { useHistory } from "react-router-dom";
import DirectionsSelector from "./DirectionsSelector";
import { Redirect } from 'react-router'
import {GiTruck} from "react-icons/gi"
import Directions from "./Directions"
import RoadInformation from "./RoadInformation"
import { useSelector, useDispatch } from "react-redux";




const Home = () => {

  let history = useHistory();

  const origin = useSelector((state) => state.placeReducer.origin);
  const destination = useSelector((state) => state.placeReducer.destination);

  const redirect = (path) => {
    history.push(path);
  };

  return (
    <div style={style.frontPage}>
      <div style={style.bar}>
        <div>Veikvalitet for lastebiler <GiTruck/></div>
        <DirectionsSelector redirect={redirect}/>
        {origin && destination && <RoadInformation/>}
        <div onClick={() => redirect("/about")}>About</div>
      </div>
      <div><Directions/></div>
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
