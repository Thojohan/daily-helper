import styles from "./FlightLine.module.css";

function FlightLine({ flightData }) {
  function getTime(timeISO) {
    const time = new Date(timeISO);
    return `${String(time.getHours()).padStart(2, 0)}: ${String(
      time.getMinutes()
    ).padStart(2, 0)}`;
  }
  console.log(flightData);
  const description = `${
    flightData.dom_int === "I" ? "Internasjonal flyvning" : "Innenlandsflyvning"
  } ${flightData.arr_dep === "D" ? "til" : "fra"} ${flightData.airport}`;
  return (
    <div className={styles.line}>
      <span className={styles.shortSpan}>{flightData.airline} </span>
      <span className={styles.shortSpan}>{flightData.flight_id}</span>
      <span className={styles.longSpan}>{description}</span>
      <span className={styles.shortSpan}>
        {getTime(flightData.schedule_time)}
      </span>
      <span className={styles.shortSpan}>{flightData.check_in}</span>
      <span className={styles.shortSpan}>{flightData.gate}</span>
      <span className={styles.shortSpan}>{flightData.belt}</span>
      <span className={styles.shortSpan}>{flightData.status}</span>
    </div>
  );
}

export default FlightLine;
