import styles from "./error.module.css";

function Error({ error }) {
  return (
    <div className={styles.container}>
      <p>❗{error}❗</p>
    </div>
  );
}

export default Error;
