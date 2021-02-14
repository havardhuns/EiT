import Map from "./Map"
import { Redirect } from "react-router-dom"
import React, { useEffect, useState } from "react"
import TemperatureDisplay from "./TemperatureDisplay"
import { withScriptjs } from "react-google-maps";



const Home = () => {

    const MapLoader =  withScriptjs(Map);

    const [redirectPath, setRedirectPath] = useState(null)


    if (redirectPath) {
        return (
            <Redirect to={{
                pathname: redirectPath,
            }} />
        )
    }
    
    return(
        <div style={style.frontPage}>
            <div style={style.bar}>
                <div>Veikvalitet for lastebiler</div>
                <div onClick={() => setRedirectPath("/about")}>About</div>
                <div onClick={() => setRedirectPath("/users")}>Users</div>
                <TemperatureDisplay/>
            </div>
            <div style={style.map}>
                <MapLoader
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCVeQW1Rhy24_GLHqGsLf6KHoUTkGCwAOA"
                    loadingElement={<div style={{ height: `100%` }} />}
                />
            </div>
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