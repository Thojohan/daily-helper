import styles from "./Vaeret.module.css";
import PageNav from "../../components/PageNav/PageNav";
import HentVaeret from "../../components/Været/HentVaeret/HentVaeret";
import { useSearchParams } from "react-router-dom";

function Vaeret() {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const location = searchParams.get("loc");

  return (
    <div className={styles.pageContainer}>
      <PageNav />
      <HentVaeret lat={lat} lng={lng} location={location} />
    </div>
  );
}

export default Vaeret;
