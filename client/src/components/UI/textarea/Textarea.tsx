import classNames from "classnames";

import { TextareaProps } from "./Textarea.props";

import styles from "./Textarea.module.css";

export const Textarea = ({
  className,
  value,
  onChange,
  disabled,
}: TextareaProps): JSX.Element => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      className={classNames(styles.myTextarea, className)}
    />
  );
};
