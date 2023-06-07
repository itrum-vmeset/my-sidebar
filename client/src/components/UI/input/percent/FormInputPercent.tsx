import { useEffect, useRef, useState } from "react";
import classNames from "classnames";

import { FormInputPercentProps } from "./FormInputPercent.props";

import styles from "../Input.module.css";

export const FormInputPercent = ({
  className,
  value,
  onChange,
}: FormInputPercentProps): JSX.Element => {
  const [visibleInput, setVisibleInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [visibleInput]);

  return (
    <div>
      <input
        ref={inputRef}
        value={value}
        type="number"
        onChange={onChange}
        onBlur={() => setVisibleInput(false)}
        className={classNames(styles.input, className, {
          [styles.hiddenInput]: !visibleInput,
        })}
      />
      <input
        value={value + "%"}
        readOnly
        onFocus={() => {
          inputRef?.current?.focus();
          setVisibleInput(true);
        }}
        className={classNames(styles.input, className, {
          [styles.hiddenInput]: visibleInput,
        })}
      />
    </div>
  );
};
