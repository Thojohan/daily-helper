import styles from "./Nummersoek.module.css";

import PageNav from "../components/PageNav";

function Nummersoek() {
  return (
    <div className={styles.pageContainer}>
      <PageNav />
      <p>Nummersøk</p>
    </div>
  );
}

export default Nummersoek;
