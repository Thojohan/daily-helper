import { useState } from "react";
import styles from "./Selector.module.css";

function Selector({ updateSelection, options }) {
  const [selectedOption, setSelectedOption] = useState(0);

  function update(index) {
    console.log(index);
    setSelectedOption(index);
    updateSelection(options[index]);
  }

  return (
    <div className={styles.selectorContainer}>
      {options.map((option, index) => (
        <p key={option}>
          <label>
            <span>{option.at(0)}</span>
            <input
              type="checkbox"
              checked={selectedOption === index}
              onChange={() => update(index)}
            />
          </label>
        </p>
      ))}
    </div>
  );
}
export default Selector;
