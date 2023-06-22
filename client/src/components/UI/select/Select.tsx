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
    <select
      className={classNames(styles.select, className)}
      value={value}
      {...props}
    >
      {defaultValue && (
        <option disabled value="" key={defaultValue}>
          {defaultValue}
        </option>
      )}
      {options.map((option: Record<string, string>, index: number) => (
        <option key={index} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};
