import styles from "./Stroempriser.module.css";
import PageNav from "../components/PageNav";
import HentStroemPriser from "../components/Strømpriser/HentStroemPriser";
import HvaKosterStrommenLink from "../components/Strømpriser/HvaKosterStrommenLink";

function Stroempriser() {
  return (
    <div className={styles.pageContainer}>
      <PageNav />
      <HentStroemPriser />
      <HvaKosterStrommenLink />
    </div>
  );
}

export default Stroempriser;
