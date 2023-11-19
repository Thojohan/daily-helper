import styles from "./PageNav.module.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

function PageNav() {
  const [{ latitude, longitude }, setPosition] = useState({});

  useEffect(function () {
    navigator.geolocation.getCurrentPosition(
      (object) => setPosition(object.coords),
      setPosition("Error")
    );
  }, []);
  return (
    <nav className={styles.navContainer}>
      <h1>
        <NavLink to="/">&#9886; Forbrukerguide &#9887;</NavLink>
      </h1>
      <ul>
        <li>
          <NavLink to="/matpriser">Matpriser</NavLink>
        </li>
        <li>
          <NavLink to="/stroempriser">Strømpriser</NavLink>
        </li>
        <li>
          <NavLink to={`/vaeret?lat=${latitude}&lng=${longitude}`}>
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
