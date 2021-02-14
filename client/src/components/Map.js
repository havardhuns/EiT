/*global google*/
import React, { useEffect, useState } from "react"
import { withGoogleMap, GoogleMap, DirectionsRenderer } from "react-google-maps";



const Map = () => {
    const [directions, setDirections] = useState(null);

    const getDirections = (origin, destination) => {
        const directionsService = new google.maps.DirectionsService();
        directionsService.route(
            {
                origin: origin,
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING,
                provideRouteAlternatives: true
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    setDirections(result)
                } else {
                    console.log('Error fetching directions...')
                }
            }
        );
    }

    useEffect(() => {
        const origin = { lat: 63.419710, lng: 10.401690 };
        const destination = { lat: 58.562710764241615, lng: 7.77173255579074 };
        getDirections(origin, destination)
    }, []) 


    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={{ lat: 71, lng: 8 }}
        defaultZoom={3}
        options={{ gestureHandling: "cooperative" }}
      >
        <DirectionsRenderer
          directions={directions}
        />
      </GoogleMap>
    ));

    console.log(directions)

    return (
      <div>
        <GoogleMapExample
          containerElement={<div style={{ height: `500px`, width: "500px" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
}


export default Map;
