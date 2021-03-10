import { useHistory } from "react-router-dom";
import DirectionsSelector from "./DirectionsSelector";
import { Redirect } from 'react-router'
import {GiTruck} from "react-icons/gi"
import Directions from "./Directions"
import RoadInformation from "./RoadInformation"
import { useSelector, useDispatch } from "react-redux";
import Typography from '@material-ui/core/Typography';





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
        <h2>Veikvalitet for lastebiler <GiTruck/></h2>
        <DirectionsSelector redirect={redirect}/>
        {origin && destination && <RoadInformation/>}
        <h4 onClick={() => redirect("/about")} style={{position: "absolute", bottom: "5px", left: "20px"}}>About</h4>
      </div>
      <div style={style.map}><Directions/></div>
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
    alignItems: "center"
  },
  map: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: "50%"
  },
};

export default Home;
