import { FC } from "react";
import classNames from "classnames";

import { TypographyProps } from "./Typography.props";

import styles from "./Typography.module.css";

export const Typography: FC<TypographyProps> = ({
  children,
  className,
  ...props
}): JSX.Element => {
  return (
    <p {...props} className={classNames(styles.typography, className)}>
      {children}
    </p>
  );
};
