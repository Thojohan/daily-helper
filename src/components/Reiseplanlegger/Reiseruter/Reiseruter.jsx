import { useEffect, useState } from "react";
import Loading from "../../Status/LoadingMessage/Loading";
import ErrorMessage from "../../Status/ErrorMessage/ErrorMessage";
import styles from "./Reiseruter.module.css";
import Rute from "../Rute/Rute";

function queryConstructor(stopID, toPosition) {
  return `{
    trip(
      from: {
        place: "${stopID.at(0)}"
      },
      to: {
        coordinates: {
          latitude: ${toPosition.lat}
          longitude: ${toPosition.lng}
        }
      }
    ) {
      tripPatterns {
        duration
        walkDistance
        legs {
          expectedStartTime
          expectedEndTime
          mode
          distance
          line {
            id
            name
            publicCode
          }
        }
      }
    }
  }`;
}

function Reiseruter({ activeStop, goTo }) {
  const [ruteforslag, setRuteforslag] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(
    function () {
      async function fetchRuter() {
        setError(false);
        setIsLoading(true);
        try {
          const query = queryConstructor(activeStop, {
            lat: goTo.position.at(0),
            lng: goTo.position.at(1),
          });

          const data = await fetch(
            `${import.meta.env.VITE_ENTUR_URL}/journey-planner/v3/graphql`,
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

          setRuteforslag(jsonData.data.trip.tripPatterns);
        } catch (er) {
          setError(er);
        } finally {
          setIsLoading(false);
        }
      }
      fetchRuter();
    },
    [activeStop, goTo]
  );

  return (
    <div className={styles.ruteforslagContainer}>
      <h2>Ruteforslag fra {activeStop.at(1)} til valgt posisjon</h2>
      {isLoading && <Loading />}
      {error && <ErrorMessage error={error} />}
      {ruteforslag.length > 0 &&
        ruteforslag
          .sort((a, b) => a.duration - b.duration)
          .map((el, i) => <Rute key={i} rute={el} />)}
    </div>
  );
}

export default Reiseruter;
