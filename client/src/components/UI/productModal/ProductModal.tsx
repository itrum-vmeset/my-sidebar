import React, { useEffect } from "react";
import classNames from "classnames";

import { ProductModalProps } from "./ProductModal.props";

import styles from "./ProductModal.module.css";

const ProductModal = ({
  children,
  productModalVisible,
  setProductModalVisible,
}: ProductModalProps): JSX.Element => {
  useEffect(() => {
    const close = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        setProductModalVisible(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <div
      className={classNames(styles.myModal, {
        [styles.active]: productModalVisible === true,
      })}
      onClick={() => setProductModalVisible(false)}
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

export default ProductModal;
