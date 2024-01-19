import styles from "./Rute.module.css";
import { getTime } from "../../../utility/getTime";

function transportMode(mode) {
  if (mode === "bus") return `🚍 Buss`;
  if (mode === "metro") return `🚇 T-bane`;
  if (mode === "foot") return `🚶 Gange`;
  if (mode === "water") return `⛴️ Båt`;
  if (mode === "tram") return `🚊 Trikk`;
  if (mode === "rail") return `🚆 Tog`;
}

function transportDescription(route, number) {
  return `Linje ${number}, ${route}`;
}

function Rute({ rute }) {
  return (
    <li className={styles.routeContainer}>
      <div className={styles.infoContainer}>
        <p>Tidsbruk: {Math.round(rute.duration / 60)} min</p>
        <p>Gange: {Math.round(rute.walkDistance)} meter</p>
      </div>
      <ul className={styles.descriptionContainer}>
        {rute.legs.map((el, i) => (
          <li key={i}>
            <p>
              <span>{transportMode(el.mode)}</span>
              <br />
              {el.line?.id && (
                <span>
                  {transportDescription(el.line.name, el.line.publicCode)}
                </span>
              )}
            </p>
            <p>
              <span>Avgangstid: {getTime(el.expectedStartTime)}</span>
              {", "}
              <span>ankomst: {getTime(el.expectedEndTime)}</span>
            </p>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default Rute;
