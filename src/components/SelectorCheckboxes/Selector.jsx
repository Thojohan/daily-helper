import { useState } from "react";
import styles from "./Selector.module.css";

function Selector({ updateSelection, options, reducerType = null, index = 0 }) {
  const [selectedOption, setSelectedOption] = useState(index);
  function update(index) {
    setSelectedOption(index);
    reducerType
      ? updateSelection({ type: reducerType, payload: options[index] })
      : updateSelection(options[index]);
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
