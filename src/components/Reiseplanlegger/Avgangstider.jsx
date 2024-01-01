import styles from "./Avgangstider.module.css";
import { getTime } from "../../utility/getTime";

function transportIcon(mode) {
  if (mode === "bus") return "🚌";
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
      <span>
        {transportIcon(info.serviceJourney.journeyPattern.line.transportMode)}
      </span>
      <span className={styles.description}>{lineName}</span>
      <span> Planlagt: {getTime(orgDepTime)}</span>
      <span>Ny tid: {getTime(newDepTime)}</span>
    </p>
  );
}

export default Avgangstider;
