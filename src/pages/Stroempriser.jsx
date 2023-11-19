import styles from "./Stroempriser.module.css";
import PageNav from "../components/PageNav";
import HentStroemPriser from "../components/HentStroemPriser";
import HvaKosterStrommenLink from "../components/HvaKosterStrommenLink";

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
