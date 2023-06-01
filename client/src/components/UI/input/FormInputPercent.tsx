import { useEffect, useState } from "react";
import classNames from "classnames";

import { FormInputProps } from "./FormInput.props";

import styles from "./Input.module.css";

// export const percentage = (percent: any): string =>
//   percent
//     .toString()
//     .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
//     .concat(" %");

export const FormInputPercent = ({
  className,
  name,
  value,
  onChange,
  ...props
}: FormInputProps): JSX.Element => {
  const [state, setState] = useState<any>();

  // useEffect(() => {
  //   setState(value + "%");
  // }, [value]);

  return (
    // <input
    //   className={classNames(styles.input, className)}
    //   value={name === "percent" ? percentage(value) : value}
    //   onChange={onChange}
    //   {...props}
    // />
    <input
      value={state}
      className={classNames(styles.input, className)}
      onFocus={(e) => setState(e.target.value.replace("%", ""))}
      onBlur={(e) => setState(e.target.value + "%")}
      onChange={(e) => {
        setState(e.target.value);
        onChange && onChange(state);
      }}
      // onChange={onChange}
    />
  );
};
