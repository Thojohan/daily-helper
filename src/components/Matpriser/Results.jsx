import styles from "./Results.module.css";
import ProductLine from "./ProductLine";
import { useState } from "react";

function sortRes(res, sortWord) {
  if (!sortWord) return res;
  if (sortWord === "prisStig")
    return res.toSorted((a, b) => a.current_price - b.current_price);
  if (sortWord === "prisSynk")
    return res.toSorted((a, b) => b.current_price - a.current_price);
  if (sortWord === "alfStig")
    return res.toSorted((a, b) =>
      a.name.localeCompare(b.name, "no", { sensitivity: "base" })
    );
  if (sortWord === "alfSynk")
    return res.toSorted((a, b) =>
      b.name.localeCompare(a.name, "no", { sensitivity: "base" })
    );
  if (sortWord === "protein")
    return res.toSorted(
      (a, b) =>
        b.nutrition.reduce(
          (acc, el) => (el.code === "protein" ? acc + el.amount : acc),
          0
        ) -
        a.nutrition.reduce(
          (acc, el) => (el.code === "protein" ? acc + el.amount : acc),
          0
        )
    );
  if (sortWord === "karbohydrater")
    return res.toSorted(
      (a, b) =>
        a.nutrition.reduce(
          (acc, el) => (el.code === "karbohydrater" ? acc + el.amount : acc),
          0
        ) -
        b.nutrition.reduce(
          (acc, el) => (el.code === "karbohydrater" ? acc + el.amount : acc),
          0
        )
    );
  if (sortWord === "fett")
    return res.toSorted(
      (a, b) =>
        a.nutrition.reduce(
          (acc, el) => (el.code === "fett_totalt" ? acc + el.amount : acc),
          0
        ) -
        b.nutrition.reduce(
          (acc, el) => (el.code === "fett_totalt" ? acc + el.amount : acc),
          0
        )
    );
}
function Results({ searchRes, selectedShops, tickedShops, sortBy }) {
  const [isActive, setIsActive] = useState(null);

  const sorted = sortRes(searchRes.data, sortBy).filter((el) =>
    tickedShops ? selectedShops.find((e) => e === el.store.code) : el
  );

  return (
    <>
      {sorted.map((el, i) => (
        <li
          key={i}
          onClick={() => (isActive === i ? setIsActive(null) : setIsActive(i))}
          className={`${styles.lineContainer} ${
            isActive === i ? styles.active : ""
          }`}
        >
          <ProductLine productInfo={el} active={isActive === i} />
        </li>
      ))}
    </>
  );
}

export default Results;
