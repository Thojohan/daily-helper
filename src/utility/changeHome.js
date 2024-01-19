export function changeHome([lat, lng], dispatch) {
  dispatch({
    type: "changePosition",
    payload: {
      latitude: lat,
      longitude: lng,
      accuracy: 0,
    },
  });
}
