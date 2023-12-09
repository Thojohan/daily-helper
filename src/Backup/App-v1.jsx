import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState, useRef, useReducer } from "react";
import Home from "./pages/Home";
import Matpriser from "./pages/Matpriser";
import Nummersoek from "./pages/Nummersoek";
import Stroempriser from "./pages/Stroempriser";
import Vaeret from "./pages/Vaeret";
import Flytider from "./pages/Flytider";

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

const initialState = {
  position: {},
  location: null,
  mapStyle: [
    "Default Leaflet Style",
    {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ],
};

function reducer(state, { type, payload }) {
  switch (type) {
    case "mapStyle":
      return {
        ...state,
        mapStyle: payload,
      };
    case "positionChange":
      return {
        ...state,
        position: payload,
      };
    case "locationChange":
      return {
        ...state,
        location: payload,
      };
    default: {
      throw new Error("Unknown action");
    }
  }
}

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
  const [state, reducer] = useReducer(reducer, initialState);

  const { latitude, longitude, accuracy } = state.position;

  useEffect(function () {
    console.log(position);
    const nav = navigator.geolocation.getCurrentPosition(
      (object) => setPosition(object.coords),
      setPosition("Error"),
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
          setLocation(json);
        } catch (er) {}
      }
      getLocation();
    },
    [position]
  );

  return (
    <div>
      <BrowserRouter basename="/daily-helper/">
        <Routes>
          <Route
            index
            element={
              <Home
                latitude={latitude}
                longitude={longitude}
                accuracy={accuracy}
                location={location}
                setPosition={setPosition}
                mapStyle={mapStyle}
                setMapStyle={setMapStyle}
              />
            }
          />
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
