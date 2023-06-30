import React from "react";
import classNames from "classnames";

import { ReactComponent as CloseIcon } from "../../../assets/icons/close.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/icons/del.svg";

import { MyAlertProps } from "./MyAlert.props";

import styles from "./MyAlert.module.css";

const MyAlert = ({
  alertVisible,
  setAlertVisible,
  deleteItems,
  selectedItems,
}: MyAlertProps): JSX.Element => {
  return (
    <div
      data-testid="checkBoxAlert"
      className={classNames(styles.myAlert, {
        [styles.active]: alertVisible === true,
      })}
    >
      <div className={styles.myAlertContent}>
        <div>
          Количество выбранных позиций:{" "}
          {selectedItems.length && selectedItems.length}
        </div>
        <div onClick={deleteItems} style={{ cursor: "pointer" }}>
          <DeleteIcon style={{ marginRight: "10px" }} />
          Удалить
        </div>
        <div className={styles.closeIconWrapper}>
          <CloseIcon
            className={styles.closeIcon}
            onClick={() => setAlertVisible(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default MyAlert;
