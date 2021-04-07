export const setWeather = (placeName, weather) => ({
  type: "SET_WEATHER",
  placeName: placeName,
  weather: weather,
});

export function getWeatherFromCoordinates(lat, lng, placeName) {
  return (dispatch) => {
    fetch("/api/weather/coordinates/lat/" + lat + "/lng/" + lng + "/time/now")
      .then(
        (response) => response.json(),
        (error) => console.log(error)
      )
      .then((weather) => {
        dispatch(setWeather(placeName, weather));
      });
  };
}
