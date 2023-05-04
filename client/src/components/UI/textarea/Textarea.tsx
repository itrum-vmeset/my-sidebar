import classNames from "classnames";

import { TextareaProps } from "./Textarea.props";

import styles from "./Textarea.module.css";

export const Textarea = ({
  className,
  ...props
}: TextareaProps): JSX.Element => {
  return (
    <textarea className={classNames(styles.myTextarea, className)} {...props} />
  );
};
