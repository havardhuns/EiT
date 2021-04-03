import NavBar from "./components/layout/NavBar";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";

const App = () => {
  return (
    <div style={style.frontPage}>
      <Router>
        <div style={style.bar}>
          <NavBar />
        </div>
        <div style={style.content}>
          <Routes />
        </div>
      </Router>
    </div>
  );
};

export default App;

const style = {
  frontPage: {
    position: "absolute",
    width: "100%",
    display: "flex",
  },
  bar: {
    width: "25%",
    backgroundColor: "#484848",
  },
  content: {
    width: "75%",
  },
};
