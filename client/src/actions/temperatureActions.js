export const setTemperature = (temperature, time) => ({
  type: "SET_TEMPERATURE",
  temperature: temperature,
  time: time,
});

export function getTemperatureNow() {
  return (dispatch) => {
    fetch("/api/temperature/now")
      .then(
        (response) => response.json(),
        (error) => console.log(error)
      )
      .then((temp) => {
        dispatch(setTemperature(temp.temperature, temp.time));
      });
  };
}
