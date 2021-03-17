import { useHistory } from "react-router-dom";
import DirectionsSelector from "./DirectionsSelector";
import { Redirect } from 'react-router'
import {GiTruck} from "react-icons/gi"
import Directions from "./Directions"
import RoadInformation from "./RoadInformation"
import { useSelector, useDispatch } from "react-redux";
import Typography from '@material-ui/core/Typography';
import NavBar from "./NavBar"





const Home = () => {

  let history = useHistory();

  const origin = useSelector((state) => state.placeReducer.origin);
  const destination = useSelector((state) => state.placeReducer.destination);

  const redirect = (path) => {
    history.push(path);
  };
  
  const directionsSelected =  origin && destination

  return (
    <div style={style.frontPage}>
        <div style={style.bar}><NavBar/></div>
        <div style={style.content}> 
          <div style={directionsSelected ? style.mapSmall: style.map}>
            <Directions/>
            <div style={style.directionsSelector}><DirectionsSelector redirect={redirect}/></div>
            </div>
          
          {directionsSelected && <RoadInformation/>}
        </div>
    </div>
  );
};

//        
//         <h4 onClick={() => redirect("/about")} style={{position: "absolute", bottom: "5px", left: "20px"}}>About</h4>





const style = {
  frontPage: {
    position: "absolute",
    width: "100%",
    display: "flex",
  },
  bar: {
    width: "25%",
    backgroundColor: "#484848"
  },
  content: {
    width: "75%",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  mapSmall: {
    width: "100%",
    height: "50%",
    transition: 'height 1s'

  },
  directionsSelector: {
    position: "absolute",
    top: 0,
    left: "25%",
  }
};

export default Home;
