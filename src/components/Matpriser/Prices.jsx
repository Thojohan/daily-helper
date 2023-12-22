import styles from "./Prices.module.css";
import PriceQueryBar from "./PriceQueryBar";
import { useState } from "react";
import Results from "./Results";

function Prices({ selectedShops }) {
  const [searchRes, setSearchRes] = useState([]);
  const [tickedShops, setTickedShops] = useState(false);
  const [sortBy, setSortBy] = useState("");

  return (
    <div className={styles.priceContainer}>
      <PriceQueryBar
        setSearchRes={setSearchRes}
        selectedShops={selectedShops}
        tickedShops={tickedShops}
        setTickedShops={setTickedShops}
        setSortBy={setSortBy}
        sortBy={sortBy}
      />
      {searchRes.data?.length > 0 && (
        <Results
          searchRes={searchRes}
          selectedShops={selectedShops}
          tickedShops={tickedShops}
          sortBy={sortBy}
        />
      )}
    </div>
  );
}

export default Prices;
