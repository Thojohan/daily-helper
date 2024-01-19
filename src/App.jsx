import React, { useEffect, useReducer } from "react";
import { startValues } from "./utility/startValues";
import { reducer } from "./utility/reducer";
import { handleNoPosition } from "./utility/handleNoPosition";
import HelpModal from "./pages/HelpModal/HelpModal";
import AppRoutes from "./components/AppRoutes/AppRoutes";

const { initialState, options } = startValues();

export const StateContext = React.createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(function () {
    const nav = navigator.geolocation.getCurrentPosition(
      (object) => dispatch({ type: "changePosition", payload: object.coords }),
      handleNoPosition,
      options
    );
  }, []);

  useEffect(
    function () {
      async function getLocation() {
        try {
          const data = await fetch(
            `${
              import.meta.env.VITE_BIGDATACLOUD_URL
            }/data/reverse-geocode-client?latitude=${
              state.position.latitude
            }&longitude=${state.position.longitude}&localityLanguage=no`
          );
          const json = await data.json();
          dispatch({ type: "changeLocation", payload: json });
        } catch (er) {
          dispatch({ type: "changeLocation", payload: `Error: ${er}` });
        }
      }
      getLocation();
    },
    [state.position]
  );

  return (
    <div>
      {state.showModal ? (
        <HelpModal defaultText={state.modalPath} dispatch={dispatch} />
      ) : (
        ""
      )}
      <StateContext.Provider value={{ state, dispatch }}>
        <AppRoutes state={state} dispatch={dispatch} />
      </StateContext.Provider>
    </div>
  );
}

export default App;
