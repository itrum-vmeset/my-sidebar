import classNames from "classnames";

import { FormInputProps } from "./FormInput.props";

import styles from "./Input.module.css";

export const FormInput = ({
  value,
  onChange,
  className,
  disabled,
}: FormInputProps): JSX.Element => {
  const fullName = () => {
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
      value={typeof value === "string" ? value : fullName()}
      onChange={onChange}
      disabled={disabled}
    />
  );
};
