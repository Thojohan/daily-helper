import styles from "./Okonomi.module.css";
import PageNav from "../components/PageNav";
import Valuta from "../components/Okonomi/Valuta";
import BNP from "../components/Okonomi/BNP";

const time = new Date();
const newTime = `${time.getFullYear()}-${
  time.getMonth() + 1
}-${time.getDate()}`;
const oldTime = `${time.getFullYear() - 5}-${
  time.getMonth() + 1
}-${time.getDate()}`;

function Okonomi() {
  return (
    <div className={styles.pageContainer}>
      <PageNav />
      <Valuta newTime={newTime} oldTime={oldTime} />
      <BNP />
    </div>
  );
}

export default Okonomi;
