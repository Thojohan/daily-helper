import styles from "./Flytider.module.css";
import PageNav from "../components/PageNav";
import HentFlytider from "../components/HentFlytider";
import ShowFlights from "../components/ShowFlights";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { useState } from "react";

function Flytider() {
  const [flightData, setFlightData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  console.log(flightData);
  return (
    <div className={styles.pageContainer}>
      <PageNav />
      <section className={styles.sectionContainer}>
        <HentFlytider
          setFlightData={setFlightData}
          setIsLoading={setIsLoading}
          setError={setError}
        />
        <div className={styles.resultContainer}>
          {isLoading && <Loading />}
          {error && <Error />}
          {flightData && <ShowFlights flightData={flightData} />}
        </div>
      </section>
    </div>
  );
}

export default Flytider;
