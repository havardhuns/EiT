export const setTraffic = (trafficSituations) => ({
  type: "SET_TRAFFIC",
  trafficSituations: trafficSituations,
});

export function getTrafficSituationsFromCoordinates(coordinatePoints) {
  return (dispatch) => {
    fetch("/api/vegvesen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(coordinatePoints),
    })
      .then(
        (response) => response.json(),
        (error) => console.log(error)
      )
      .then((trafficSituations) => {
        console.log(trafficSituations);
        dispatch(setTraffic(trafficSituations));
      });
  };
}
