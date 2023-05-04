import { FC } from "react";
import classNames from "classnames";

import { TypographyProps } from "./Typography.props";

import styles from "./Typography.module.css";

export const Typography: FC<TypographyProps> = ({
  children,
  sizer,
  className,
  ...props
}): JSX.Element => {
  return (
    <p
      {...props}
      className={classNames(styles.typography, className, {
        [styles.small]: sizer == "s",
      })}
    >
      {children}
    </p>
  );
};
