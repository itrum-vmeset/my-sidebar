import React, { useEffect } from "react";
import classNames from "classnames";

import { MyModalMProps } from "./MyModalM.props";

import styles from "./MyModal.module.css";

const MyModalM = ({
  children,
  modalVisible,
  setModalVisible,
  setActiveElement,
}: MyModalMProps): JSX.Element => {
  useEffect(() => {
    const close = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        setModalVisible(false);
        setActiveElement(null);
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
      onClick={() => {
        setModalVisible(false);
        setActiveElement(null);
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

export default MyModalM;
