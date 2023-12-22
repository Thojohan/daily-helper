import XMLParser from "react-xml-parser";
import styles from "./HentFlytider.module.css";
import Selector from "../Selector";
import { useState } from "react";
import MenuSelector from "../MenuSelector";
import Pulldown from "../Pulldown";

const dir = [
  ["Alle flyvninger", ""],
  ["Ankomst", "&direction=A"],
  ["Avganger", "&direction=D"],
];

function HentFlytider({ setFlightData, setIsLoading, setError, flyplasser }) {
  const [airport, setAirport] = useState("");
  const [direction, setDirection] = useState(["Alle flyvninger", ""]);

  function callback() {
    if (!airport) return;
    setIsLoading(true);
    async function hentFly() {
      try {
        const response = await fetch(
          `https://corsproxy.io/?https://flydata.avinor.no/XmlFeed.asp?TimeFrom=1&TimeTo=7&airport=${airport}${direction.at(
            1
          )}`,

          { type: "GET", mode: "cors" }
        );
        const xmlData = await response.text();
        const jsonData = await new XMLParser().parseFromString(xmlData);
        setFlightData(jsonData);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    }
    hentFly();
  }
  // flydata();
  return (
    <div>
      <Pulldown
        array={flyplasser}
        setter={setAirport}
        placeholder="Velg flyplass"
      />
      <Selector updateSelection={setDirection} options={dir} />
      <button className={styles.pullDownButton} onClick={callback}>
        Søk flyvninger
      </button>
    </div>
  );
}

export default HentFlytider;
