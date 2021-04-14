export const addRoadInformationBegin = () => ({
  type: "ADD_ROAD_INFORMATION_BEGIN",
});

export const addRoadInformationSuccess = (data) => ({
  type: "ADD_ROAD_INFORMATION_SUCCESS",
  payload: data,
});

export const addRoadInformationError = (error) => ({
  type: "ADD_ROAD_INFORMATION_ERROR",
  payload: error,
});

export function getWeatherFromCoordinates(latLng, placeName = "") {
  return (dispatch) => {
    dispatch(addRoadInformationBegin());
    fetch(
      "/api/weather/coordinates?lat=" +
        latLng.lat +
        "&lng=" +
        latLng.lng +
        "&time=now" +
        "&pn=" +
        placeName
    )
      .then(
        (response) => response.json(),
        (error) => {
          console.log(error);
          addRoadInformationError(error);
        }
      )
      .then((weather) => {
        dispatch(addRoadInformationSuccess(weather));
      });
  };
}

export function getTrafficSituationsFromCoordinates(coordinatePoints) {
  return (dispatch) => {
    dispatch(addRoadInformationBegin());
    fetch("/api/vegvesen?coordinatesList=" + JSON.stringify(coordinatePoints))
      .then(
        (response) => response.json(),
        (error) => {
          console.log(error);
          addRoadInformationError(error);
        }
      )
      .then((trafficSituations) => {
        dispatch(addRoadInformationSuccess(trafficSituations));
      });
  };
}
