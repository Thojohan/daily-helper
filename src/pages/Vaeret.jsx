import styles from "./Vaeret.module.css";
import PageNav from "../components/PageNav";
import HentVaeret from "../components/HentVaeret";
import { useSearchParams } from "react-router-dom";

function Vaeret() {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const location = searchParams.get("loc");

  console.log(lat, lng);
  return (
    <div className={styles.pageContainer}>
      <PageNav />
      <HentVaeret lat={lat} lng={lng} location={location} />
    </div>
  );
}

export default Vaeret;
