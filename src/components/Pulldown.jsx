import styles from "./Pulldown.module.css";

function Pulldown({ array, setter, placeholder }) {
  return (
    <div className={styles.pulldownContainer}>
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

export default Pulldown;
