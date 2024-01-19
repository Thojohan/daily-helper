import styles from "./ErrorMessage.module.css";

function ErrorMessage({ error }) {
  return (
    <div className={styles.container}>
      <p>❗Feil: {error.message}❗</p>
    </div>
  );
}

export default ErrorMessage;
