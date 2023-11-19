import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Matpriser from "./pages/Matpriser";
import Nummersoek from "./pages/Nummersoek";
import Stroempriser from "./pages/Stroempriser";
import Vaeret from "./pages/Vaeret";
import Flytider from "./pages/Flytider";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/matpriser" element={<Matpriser />} />
          <Route path="/nummersoek" element={<Nummersoek />} />
          <Route path="/stroempriser" element={<Stroempriser />} />
          <Route path="/vaeret" element={<Vaeret />} />
          <Route path="/flytider" element={<Flytider />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
