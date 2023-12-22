import styles from "./ButikkVelger.module.css";

function ButikkVelger({ setRangeValue }) {
  return (
    <div className={styles.sliderContainer}>
      <input
        type="range"
        id="km-slider"
        max={10}
        min={1}
        defaultValue={5}
        list="tickmarks"
        onChange={(e) => setRangeValue(e.target.value)}
      />
      <datalist className={styles.dataList} id="tickmarks">
        <option value="1" label="1km"></option>
        <option value="2"></option>
        <option value="3"></option>
        <option value="4"></option>
        <option value="5" label="5km"></option>
        <option value="6"></option>
        <option value="7"></option>
        <option value="8"></option>
        <option value="9"></option>
        <option value="10" label="10km"></option>
      </datalist>
    </div>
  );
}

export default ButikkVelger;
