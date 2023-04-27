import React, { useEffect } from "react";
import classNames from "classnames";

import { MyModalProps } from "./MyModal.props";

import styles from "./MyModal.module.css";

const MyModal = ({
  children,
  modalVisible,
  setModalVisible,
}: MyModalProps): JSX.Element => {
  useEffect(() => {
    const close = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        setModalVisible(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <div
      className={classNames(styles.myModal, {
        [styles.active]: modalVisible === true,
      })}
      onClick={() => setModalVisible(false)}
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

export default MyModal;