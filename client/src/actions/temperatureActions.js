export const setTemperature = (temperature, time) => ({
    type: "SET_TEMPERATURE",
    temperature: temperature,
    time: time
  });

export function getTemperatureNow() {
  return dispatch => {
    fetch("http://localhost:5000/temperature/now")
      .then(response => response.json(), error => console.log(error))
      .then(temp => {
        dispatch(setTemperature(temp.temperature, temp.time));
      });
  }
}

