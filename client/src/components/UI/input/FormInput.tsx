import classNames from "classnames";

import { FormInputProps } from "./FormInput.props";

import styles from "./Input.module.css";

export const FormInput = ({
  className,
  ...props
}: FormInputProps): JSX.Element => {
  return <input className={classNames(styles.input, className)} {...props} />;
};
