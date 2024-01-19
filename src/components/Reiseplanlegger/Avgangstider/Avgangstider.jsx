import styles from "./Avgangstider.module.css";
import { getTime } from "../../../utility/getTime";

function transportIcon(mode) {
  if (mode === "bus" || mode === "coach") return "🚌";
  if (mode === "rail") return "🚅";
  if (mode === "tram") return "🚊";
  if (mode === "metro") return "🚇";
  if (mode === "water") return "⛴️";
}

function Avgangstider({ info }) {
  const lineName = info.serviceJourney.journeyPattern.line.name;
  const orgDepTime = new Date(info.aimedDepartureTime);
  const newDepTime = new Date(info.expectedDepartureTime);

  return (
    <p className={styles.avgangsItem}>
      <span style={{ width: "5%" }}>
        {transportIcon(info.serviceJourney.journeyPattern.line.transportMode)}
      </span>
      <span style={{ width: "40%" }}>{lineName}</span>
      <span> Avgangstid: {getTime(orgDepTime)}</span>
      {getTime(orgDepTime) !== getTime(newDepTime) ? (
        <span>Ny tid: {getTime(newDepTime)}</span>
      ) : (
        <span>{""}</span>
      )}
    </p>
  );
}

export default Avgangstider;
