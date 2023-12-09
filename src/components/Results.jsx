import styles from "./Results.module.css";
import ProductLine from "./ProductLine";

function Results({ searchRes, selectedShops, tickedShops }) {
  console.log(searchRes);

  return (
    <div className={styles.resultContainer}>
      {searchRes.data.map((el, i) => (
        <ProductLine key={i} productInfo={el} />
      ))}
    </div>
  );
}

export default Results;
