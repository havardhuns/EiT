import React, { useState } from 'react';


function TravelForm(){
    
    const [destination, setDestination]= useState("")
    const [departure, setDeparture]= useState("")
    
    
    const ChangeDestination = event => setDestination(event.target.value);
    const ChangeDeparture = event => setDeparture(event.target.value);
    
    return <div>
        <form > 
            <p>Destination</p>
            <input type = "text"  onChange={ChangeDestination}/>
            <p>Departure</p>
            <input type = "text"  onChange={ChangeDeparture}/>
        </form>
        <p>Displaying whats stored ass  Destination and Departure</p>
        <p>{destination}</p>
        <p>{departure}</p>

    </div>
}

export default TravelForm