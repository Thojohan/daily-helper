import { useRef } from "react";
import styles from "./PriceQueryBar.module.css";

function PriceQueryBar({ setSearchRes, tickedShops, setTickedShops }) {
  const listItems = useRef("");
  const text = useRef("");
  const unique = useRef("");
  const maxSum = useRef("");
  console.log(unique);

  function updateSearch() {
    if (!text.current.value) return;
    async function getPrices() {
      try {
        const data = await fetch(
          `https://kassal.app/api/v1/products?search=${text.current.value}&size=${listItems.current.value}&price_max=${maxSum.current.value}`,
          {
            headers: {
              Authorization: "Bearer 4HlFoWeBFqsWPoEId3gdP0ke9lwj3XndHk4n7WHr",
            },
          }
        );

        const json = await data.json();
        setSearchRes(json);
        console.log(json);
      } catch (err) {
        console.log(err);
      }
    }
    getPrices();
  }
  return (
    <div className={styles.queryBarContainer}>
      <span>
        <label>
          Vis antall varer{" "}
          <select ref={listItems} min={1} max={100} defaultValue={25}>
            <option value={1}>1</option>,<option value={5}>5</option>,
            <option value={10}>10</option>,<option value={25}>25</option>,
            <option value={50}>50</option>,<option value={100}>100</option>,
          </select>
        </label>
      </span>
      <span>
        <label>
          Kun billigste alternativ(er)
          <span>
            <input ref={unique} type="checkbox" defaultChecked={false}></input>
          </span>
        </label>
      </span>
      <span>
        <label>
          Kun valgte butikk(er)
          <span>
            <input
              checked={tickedShops}
              type="checkbox"
              onChange={() => setTickedShops(!tickedShops)}
            ></input>
          </span>
        </label>
      </span>

      <div className={styles.inputContainer}>
        <input
          className={styles.bigInput}
          type="text"
          ref={text}
          placeholder="Fritekst, søk etter matvarer..."
        />
        <input
          className={styles.smallInput}
          type="number"
          ref={maxSum}
          inputMode="numeric"
          placeholder="Maks pris"
          min={0}
        />
      </div>
      <button className={styles.submitButton} onClick={updateSearch}>
        🔍Søk
      </button>
    </div>
  );
}

export default PriceQueryBar;
