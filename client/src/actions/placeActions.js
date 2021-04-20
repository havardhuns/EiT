export const setOrigin = (origin) => ({
  type: "SET_ORIGIN",
  payload: origin,
});

export const setDestination = (destination) => ({
  type: "SET_DESTINATION",
  payload: destination,
});

export const setSingleMarker = (coordinates) => ({
  type: "SET_SINGLE_MARKER",
  payload: coordinates,
});

export const setTemporaryMarker = (coordinates) => ({
  type: "SET_TEMPORARY_MARKER",
  payload: coordinates,
});
