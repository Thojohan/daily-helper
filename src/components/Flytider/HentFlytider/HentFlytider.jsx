import XMLParser from "react-xml-parser";
import styles from "./HentFlytider.module.css";
import Selector from "../../SelectorCheckboxes/Selector";
import { useState } from "react";
import Pulldown from "../../PulldownSelect/Pulldown";

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
          `${import.meta.env.VITE_CORS_PROXY_URL}/?${
            import.meta.env.VITE_AVINOR_URL
          }/XmlFeed.asp?TimeFrom=1&TimeTo=7&airport=${airport}${direction.at(
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
