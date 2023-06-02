import classNames from "classnames";

import { FormInputProps } from "./FormInput.props";

import styles from "./Input.module.css";

export const FormInput = ({
  value,
  onChange,
  className,
}: FormInputProps): JSX.Element => {
  return (
    <input
      className={classNames(styles.input, className)}
      value={value}
      onChange={onChange}
    />
  );
};
