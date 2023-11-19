import styles from "./Home.module.css";
import PageNav from "../components/PageNav";

function Home() {
  return (
    <div className={styles.pageContainer}>
      <PageNav />
      <p>Homepage</p>
    </div>
  );
}

export default Home;
