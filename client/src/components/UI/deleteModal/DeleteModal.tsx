import { useEffect } from "react";
import classNames from "classnames";

import { Button } from "../button/Button";
import { Typography } from "../typography/Typography";

import { BrandModalProps } from "./DeleteModal.props";

import styles from "./DeleteModal.module.css";

const DeleteModal = ({
  modalVisible,
  setModalVisible,
  deleteItem,
  activeElement,
  text,
}: BrandModalProps): JSX.Element => {
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
      className={classNames(styles.deleteModal, {
        [styles.active]: modalVisible === true,
      })}
      onClick={() => {
        setModalVisible(false);
      }}
    >
      <div
        className={styles.deleteModalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <Typography className={styles.modalTitle}>
          Вы действительно хотите удалить {text}
        </Typography>
        <Typography className={styles.modalItem}>
          {activeElement?.name}
          {/* {pathname === SEMINARS_ROUTE
            ? activeElement?.name
            : activeElement?.name} */}
        </Typography>
        <Button
          appearance="filled"
          onClick={() => {
            setModalVisible(false);
            deleteItem(activeElement);
          }}
        >
          Удалить
        </Button>
        <Button
          appearance="transparent"
          style={{ border: "none" }}
          onClick={() => setModalVisible(false)}
        >
          Отменить удаление
        </Button>
      </div>
    </div>
  );
};

export default DeleteModal;
