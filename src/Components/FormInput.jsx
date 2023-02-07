import styles from "../styles/FormInput.module.css";
import { useState } from "react";

const FormInput = ({ input }) => {
  const [focused, setFocused] = useState(false);
  const { errorMessage, label, ...others } = input;

  return (
    <div className={styles.input_group}>
      <label htmlFor="" className={`text_regular`}>
        {label}
      </label>
      <input
        {...others}
        className={`input`}
        onBlur={() => setFocused(true)}
        focused={focused.toString()}
      />
      <span>{errorMessage}</span>
    </div>
  );
};

export default FormInput;