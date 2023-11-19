import styles from "./Vaeret.module.css";
import PageNav from "../components/PageNav";
import { useSearchParams } from "react-router-dom";
import HentVaeret from "../components/HentVaeret";

function Vaeret() {
  let [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.pageContainer}>
      <PageNav />
      <HentVaeret lat={lat} lng={lng} />
    </div>
  );
}

export default Vaeret;
