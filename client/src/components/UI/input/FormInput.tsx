import classNames from "classnames";

import { FormInputProps } from "./FormInput.props";

import styles from "./Input.module.css";

export const FormInput = ({
  value,
  onChange,
  className,
  disabled,
  type,
}: FormInputProps): JSX.Element => {
  const fullName = (): string => {
    let user = "";
    if (value.name) {
      user = user.concat(value.name);
    }
    if (value.lastName) {
      user = user.concat(" ", value.lastName);
    }
    if (value.secondName) {
      user = user.concat(" ", value.secondName);
    }
    if (value.firmName) {
      user = user.concat(" ", value.firmName);
    }
    return user;
  };
  return (
    <input
      className={classNames(styles.input, className)}
      value={typeof value === "object" ? fullName() : value ? value : ""}
      onChange={onChange}
      disabled={disabled}
      type={type ? type : "text"}
    />
  );
};
