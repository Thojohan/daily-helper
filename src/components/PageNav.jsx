import { useContext } from "react";
import styles from "./PageNav.module.css";
import { NavLink, useLocation } from "react-router-dom";

import { StateContext } from "../App";
function PageNav() {
  const [state, dispatch] = useContext(StateContext);
  const { position, location, mapStyle } = state;
  const url = useLocation();

  console.log(state);

  function helpFunction() {
    console.log(dispatch);
    dispatch({ type: "switchModal", payload: url.pathname || "/" });
    console.log(url);
  }

  return (
    <nav className={styles.navContainer}>
      <button className={styles.helpButton} onClick={helpFunction}>
        ?
      </button>
      <h1>
        <NavLink to="/">&#9886; Forbrukerguide &#9887;</NavLink>
      </h1>

      <ul>
        <li>
          <NavLink
            to={`/matpriser?lat=${position.latitude}&lng=${
              position.longitude
            }&map=${mapStyle.at(0)}&mapAt=${mapStyle
              .at(1)
              .attribution.replaceAll("&copy", "$$$$$")}&mapUrl=${
              mapStyle.at(1).url
            }`}
          >
            Matpriser
          </NavLink>
        </li>
        <li>
          <NavLink to="/stroempriser">Strømpriser</NavLink>
        </li>
        <li>
          <NavLink
            to={`/vaeret?lat=${position.latitude}&lng=${position.longitude}&loc=${location?.city}`}
          >
            Været
          </NavLink>
        </li>
        <li>
          <NavLink to="/okonomi">Økonomi</NavLink>
        </li>
        <li>
          <NavLink to="/reiseplanlegger">Reiseplanlegger</NavLink>
        </li>
        <li>
          <NavLink to="/flytider">Flytider</NavLink>
        </li>
      </ul>
    </nav>
  );
}
export default PageNav;
