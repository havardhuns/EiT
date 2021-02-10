import Maps from "./Maps"
import { Redirect } from "react-router-dom"
import React, { useEffect, useState } from "react"
import TemperatureDisplay from "./TemperatureDisplay"


const Home = () => {

    const [redirectToUsers, setredirectUsers] = useState(false)
    const [redirectToAbout, setredirectAbout] = useState(false)

    if (redirectToUsers) {
        return (
            <Redirect to={{
                pathname: "/users",
            }} />
        )
    }

    if (redirectToAbout) {
        return (
            <Redirect to={{
                pathname: "/about",
            }} />
        )
    }
    
    return(
        <div style={style.frontPage}>
            <div style={style.bar}>
                <div>Veikvalitet for lastebiler</div>
                <div onClick={() => setredirectAbout(true)}>About</div>
                <div onClick={() => setredirectUsers(true)}>Users</div>
                <TemperatureDisplay/>
            </div>
            <div style={style.map}><Maps/></div>
        </div>
    )
}

const style = {
    frontPage: {
        display: 'flex',
        height: '100vh'
    },
    bar: {
        height: '50%',
        width: '20%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    map: {
        height: '100%',
        width: '80%'
    }
  };

export default Home