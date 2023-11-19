import FlightLine from "./FlightLine";

function ShowFlights({ flightData }) {
  const lastUpdated = flightData.children[0].attributes.lastUpdate;
  const parsedFlights = flightData.children[0].children
    .map((el) => el.children)
    .reduce((acc, el) => {
      const obj = el.reduce((acc, el) => {
        const attName = el.name;
        const attValue = el.value;
        return { ...acc, [attName]: attValue };
      }, {});
      return [...acc, obj];
    }, []);

  console.log(lastUpdated, parsedFlights);
  return (
    <>
      {parsedFlights.map((flightData) => (
        <FlightLine flightData={flightData} key={flightData.flight_id} />
      ))}
    </>
  );
}

export default ShowFlights;
