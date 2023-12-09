import styles from "./ProductLine.module.css";

function ProductLine({ productInfo }) {
  console.log(productInfo);
  return (
    <div className={styles.lineContainer}>
      <p>{productInfo.name}</p>
      <p>{`kr ${productInfo.current_price}0`}</p>
    </div>
  );
}

export default ProductLine;
