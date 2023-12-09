import { useContext } from "react";
import styles from "./PageNav.module.css";
import { NavLink } from "react-router-dom";

import { StateContext } from "../App";
function PageNav() {
  const [state, dispatch] = useContext(StateContext);
  const { position, location, mapStyle } = state;

  console.log(state);

  return (
    <nav className={styles.navContainer}>
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
          <NavLink to="/nummersoek">Nummersøk</NavLink>
        </li>
        <li>
          <NavLink to="/flytider">Flytider</NavLink>
        </li>
      </ul>
    </nav>
  );
}
export default PageNav;
