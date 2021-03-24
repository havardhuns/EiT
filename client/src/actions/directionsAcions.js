export const setDirections = (directions) => ({
  type: "SET_DIRECTIONS",
  payload: directions,
});

export const setSelectedRouteIndex = (routeIndex) => ({
  type: "SET_ROUTE_INDEX",
  payload: routeIndex,
});

export const setRoutePath = (routePath) => ({
  type: "SET_ROUTE_PATH",
  payload: routePath,
});

export function getRoutePath(directions, routeIndex) {
  var path = window.google.maps.geometry.encoding.decodePath(
    directions.routes[routeIndex].overview_polyline
  );
  const routePath = path.map((point) => {
    return { lat: point.lat(), lng: point.lng() };
  });
  return (dispatch) => {
    dispatch(setRoutePath(routePath));
  };
}
