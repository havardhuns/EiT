export const setTraffic = (trafficSituations) => ({
    type: "SET_TRAFFIC",
    trafficSituations: trafficSituations
  });

export function getTrafficSituationsFromCoordinates(coordinatePoints) {
    console.log("TRAFFIC ACTION CALLED")
    console.log("Points: " + coordinatePoints)
    return (dispatch) => {
      fetch("http://localhost:5000/vegvesen", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(coordinatePoints)
      })
        .then(
          (response) => response.json(),
          (error) => console.log(error)
        )
        .then((trafficSituations) => {
            console.log(trafficSituations)
          dispatch(setTraffic(trafficSituations));
        });
    };
  }