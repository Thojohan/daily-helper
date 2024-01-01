import { useRef } from "react";
import styles from "./PriceQueryBar.module.css";

function PriceQueryBar({
  setSearchRes,
  tickedShops,
  setTickedShops,
  sortBy,
  setSortBy,
  setIsLoading,
  setError,
}) {
  const listItems = useRef("");
  const text = useRef("");
  const unique = useRef("");
  const maxSum = useRef("");

  function updateSearch() {
    if (!text.current.value) return;
    async function getPrices() {
      setIsLoading(true);
      try {
        const data = await fetch(
          `https://kassal.app/api/v1/products?search=${
            text.current.value
          }&size=${listItems.current.value}&price_min=1&price_max=${
            maxSum.current.value
          }&unique=${unique.current.checked === true ? 1 : 0}`,
          {
            headers: {
              Authorization: "Bearer 4HlFoWeBFqsWPoEId3gdP0ke9lwj3XndHk4n7WHr",
            },
          }
        );
        if (!data.ok) throw new Error("Couldn't fetch data");
        const json = await data.json();
        setSearchRes(json);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    getPrices();
  }
  return (
    <div className={styles.queryBarContainer}>
      <div className={styles.inputContainer}>
        <label className={styles.smallInput}>Vis antall</label>
        <select ref={listItems} min={1} max={100} defaultValue={50}>
          <option value={1}>1</option>,<option value={5}>5</option>,
          <option value={10}>10</option>,<option value={25}>25</option>,
          <option value={50}>50</option>,<option value={100}>100</option>,
        </select>
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="billigst" className={styles.smallInput}>
          Kun billigste alternativ(er){" "}
        </label>
        <input
          name="billigst"
          ref={unique}
          type="checkbox"
          defaultChecked={false}
        ></input>
      </div>
      <div className={styles.inputContainer}>
        <input
          className={styles.bigInput}
          type="text"
          ref={text}
          placeholder="Fritekst, søk etter matvarer..."
        />{" "}
      </div>
      <div className={styles.inputContainer}>
        <input
          className={styles.smallInput}
          type="number"
          ref={maxSum}
          inputMode="numeric"
          placeholder="Maks pris"
          min={0}
        />
      </div>
      <span style={{ width: "90px" }}>
        <button className={styles.submitButton} onClick={updateSearch}>
          🔍Søk
        </button>
      </span>{" "}
      <div className={styles.inputContainer}>
        <label className={styles.smallInput} htmlFor="sortere">
          Sorter etter{" "}
        </label>
        <select
          name="sortere"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          {" "}
          <option value={""}>Usortert</option>,
          <option value={"prisStig"}>Pris, stigende</option>,
          <option value={"prisSynk"}>Pris, synkende</option>,
          <option value={"alfSynk"}>Alfabetisk, synkende</option>,
          <option value={"alfStig"}>Alfabetisk, stigende</option>,
          <option value={"protein"}>Mest protein</option>,
          <option value={"karbohydrater"}>Minst karobohydrater</option>,
          <option value={"fett"}>Minst fett</option>,
        </select>
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.smallInput} htmlFor="kunValgte">
          Kun valgte butikk(er)
        </label>
        <input
          name="kunValgte"
          checked={tickedShops}
          type="checkbox"
          onChange={() => setTickedShops(!tickedShops)}
        ></input>
      </div>
    </div>
  );
}

export default PriceQueryBar;
