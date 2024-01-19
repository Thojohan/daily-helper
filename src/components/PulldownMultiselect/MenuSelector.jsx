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
    if (classList.includes("wrapper") || classList.includes("firstItem"))
      return;
    setExpand(false);
    const el = document.getElementById("wrap");

    el.scrollTop = 0;
  }

  function firstElementClick(e) {
    if (e.target.type !== "submit") setExpand(!expand);
    if (e.target.type === "submit") {
      setSelected(selected.filter((_, i) => i !== Number(e.target.value)));
      updateChecked(e);
    }
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
        height: `${expand ? "500px" : "auto"}`,
      }}
    >
      <ul
        className={styles.selectContainer}
        placeholder={`${placeholder}`}
        style={{
          height: `${expand ? "500px" : ""}`,
          overflowY: `${expand ? "auto" : "hidden"}`,
        }}
      >
        <div className={styles.firstItem} onClick={firstElementClick}>
          <p style={{ width: "80%" }}>
            <span>
              {placeholder}
              <br />
              {selected.map((el, i) => (
                <button value={el} key={i}>
                  ❌{el}{" "}
                </button>
              ))}
            </span>
          </p>
          <p
            style={{
              verticalAlign: "middle",
              width: "20%",
              lineHeight: "100%",
            }}
          >
            {expand ? "⯅" : "⯆"}
          </p>
        </div>
        {array.map(([firstparam, secondparam], i) => (
          <li
            key={i}
            style={{
              height: `${expand ? "" : "0px"}`,
              visibility: `${expand ? "" : "hidden"}`,
            }}
          >
            <label htmlFor={firstparam}>
              {firstparam} {secondparam ? `- ${secondparam}` : ""}
            </label>
            <input
              id={firstparam}
              type="checkbox"
              data-value={firstparam}
              onChange={(e) =>
                e.target.checked
                  ? setSelected([...new Set([...selected, firstparam])])
                  : setSelected(selected.filter((el) => el !== firstparam))
              }
              checked={selected.find((el) => el === firstparam) ? true : false}
            />{" "}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MenuSelector;
