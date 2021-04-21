import Map from "./Map";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setDirections,
  getRoutePath,
  clearDirections,
} from "../../actions/directionsAction";
import { setTemporaryMarker } from "../../actions/placeActions";

const Directions = () => {
  const origin = useSelector((state) => state.placeReducer.origin);
  const destination = useSelector((state) => state.placeReducer.destination);
  const singleMarker = useSelector((state) => state.placeReducer.singleMarker);
  const temporaryMarker = useSelector(
    (state) => state.placeReducer.temporaryMarker
  );
  const directions = useSelector((state) => state.directionsReducer.directions);
  const selectedRouteIndex = useSelector(
    (state) => state.directionsReducer.selectedRouteIndex
  );

  const dispatch = useDispatch();

  const getDirections = (origin, destination) => {
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          dispatch(getRoutePath(result, selectedRouteIndex));
          setTimeout(() => {
            dispatch(setDirections(result));
          }, 500);
        } else {
          console.log("Error fetching directions...");
        }
      }
    );
  };

  useEffect(() => {
    if (origin && destination) {
      getDirections(origin, destination);
    } else {
      dispatch(clearDirections());
      dispatch(setTemporaryMarker(null));
    }
  }, [origin, destination]);

  return (
    <Map
      singleMarker={singleMarker}
      temporaryMarker={temporaryMarker}
      showMarker={
        !directions || (singleMarker !== origin && singleMarker !== destination)
      }
      directions={directions}
      routeIndex={selectedRouteIndex}
    />
  );
};

export default Directions;
