import React from "react";
import classNames from "classnames";

import { ReactComponent as CloseIcon } from "./close.svg";
import { MyAlertProps } from "./MyAlert.props";

import styles from "./MyAlert.module.css";

const MyAlert = ({
  children,
  alertVisible,
  setAlertVisible,
}: MyAlertProps): JSX.Element => {
  return (
    <div
      className={classNames(styles.myAlert, {
        [styles.active]: alertVisible === true,
      })}
    >
      <div className={styles.myAlertContent}>
        {children}
        <CloseIcon
          className={styles.closeIcon}
          onClick={() => setAlertVisible(false)}
        />
      </div>
    </div>
  );
};

export default MyAlert;
