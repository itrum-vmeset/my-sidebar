import classNames from "classnames";

import { SelectProps } from "./Select.props";

import styles from "./Select.module.css";

export const Select = ({
  changeVal,
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
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => changeVal(e)}
      {...props}
    >
      {defaultValue && (
        <option disabled value="">
          {defaultValue}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};
