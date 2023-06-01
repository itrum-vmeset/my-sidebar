import { useLocation } from "react-router-dom";

import {
  BANNERS_ROUTE,
  ORDERS_ROUTE,
  PRODUCTS_ROUTE,
  PROMOCODE_ROUTE,
  PROTOCOLS_ROUTE,
  SEMINARS_ROUTE,
} from "../../../../helpers/consts";
import { Button } from "../../button/Button";

import { ControlsProps } from "./Controls.props";

import styles from "./Controls.module.css";

function Controls({
  saveEdit,
  setModalVisible,
  deleteItem,
}: ControlsProps): JSX.Element {
  const { pathname } = useLocation();

  return (
    <div className={styles.formBtns}>
      {(() => {
        switch (pathname) {
          case PRODUCTS_ROUTE:
            return (
              <>
                <Button
                  appearance="transparent"
                  arrow="none"
                  className={styles.btn}
                  onClick={saveEdit}
                >
                  Сохранить
                </Button>
                <Button
                  appearance="filled"
                  arrow="none"
                  className={styles.btn}
                  onClick={() => {
                    saveEdit();
                    setModalVisible(false);
                  }}
                >
                  Сохранить и закрыть
                </Button>
              </>
            );
          case ORDERS_ROUTE:
            return (
              <>
                <Button
                  appearance="transparent"
                  arrow="none"
                  className={styles.btn}
                  onClick={() => {
                    setModalVisible(false);
                  }}
                >
                  Закрыть
                </Button>
                <Button
                  appearance="filled"
                  arrow="none"
                  className={styles.btn}
                  onClick={() => {
                    saveEdit();
                    setModalVisible(false);
                  }}
                >
                  Подтвердить
                </Button>
              </>
            );
          case PROTOCOLS_ROUTE:
            return (
              <>
                <Button
                  appearance="filled"
                  arrow="none"
                  className={styles.fullWidthBtn}
                  onClick={() => {
                    saveEdit();
                    setModalVisible(false);
                  }}
                >
                  Сохранить
                </Button>
              </>
            );
          case BANNERS_ROUTE:
          case SEMINARS_ROUTE:
          case PROMOCODE_ROUTE:
            return (
              <>
                <Button
                  appearance="transparent"
                  arrow="none"
                  className={styles.btn}
                  onClick={() => {
                    deleteItem && deleteItem();
                    setModalVisible(false);
                  }}
                >
                  Удалить
                </Button>
                <Button
                  appearance="filled"
                  arrow="none"
                  className={styles.btn}
                  onClick={() => {
                    saveEdit();
                    // setModalVisible(false);
                  }}
                >
                  Сохранить
                </Button>
              </>
            );
          default:
            return null;
        }
      })()}
    </div>
  );
}

export default Controls;
