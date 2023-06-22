import { useEffect } from "react";
import classNames from "classnames";

import { SelectModalProps } from "./SelectModal.props";

import styles from "./SelectModal.module.css";

const SelectModal = ({
  selectModalVisible,
  setSelectModalVisible,
  options,
  active,
  setData,
}: SelectModalProps): JSX.Element => {
  useEffect(() => {
    const close = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        setSelectModalVisible({});
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <div
      className={classNames(styles.selectModal, {
        [styles.active]: selectModalVisible === true,
      })}
    >
      <div className={styles.selectModalContent}>
        <ul>
          {options?.length
            ? options?.map((el: Record<string, string | number>) => (
                <li
                  key={el.value ? el.value : el.name}
                  value={el.value ? el.value : el.name}
                  className={classNames(styles.button, {
                    [styles.activeLi]: el.value
                      ? el.value === active
                      : el.name === active,
                  })}
                  onClick={() => {
                    setData(el);
                    setSelectModalVisible({});
                  }}
                >
                  {el.name}
                </li>
              ))
            : ""}
        </ul>
      </div>
    </div>
  );
};

export default SelectModal;
