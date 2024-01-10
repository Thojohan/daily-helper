import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useReducer } from "react";
import Home from "./pages/Home";
import Matpriser from "./pages/Matpriser";
import Okonomi from "./pages/Okonomi";
import Stroempriser from "./pages/Stroempriser";
import Vaeret from "./pages/Vaeret";
import Flytider from "./pages/Flytider";
import PageNotFound from "./pages/PageNotFound";
import { mapOptions } from "./utility/mapOptions";
import HelpModal from "./pages/HelpModal";
import Reiseplanlegger from "./pages/Reiseplanlegger";

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
const mapOpt = mapOptions();

const initialState = {
  position: {},
  location: null,
  mapStyle: mapOpt[0],
  showModal: false,
  modalPath: "/",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case "mapStyleChange":
      return {
        ...state,
        mapStyle: payload,
      };
    case "changePosition":
      return {
        ...state,
        position: payload,
      };
    case "setDefaultPosition":
      return {
        ...state,
        position: {
          latitude: 59.90850878072872,
          longitude: 10.744399996474385,
          accuracy: 0,
        },
      };
    case "changeLocation":
      return {
        ...state,
        location: payload,
      };
    case "switchModal":
      return {
        ...state,
        showModal: !state.showModal,
        modalPath: payload,
      };
    default: {
      throw new Error("Unknown action");
    }
  }
}

export const StateContext = React.createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { latitude, longitude } = state.position;
  const { location, mapStyle } = state;

  function handleNoPosition() {
    alert(
      "Kunne ikke finne din posisjon. Setter til Oslo, Norge. Du kan endre denne ved å velge ny posisjon på kartet"
    );
    dispatch({ type: "setDefaultPosition" });
  }

  console.log(import.meta.env.VITE_SOME_KEY);

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
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=no`
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
      <StateContext.Provider value={[state, dispatch]}>
        <BrowserRouter basename="/daily-helper/">
          <Routes>
            <Route index element={<Home state={state} dispatch={dispatch} />} />
            <Route
              path={`/matpriser`}
              element={
                <Matpriser
                  latitude={latitude}
                  longitude={longitude}
                  mapStyle={mapStyle}
                />
              }
            />
            <Route path="/okonomi" element={<Okonomi />} />
            <Route path="/reiseplanlegger" element={<Reiseplanlegger />} />
            <Route path="/stroempriser" element={<Stroempriser />} />
            <Route
              path={`/vaeret`}
              element={
                <Vaeret lat={latitude} lng={longitude} location={location} />
              }
            />
            <Route path="/flytider" element={<Flytider />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </StateContext.Provider>
    </div>
  );
}

export default App;
