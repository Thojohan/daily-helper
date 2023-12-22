import styles from "./MenuSelector.module.css";

function MenuSelector({ array, setter, placeholder }) {
  return (
    <div className={styles.selectContainer}>
      <select
        onChange={(e) => setter(e.target.value)}
        placeholder={`${placeholder}`}
      >
        <option value="">{`${placeholder}`}</option>
        {array.map(([firstparam, secondparam], i) => (
          <option key={i} value={firstparam}>
            {firstparam} {secondparam ? `- ${secondparam}` : ""}
          </option>
        ))}
      </select>
    </div>
  );
}

export default MenuSelector;
