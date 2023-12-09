import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useReducer } from "react";
import Home from "./pages/Home";
import Matpriser from "./pages/Matpriser";
import Nummersoek from "./pages/Nummersoek";
import Stroempriser from "./pages/Stroempriser";
import Vaeret from "./pages/Vaeret";
import Flytider from "./pages/Flytider";
import PageNotFound from "./pages/PageNotFound";
import { mapOptions } from "./utility/mapOptions";

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
    case "changeLocation":
      return {
        ...state,
        location: payload,
      };
    default: {
      throw new Error("Unknown action");
    }
  }
}

export const StateContext = React.createContext();

function App() {
  // const [position, setPosition] = useState({});
  // const [location, setLocation] = useState(null);
  // const [mapStyle, setMapStyle] = useState([
  //   "Default Leaflet Style",
  //   {
  //     url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  //     attribution:
  //       '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  //   },
  // ]);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { latitude, longitude } = state.position;
  const { location, mapStyle } = state;

  useEffect(function () {
    const nav = navigator.geolocation.getCurrentPosition(
      (object) => dispatch({ type: "changePosition", payload: object.coords }),
      dispatch({ type: "changePosition", payload: "Error" }),
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
      {" "}
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
            <Route path="/nummersoek" element={<Nummersoek />} />
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
