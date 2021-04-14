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

export const clearRoadInformation = () => ({
  type: "CLEAR_ROAD_INFORMATION",
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
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((weather) => {
        dispatch(addRoadInformationSuccess(weather));
      })
      .catch((error) => dispatch(addRoadInformationError(error.message)));
  };
}

export function getTrafficSituationsFromCoordinates(coordinatePoints) {
  return (dispatch) => {
    dispatch(addRoadInformationBegin());
    fetch("/api/vegvesen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(coordinatePoints),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((trafficSituations) => {
        dispatch(addRoadInformationSuccess(trafficSituations));
      })
      .catch((error) => dispatch(addRoadInformationError(error.message)));
  };
}

export function getGlatt(coordinatePoints) {
  return (dispatch) => {
    dispatch(addRoadInformationBegin());
    fetch("/api/weather/glatt/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(coordinatePoints),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((glatt) => {
        dispatch(addRoadInformationSuccess(glatt));
      })
      .catch((error) => dispatch(addRoadInformationError(error.message)));
  };
}
