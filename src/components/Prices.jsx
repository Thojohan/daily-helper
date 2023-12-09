import styles from "./Prices.module.css";
import PriceQueryBar from "./PriceQueryBar";
import { useState } from "react";
import Results from "./Results";

function Prices({ selectedShops }) {
  const [searchRes, setSearchRes] = useState([]);
  const [tickedShops, setTickedShops] = useState(true);
  console.log(tickedShops);
  console.log(searchRes);
  return (
    <div className={styles.priceContainer}>
      <PriceQueryBar
        setSearchRes={setSearchRes}
        selectedShops={selectedShops}
        tickedShops={tickedShops}
        setTickedShops={setTickedShops}
      />
      {searchRes.data?.length > 0 && (
        <Results
          searchRes={searchRes}
          selectedShops={selectedShops}
          tickedShops={tickedShops}
        />
      )}
    </div>
  );
}

export default Prices;
