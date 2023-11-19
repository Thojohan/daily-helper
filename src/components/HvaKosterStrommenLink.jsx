import styles from "./HvaKosterStrommenLink.module.css";

function HvaKosterStrommenLink() {
  return (
    <p className={styles.sourceLink}>
      <a href="https://www.hvakosterstrommen.no">
        <img
          src="https://ik.imagekit.io/ajdfkwyt/hva-koster-strommen/strompriser-levert-av-hvakosterstrommen_oTtWvqeiB.png"
          alt="Strømpriser levert av Hva koster strømmen.no"
          width="150"
          height="35"
        />
      </a>
    </p>
  );
}

export default HvaKosterStrommenLink;
