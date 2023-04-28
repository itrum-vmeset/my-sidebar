import React, { useEffect } from "react";
import classNames from "classnames";

import { DumbModalProps } from "./DumbModal.props";

import styles from "./DumbModal.module.css";

const DumbModal = ({
  children,
  dumbModalVisible,
  setDumbModalVisible,
}: DumbModalProps): JSX.Element => {
  useEffect(() => {
    const close = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        setDumbModalVisible(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <div
      className={classNames(styles.myModal, {
        [styles.active]: dumbModalVisible === true,
      })}
      onClick={() => setDumbModalVisible(false)}
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

export default DumbModal;
