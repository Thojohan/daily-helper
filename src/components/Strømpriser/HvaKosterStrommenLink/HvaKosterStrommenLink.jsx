import styles from "./HvaKosterStrommenLink.module.css";

function HvaKosterStrommenLink() {
  return (
    <p className={styles.sourceLink}>
      <a href={import.meta.env.VITE_HVAKOSTERSTROMMEN_URL}>
        <img
          src={import.meta.env.VITE_HVAKOSTERSTROMMEN_IMG}
          alt="Strømpriser levert av Hva koster strømmen.no"
          width="150"
          height="35"
        />
      </a>
    </p>
  );
}

export default HvaKosterStrommenLink;
