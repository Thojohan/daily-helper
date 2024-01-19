import LineChart from "../../Chart/LineChart";
import styles from "./ProductLine.module.css";

const heading = "";
const unit = "kr";

function ProductLine({ productInfo, active }) {
  const date = productInfo.price_history
    ?.map((pris) => {
      const time = new Date(pris.date);
      return `${String(time.getDate()).padStart(2, 0)}.${String(
        time.getMonth() + 1
      ).padStart(2, 0)}.${time.getFullYear()}`;
    })
    .reverse();

  const chartInput = [
    {
      label: ["Prisutvikling"],
      data: productInfo.price_history.map((val) => val.price).reverse(),
      backgroundColor: "rgb(150, 200, 222, 0.3)",
      borderColor: "white",
      borderWidth: 1.5,
      fill: true,
    },
  ];

  return (
    <>
      <div className={styles.imgContainer}>
        {" "}
        <img src={productInfo.image} alt="Bilde mangler"></img>{" "}
      </div>
      <div className={styles.textContainer}>
        <p className={styles.smallText}>{productInfo.name}</p>
        <p className={styles.smallText}>
          {`
          ${Number(productInfo.current_price).toFixed(2)} på ${
            productInfo.store?.name
          }`}
        </p>
        <p
          style={{
            width: "42%",
            fontSize: `${
              productInfo.ingredients?.split(",").length > 45
                ? "0.55rem"
                : "0.7rem"
            }`,
          }}
        >
          {productInfo.ingredients}
        </p>
        <p style={{ width: "19%" }}>
          {productInfo.nutrition?.map((el, i) => (
            <span key={i}>
              {el.display_name}: {el.amount}
              {el.unit}
              {i === productInfo.nutrition.length - 1 ? "." : ", "}
            </span>
          ))}
        </p>
      </div>

      {active ? (
        <div className={`${styles.chartContainer} ${active && styles.active}`}>
          <LineChart
            time={date}
            unit={unit}
            heading={heading}
            datasets={chartInput}
            heigth="200px"
            label={false}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default ProductLine;
