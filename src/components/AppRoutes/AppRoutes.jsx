import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../../pages/Home/Home";
import Matpriser from "../../pages/Matpriser/Matpriser";
import Okonomi from "../../pages/Okonomi/Okonomi";
import Stroempriser from "../../pages/Stroempriser/Stroempriser";
import Vaeret from "../../pages/Vaeret/Vaeret";
import Flytider from "../../pages/Flytider/Flytider";
import Reiseplanlegger from "../../pages/Reiseplanlegger/Reiseplanlegger";
import PageNotFound from "../../pages/PageNotFound/PageNotFound";

function AppRoutes({ state, dispatch }) {
  const { latitude, longitude } = state.position;
  const { location, mapStyle } = state;

  return (
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
        <Route
          path="/reiseplanlegger"
          element={<Reiseplanlegger dispatch={dispatch} state={state} />}
        />
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
  );
}

export default AppRoutes;
