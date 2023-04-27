import classNames from "classnames";

import { SelectProps } from "./Select.props";

import styles from "./Select.module.css";

export const Select = ({
  defaultValue,
  value,
  options,
  className,
  ...props
}: SelectProps): JSX.Element => {
  return (
    <select className={classNames(styles.select, className)} {...props}>
      {defaultValue && (
        <option disabled value="">
          {defaultValue}
        </option>
      )}
      {options.map((option: any, index: any) => (
        <option key={index} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};