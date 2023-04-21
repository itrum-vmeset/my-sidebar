import React, { ChangeEvent, useEffect, useState } from "react";

import { brandAPI } from "../../../service/BrandService";
import { Button } from "../button/Button";
import { Input } from "../input/Input";
import { Select } from "../select/Select";
import { Typography } from "../typography/Typography";

import styles from "./Form.module.css";

function Form({
  editProduct,
  setModalVisible,
  activeElement,
  removeProduct,
}: any): JSX.Element {
  const [newItem, setNewItem] = useState<any>({ id: "" });
  const { data: brands } = brandAPI.useFetchAllBrandsQuery(null);

  const saveEdit = (): void => {
    editProduct(newItem);
    setModalVisible(false);
  };

  useEffect(() => {
    if (activeElement?.length) {
      const itemData = activeElement.reduce((result: any, element: any) => {
        return {
          ...result,
          [element.column.Header]: element.value,
        };
      }, {});
      setNewItem(itemData);
    }
  }, [activeElement]);

  const onRemove = (): void => {
    removeProduct([newItem.id]);
    setModalVisible(false);
  };

  return (
    <div className={styles.formWrapper}>
      <div className={styles.formBtns}>
        <Button
          appearance="transparent"
          arrow="none"
          className={styles.btn}
          onClick={onRemove}
        >
          Удалить
        </Button>
        <Button
          appearance="filled"
          arrow="none"
          className={styles.btn}
          onClick={saveEdit}
        >
          Сохранить
        </Button>
      </div>
      <div className={styles.formInpts}>
        {activeElement?.length &&
          Object.entries(newItem).map(([key, value]: any, index) => (
            <div key={index}>
              <Typography>{key}</Typography>
              {typeof value === "object" ? (
                <Select
                  name={key}
                  defaultValue="Название категории"
                  changeVal={(e: { target: HTMLSelectElement }) =>
                    // setNewItem({ ...newItem, [key]: e.target.value })
                    console.log(e)
                  }
                  value={value}
                  options={brands.data}
                  className={styles.fullWidth}
                />
              ) : (
                <Input
                  className={styles.fullWidth}
                  value={value}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setNewItem({ ...newItem, [key]: e.target.value })
                  }
                />
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Form;
