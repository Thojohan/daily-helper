import { useEffect, useState } from "react";
import styles from "./MenuSelector.module.css";

function MenuSelector({ array, selected, setSelected, placeholder }) {
  const [expand, setExpand] = useState(false);

  function updateChecked(e) {
    if (selected.find((el) => el === e.target.value))
      setSelected(selected.filter((elem) => elem !== e.target.value));
    if (!selected.find((el) => el === e.target.value))
      setSelected([...selected, e.target.value]);
  }

  function handleClickOutside(e) {
    const classList = e.target.closest("div").classList.value;
    if (classList.includes("wrapper")) return;
    setExpand(false);
    const el = document.getElementById("wrap");

    el.scrollTop = 0;
  }
  useEffect(function () {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div
      className={styles.wrapper}
      id="wrap"
      style={{
        height: `${expand ? "500px" : ""}`,
        overflowY: `${expand ? "auto" : "hidden"}`,
      }}
    >
      <ul className={styles.selectContainer} placeholder={`${placeholder}`}>
        <li className={styles.firstItem} onClick={() => setExpand(!expand)}>
          <span>{placeholder}</span>
          <span style={{ width: "10%", lineHeight: "100%" }}>
            {expand ? "⯅" : "⯆"}
          </span>
        </li>
        {array.map(([firstparam, secondparam], i) => (
          <li key={i}>
            <label htmlFor={firstparam}>
              {firstparam} {secondparam ? `- ${secondparam}` : ""}
            </label>
            <input
              id={firstparam}
              type="checkbox"
              value={firstparam}
              onChange={updateChecked}
            />{" "}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MenuSelector;
