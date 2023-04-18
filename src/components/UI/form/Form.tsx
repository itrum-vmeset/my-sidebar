import React, { useState } from "react";
import { selectOptions } from "../../../helpers/helpers";
import { Button } from "../button/Button";
import { Input } from "../input/Input";
import { Select } from "../select/Select";
import { Typography } from "../typography/Typography";
import styles from "./Form.module.css";

function Form(): JSX.Element {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [brand, setBrand] = useState("");

  return (
    <div className={styles.formWrapper}>
      <div className={styles.formBtns}>
        <Button apearance="transparent" arrow="none" className={styles.btn}>
          Удалить
        </Button>
        <Button apearance="filled" arrow="none" className={styles.btn}>
          Сохранить
        </Button>
      </div>
      <div className={styles.formInpts}>
        <Typography>Начисление кешбека с покупки</Typography>
        <Input className={styles.fullWidth} />

        <Typography>Категория</Typography>
        <Select
          defaultValue="Название категории"
          changeVal={(e: { target: HTMLSelectElement }) => setCategory(e.target.value)}
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
          changeVal={(e: { target: HTMLSelectElement }) => setBrand(e.target.value)}
          value={brand}
          options={selectOptions}
        />
      </div>
    </div>
  );
}

export default Form;
