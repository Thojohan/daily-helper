import styles from "./FlightLine.module.css";
import { getTime } from "../../utility/getTime";
function statusCode(code) {
  if (code === "A") return "Landet";
  if (code === "C") return "Innstilt";
  if (code === "D") return "Avreist";
  if (code === "E") return "Ny tid";
  if (code === "N") return "Ny info";
  return "";
}

function airportString(list, compareFirst, compareSecond) {
  console.log(compareFirst, compareSecond);
  const formated = list.reduce((acc, el, i) => {
    console.log(el);
    const name = [...compareFirst, ...compareSecond].find(
      (airport) => airport[0] === el
    );
    console.log(name);
    return `${acc}${i > 0 ? ", " : ""}${name[1] || ""}`;
  }, "");

  return formated;
}

function FlightLine({ flightData, index, flyplasser, allAirports }) {
  const statusLine = flightData.status
    ? `${statusCode(flightData.status[0])}`
    : "";

  const description = `${flightData.arr_dep === "D" ? "✈️" : "🛬"} ${
    flightData.dom_int === "D" ? "Innenlandsflyvning" : "Utenlandsflyvning"
  } ${flightData.dom_int === "I" ? "🛑" : ""} ${
    flightData.arr_dep === "D" ? "til" : "fra"
  } ${airportString(flightData?.airport.split(","), flyplasser, allAirports)} ${
    flightData.via_airport
      ? "via " +
        airportString(
          flightData?.via_airport?.split(","),
          flyplasser,
          allAirports
        )
      : ""
  } `;
  return (
    <li
      className={styles.line}
      style={{
        backgroundColor: `${
          (index / 2) % 1 ? "rgba(0, 0, 0, 0.3)" : "rgba(100, 100, 100, 0.3)"
        }`,
      }}
    >
      <p className={styles.short}>
        <span>{flightData.airline}</span>
        {" - "}
        <span>{flightData.flight_id}</span>
      </p>
      <p className={styles.long}>{description}</p>
      <p className={styles.short}>{getTime(flightData.schedule_time)}</p>

      <p className={styles.short}>
        {flightData.check_in &&
          `Innsjekk ${String(flightData.check_in).split(" ").join(" , ")} `}
        {flightData.gate && `Gate ${flightData.gate} `}
        {flightData.belt && `Bagasjebelte ${flightData.belt} `}
      </p>
      <p className={styles.short}>
        {flightData.delayed === "Y" && "🟡 Forsinket, "}
        {statusLine}
      </p>

      <p className={styles.short}>
        {flightData.status && flightData.status[1]
          ? `${getTime(flightData.status[1])}`
          : ""}
      </p>
    </li>
  );
}

export default FlightLine;
