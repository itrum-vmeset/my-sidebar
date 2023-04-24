import React from "react";
import classNames from "classnames";

import { ReactComponent as CloseIcon } from "../../../assets/icons/close.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/icons/del.svg";

import { MyAlertProps } from "./MyAlert.props";

import styles from "./MyAlert.module.css";

const MyAlert = ({
  alertVisible,
  setAlertVisible,
  removeProduct,
  selectedItems,
  setSelectedItems,
}: MyAlertProps): JSX.Element => {
  const deleteItems = (): void => {
    const selectedId = selectedItems.map((item: any) => item.original.id);
    removeProduct(selectedId);
    setSelectedItems([]);
    setAlertVisible(false);
  };

  return (
    <div
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
        <CloseIcon
          className={styles.closeIcon}
          onClick={() => setAlertVisible(false)}
        />
      </div>
    </div>
  );
};

export default MyAlert;
