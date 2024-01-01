import { useState } from "react";
import styles from "./HelpModal.module.css";
import InsertHelpText from "../components/Help/InsertHelpText";

function HelpModal({ defaultText, dispatch }) {
  const [selected, setSelected] = useState(defaultText);
  function closeModal(e) {
    if (!e.target.className.includes("modalContainer")) return;
    dispatch({ type: "switchModal", payLoad: defaultText });
  }
  const text = defaultText;

  return (
    <div className={styles.modalContainer} onClick={closeModal}>
      <div className={styles.textContainer}>
        <select
          className={styles.modalSelect}
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="/">Forside</option>
          <option value="/matpriser">Matpriser</option>
          <option value="/stroempriser">Strømpriser</option>
          <option value="/vaeret">Været</option>
          <option value="/okonomi">Økonomi</option>
          <option value="/flytider">Flytider</option>
        </select>
        <InsertHelpText selected={selected} />
      </div>
    </div>
  );
}

export default HelpModal;
