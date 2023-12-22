import FlightLine from "./FlightLine";
import { getTime } from "../../utility/getTime";

function ShowFlights({ flightData, flyplasser, allAirports }) {
  const lastUpdated = flightData.children[0].attributes.lastUpdate;
  const parsedFlights = flightData.children[0].children
    .map((el) => el.children)
    .reduce((acc, el) => {
      const obj = el.reduce((acc, el) => {
        const attName = el.name;
        const attValue = el.value;
        return {
          ...acc,
          [attName]:
            attName === "status"
              ? [el.attributes.code, el.attributes.time]
              : attValue,
        };
      }, {});
      return [...acc, obj];
    }, []);

  return (
    <>
      <p
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <span>Sist oppdatert kl {getTime(lastUpdated)}</span>
        <span>Utenfor Schengen: 🛑</span>
      </p>
      {parsedFlights.map((flightData, i) => (
        <FlightLine
          flightData={flightData}
          key={flightData.flight_id + flightData.schedule_time}
          index={i}
          flyplasser={flyplasser}
          allAirports={allAirports}
        />
      ))}
    </>
  );
}

export default ShowFlights;
