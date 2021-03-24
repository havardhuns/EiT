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
