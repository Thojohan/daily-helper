import styles from "./Okonomi.module.css";
import PageNav from "../../components/PageNav/PageNav";
import Valuta from "../../components/Okonomi/Valuta/Valuta";
import BNP from "../../components/Okonomi/BNP/BNP";

const time = new Date();
const newTime = `${time.getFullYear()}-${String(time.getMonth() + 1).padStart(
  2,
  "0"
)}-${String(time.getDate()).padStart(2, "0")}`;
const oldTime = `${time.getFullYear() - 5}-${String(
  time.getMonth() + 1
).padStart(2, "0")}-${String(time.getDate()).padStart(2, "0")}`;

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
