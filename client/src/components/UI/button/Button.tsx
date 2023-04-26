import classNames from "classnames";

import { ButtonProps } from "./Button.props";

import styles from "./Button.module.css";

export const Button = ({
  appearance,
  children,
  arrow,
  className,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={classNames(styles.button, className, {
        [styles.filled]: appearance === "filled",
        [styles.transparent]: appearance === "transparent",
        [styles.grey]: appearance === "grey",
        [styles.left]: arrow === "left",
      })}
      {...props}
    >
      {children}
    </button>
  );
};
