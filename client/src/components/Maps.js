import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';



export class MapContainer extends React.Component {
    render() {
        return (
            <Map
              google={this.props.google}
              zoom={15}
              style={mapStyles}
              initialCenter={{ lat: 63.4318656353724, lng: 10.392857294338631}}
            />
        );
    }
  }

const mapStyles = {
width: '100%',
height: '100%',
};
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyCVeQW1Rhy24_GLHqGsLf6KHoUTkGCwAOA')
})(MapContainer)

