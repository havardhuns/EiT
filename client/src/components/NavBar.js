import React, { useEffect, useState } from "react";

const NavBarItem = (props) => {
    const [hover, setHover] = useState(false)

    return <div>
        <div style={{...style.element, ...hover && {backgroundColor: '#404040'}}} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>    
            {props.item}
        </div>
    </div>
}


const About = () => {

    const navBarItems = ["About", "Contact"]

    


    return <div style={style.navBar}>
            <div style={{...style.element, ...style.titleElement}}> RoadBuddy </div>
            {navBarItems.map(item => (
                <NavBarItem item={item}/>
            ))}
            </div>;
  };

  const style = {
    titleElement: {
        backgroundColor: '#313131',
        borderBottom: '1px solid grey',
    },
    navBar: {
        display: "flex",
        flexDirection: "Column",
    },
    element: {
        lineHeight: '75px',
        paddingLeft: '10%',
        width: '90%',
        height: '75px',
        color: 'white',
        fontSize: '40px',
        cursor: 'pointer'
    }
  }
  
  export default About;
  