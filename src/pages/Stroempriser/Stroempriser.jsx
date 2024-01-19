import styles from "./Stroempriser.module.css";
import PageNav from "../../components/PageNav/PageNav";
import HentStroemPriser from "../../components/Strømpriser/HentStroemPriser/HentStroemPriser";
import HvaKosterStrommenLink from "../../components/Strømpriser/HvaKosterStrommenLink/HvaKosterStrommenLink";

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
