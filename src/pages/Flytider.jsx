import XMLParser from "react-xml-parser";
import styles from "./Flytider.module.css";
import PageNav from "../components/PageNav";
import HentFlytider from "../components/Flytider/HentFlytider";
import ShowFlights from "../components/Flytider/ShowFlights";
import Loading from "../components/Loading";
import { useState, useEffect } from "react";
import ErrorMessage from "../components/ErrorMessage";

const flyplasser = [
  ["AES", "Ålesund"],
  ["ALF", "Alta"],
  ["ANX", "Andenes"],
  ["BDU", "Bardufoss"],
  ["BGO", "Bergen"],
  ["BJF", "Båtsfjord"],
  ["BNN", "Brønnøysund"],
  ["BOO", "Bodø"],
  ["BVG", "Berlevåg"],
  ["DLD", "Dagali"],
  ["EVE", "Harstad/Narvik"],
  ["FAN", "Farsund"],
  ["FDE", "Førde"],
  ["FRO", "Florø"],
  ["GLL", "Gol"],
  ["HAA", "Hasvik"],
  ["HAU", "Haugesund"],
  ["HFT", "Hammerfest"],
  ["HMR", "Hamar"],
  ["HOV", "Ørsta/Volda"],
  ["HVG", "Honningsvåg"],
  ["KKN", "Kirkenes"],
  ["KRS", "Kristiansand S"],
  ["KSU", "Kristiansund N"],
  ["LKL", "Lakselv"],
  ["LKN", "Leknes"],
  ["LYR", "Longyearbyen"],
  ["MEH", "Mehamn"],
  ["MJF", "Mosjøen"],
  ["MOL", "Molde"],
  ["MQN", "Mo i Rana"],
  ["NTB", "Notodden"],
  ["NVK", "Narvik"],
  ["OLA", "Ørland"],
  ["OSL", "Oslo"],
  ["OSY", "Namsos"],
  ["QKX", "Kautokeino"],
  ["RET", "Røst"],
  ["RRS", "Røros"],
  ["RVK", "Rørvik"],
  ["RYG", "Rygge"],
  ["SDN", "Sandane"],
  ["SKE", "Skien"],
  ["SKN", "Stokmarknes"],
  ["SOG", "Sogndal"],
  ["SOJ", "Sørkjosen"],
  ["SRP", "Stord"],
  ["SSJ", "Sandnessjøen"],
  ["SVG", "Stavanger"],
  ["SVJ", "Svolvær"],
  ["TOS", "Tromsø"],
  ["TRD", "Trondheim"],
  ["TRF", "Sandefjord"],
  ["VAW", "Vardø"],
  ["VDB", "Fagernes"],
  ["VDS", "Vadsø"],
  ["VRY", "Værøy"],
];
function Flytider() {
  const [flightData, setFlightData] = useState(null);
  const [allAirports, setAllAirports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(function () {
    setIsLoading(true);
    async function getAllAirports() {
      try {
        const response = await fetch(
          `https://corsproxy.io/?https://flydata.avinor.no/airportNames.asp?`,

          { type: "GET", mode: "cors" }
        );
        if (!response.ok) throw new Error("Kunne ikke hente flydata");

        const xmlData = await response.text();
        const jsonData = await new XMLParser().parseFromString(xmlData);
        const allPorts = jsonData.children.map((el) => [
          el.attributes.code,
          el.attributes.name,
        ]);
        console.log(allPorts);
        setAllAirports(allPorts);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    }
    getAllAirports();
  }, []);

  console.log(allAirports);
  return (
    <div className={styles.pageContainer}>
      <PageNav />
      <section className={styles.sectionContainer}>
        <HentFlytider
          setFlightData={setFlightData}
          setIsLoading={setIsLoading}
          setError={setError}
          flyplasser={flyplasser}
        />
        <ul className={styles.resultContainer}>
          {isLoading && <Loading />}
          {error && <ErrorMessage error={error} />}
          {flightData && (
            <ShowFlights
              flightData={flightData}
              flyplasser={flyplasser}
              allAirports={allAirports}
            />
          )}
        </ul>
      </section>
    </div>
  );
}

export default Flytider;
