export const setTemperature = (temperature, time) => ({
    type: "SET_TEMPERATURE",
    temperature: temperature,
    time: time
  });

export function getTemperature() {
  return dispatch => {
    fetch("http://localhost:5000/temperature")
      .then(response => response.json(), error => console.log(error))
      .then(temp => {
        dispatch(setTemperature(temp.temperature, temp.time));
      });
  }
}

