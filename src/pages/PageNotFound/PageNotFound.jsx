import styles from "./PageNotFound.module.css";
import PageNav from "../../components/PageNav/PageNav";

function PageNotFound() {
  return (
    <div className={styles.pageContainer}>
      <PageNav />
      <div className={styles.errorMessage}>
        <h1>This page doesn't exist. Please navigate to an existing page.</h1>
      </div>
    </div>
  );
}

export default PageNotFound;
