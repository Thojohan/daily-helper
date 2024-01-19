import styles from "./Rutetider.module.css";
import Loading from "../../Status/LoadingMessage/Loading";
import ErrorMessage from "../../Status/ErrorMessage/ErrorMessage";
import { useEffect, useState } from "react";
import Avgangstider from "../Avgangstider/Avgangstider";

function queryConstructor(stopID) {
  return `{stopPlace(id: "${stopID}") {
      id
      name
      estimatedCalls(timeRange: 72100, numberOfDepartures: 20) {     
        realtime
        aimedArrivalTime
        aimedDepartureTime
        expectedArrivalTime
        expectedDepartureTime
        actualArrivalTime
        actualDepartureTime
        date
        forBoarding
        forAlighting
        destinationDisplay {
          frontText
        }
        quay {
          id
        }
        serviceJourney {
          journeyPattern {
            line {
              id
              name
              transportMode
            }
          }
        }
      }
    }
}`;
}

function Rutetider({ activeStop }) {
  const [rutetider, setRutetider] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(
    function () {
      async function fetchRutetider() {
        setError(false);
        setIsLoading(true);
        try {
          const query = queryConstructor(activeStop);

          const data = await fetch(
            `${import.meta.env.VITE_ENTUR_URL}/journey-planner/v2/graphql`,
            {
              method: "POST",
              headers: {
                "ET-Client-Name": `${import.meta.env.VITE_ET_CLIENT_NAME}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ query }),
            }
          );

          if (!data.ok) throw new Error("Failed to fetch data ");

          const jsonData = await data.json();

          setRutetider(jsonData.data);
        } catch (er) {
          setError(er);
        } finally {
          setIsLoading(false);
        }
      }
      fetchRutetider();
    },
    [activeStop]
  );

  return (
    <div className={styles.avgangsContainer}>
      {" "}
      {rutetider.stopPlace && <h2>Avganger fra {rutetider.stopPlace.name}</h2>}
      <ul>
        {error && <ErrorMessage error={error} />}
        {isLoading && <Loading />}
        {rutetider.stopPlace?.estimatedCalls.length > 0 &&
          rutetider.stopPlace.estimatedCalls.map((el, i) => (
            <Avgangstider key={i} info={el} />
          ))}
      </ul>
    </div>
  );
}

export default Rutetider;
