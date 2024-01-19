export function handleNoPosition() {
  alert(
    "Kunne ikke finne din posisjon. Setter til Oslo, Norge. Du kan endre denne ved å velge ny posisjon på kartet"
  );
  dispatch({ type: "setDefaultPosition" });
}
