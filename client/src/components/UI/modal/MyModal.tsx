import React, { useEffect } from "react";
import classNames from "classnames";
import { observer } from "mobx-react-lite";

import { MyModalProps } from "./MyModal.props";

import styles from "./MyModal.module.css";

const MyModal = <T,>({
  children,
  modalVisible,
  setModalVisible,
  setActiveElement,
}: MyModalProps<T>): JSX.Element => {
  useEffect(() => {
    const close = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        setModalVisible(false);
        setActiveElement({} as T);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <div
      data-testid="addForm"
      className={classNames(styles.myModal, {
        [styles.active]: modalVisible === true,
      })}
      onClick={() => {
        setModalVisible(false);
        setActiveElement({} as T);
      }}
    >
      <div
        className={styles.myModalContent}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default observer(MyModal);
