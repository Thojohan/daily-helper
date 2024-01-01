import styles from "./Prices.module.css";
import PriceQueryBar from "./PriceQueryBar";
import { useState } from "react";
import Results from "./Results";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";

function Prices({ selectedShops }) {
  const [searchRes, setSearchRes] = useState([]);
  const [tickedShops, setTickedShops] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={styles.priceContainer}>
      <PriceQueryBar
        setSearchRes={setSearchRes}
        selectedShops={selectedShops}
        tickedShops={tickedShops}
        setTickedShops={setTickedShops}
        setSortBy={setSortBy}
        sortBy={sortBy}
        setIsLoading={setIsLoading}
        setError={setError}
      />
      <ul className={styles.resultContainer}>
        {isLoading && <Loading />}
        {error && <ErrorMessage />}
        {searchRes.data?.length > 0 && (
          <Results
            searchRes={searchRes}
            selectedShops={selectedShops}
            tickedShops={tickedShops}
            sortBy={sortBy}
          />
        )}
      </ul>
    </div>
  );
}

export default Prices;
