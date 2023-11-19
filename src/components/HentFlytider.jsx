import XMLParser from "react-xml-parser";
import styles from "./HentFlytider.module.css";
import Selector from "./Selector";
import { useState } from "react";

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

const dir = [
  ["Alle flyvninger", ""],
  ["Ankomst", "&direction=A"],
  ["Avganger", "&direction=D"],
];

function HentFlytider({ setFlightData, setIsLoading, setError }) {
  const [airport, setAirport] = useState("");
  const [direction, setDirection] = useState(["Alle flyvninger", ""]);

  console.log(airport, direction);

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
    <>
      <div className={styles.selectContainer}>
        <select
          onChange={(e) => setAirport(e.target.value)}
          placeholder="Velg flyplass"
        >
          <option value="">Velg flyplass</option>
          {flyplasser.map(([kode, navn]) => (
            <option key={kode} value={kode}>
              {kode} - {navn}
            </option>
          ))}
        </select>
        <Selector updateSelection={setDirection} options={dir} />
        <button onClick={callback}>Søk flyvninger</button>
      </div>
    </>
  );
}

export default HentFlytider;
