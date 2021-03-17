import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const NavBar = (props) => {
  const navBarItems = ["About", "Contact"];

  let history = useHistory();

  const redirect = (path) => {
    history.push(path);
  };

  return (
    <div style={style.navBar}>
      <div
        style={{ ...style.element, ...style.titleElement }}
        onClick={() => redirect("/")}
      >
        {" "}
        RoadBuddy{" "}
      </div>
      {navBarItems.map((item) => (
        <NavBarItem item={item} redirect={redirect} />
      ))}
    </div>
  );
};

const NavBarItem = (props) => {
  const [hover, setHover] = useState(false);

  return (
    <div>
      <div
        style={{
          ...style.element,
          ...(hover && { backgroundColor: "#404040" }),
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => props.redirect("/" + props.item)}
      >
        {props.item}
      </div>
    </div>
  );
};

const style = {
  titleElement: {
    backgroundColor: "#313131",
    borderBottom: "1px solid grey",
  },
  navBar: {
    display: "flex",
    flexDirection: "Column",
  },
  element: {
    lineHeight: "75px",
    paddingLeft: "10%",
    width: "90%",
    height: "75px",
    color: "white",
    fontSize: "30px",
    cursor: "pointer",
  },
};

export default NavBar;
