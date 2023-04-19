import React, { useState } from "react";

import { selectOptions } from "../../../helpers/helpers";
import { Button } from "../button/Button";
import { Input } from "../input/Input";
import { Select } from "../select/Select";
import { Typography } from "../typography/Typography";

import styles from "./Form.module.css";

function Form({ addProduct, setModalVisible, headers }: any): JSX.Element {
  // const [cashback, setCashback] = useState("");
  // const [category, setCategory] = useState("");
  // const [subCategory, setSubCategory] = useState("");
  // const [brand, setBrand] = useState("");

  const [newItem, setNewItem] = useState({});

  const addItem = (): void => {
    addProduct(newItem);
    setModalVisible(false);
  };

  // if (headers?.length) {
  //   console.log(headers[0].headers);
  // }

  return (
    <div className={styles.formWrapper}>
      <div className={styles.formBtns}>
        <Button appearance="transparent" arrow="none" className={styles.btn}>
          Удалить
        </Button>
        <Button
          appearance="filled"
          arrow="none"
          className={styles.btn}
          onClick={addItem}
        >
          Сохранить
        </Button>
      </div>
      <div className={styles.formInpts}>
        {/* <Typography>Начисление кешбека с покупки</Typography>
        <Input
          className={styles.fullWidth}
          value={cashback}
          onChange={(e) => setObje({ ...obje, cashback: e.target.value })}
        /> */}

        {headers?.length &&
          headers.map((header: any, index: any) => (
            <div key={index}>
              <Typography>{header.Header}</Typography>
              <Select
                name={header.Header}
                defaultValue="Название категории"
                changeVal={(e: { target: HTMLSelectElement }) =>
                  setNewItem({ ...newItem, header: e.target.value })
                }
                value={null || ""}
                options={selectOptions}
                className={styles.fullWidth}
              />
            </div>
          ))}

        {/* <Typography>Категория</Typography>
        <Select
          defaultValue="Название категории"
          changeVal={(e: { target: HTMLSelectElement }) =>
            setCategory(e.target.value)
          }
          value={category}
          options={selectOptions}
          className={styles.fullWidth}
        />

        <Typography>Подкатегория</Typography>
        <Select
          defaultValue="Название подкатегории"
          changeVal={(e: { target: HTMLSelectElement }) =>
            setSubCategory(e.target.value)
          }
          value={subCategory}
          options={selectOptions}
        />

        <Typography>Бренд</Typography>
        <Select
          defaultValue="Имя бренда"
          changeVal={(e: { target: HTMLSelectElement }) =>
            setBrand(e.target.value)
          }
          value={brand}
          options={selectOptions}
        /> */}
      </div>
    </div>
  );
}

export default Form;
