import { useEffect, useState } from "react";
import PageNav from "../components/PageNav";
import styles from "./Reiseplanlegger.module.css";

function Reiseplanlegger() {
  const [travel, setTravel] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const query = `{
    stopPlace(id: "NSR:StopPlace:59872") {
      name
      id
      estimatedCalls(numberOfDepartures: 5, whiteListedModes: [rail]) {
        expectedDepartureTime
        aimedDepartureTime
        destinationDisplay {
          frontText
        }
        serviceJourney {
          line {
            publicCode
            transportMode
          }
        }
      }
    }
  }`;

  useEffect(function () {
    async function fetchTravel() {
      setError(false);
      setIsLoading(true);
      try {
        const data = await fetch(
          "https://api.entur.io/journey-planner/v2/graphql",
          {
            method: "POST",
            headers: {
              // Replace this with your own client name:
              "ET-Client-Name": "TJ-learningReact",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
          }
        );

        console.log(data);
        if (!data.ok) throw new Error("Failed to fetch data ");

        const jsonData = await data.json();
        console.log(jsonData);
        setTravel(jsonData);
      } catch (er) {
        setError(er);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTravel();
  }, []);
  return (
    <div className={styles.pageContainer}>
      <PageNav />
      <p>Kommer</p>
    </div>
  );
}

export default Reiseplanlegger;
