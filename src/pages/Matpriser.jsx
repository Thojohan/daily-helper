import styles from "./Matpriser.module.css";

import GetPrices from "../components/GetPrices";
import PageNav from "../components/PageNav";

function Matpriser() {
  return (
    <div className={styles.pageContainer}>
      <PageNav />
      <GetPrices />
      <p>Matpriser</p>
    </div>
  );
}

export default Matpriser;
