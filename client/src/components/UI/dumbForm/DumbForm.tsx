import React, { ChangeEvent, useEffect, useState } from "react";

import { modalData } from "../../../helpers/helpers";
import { IProduct } from "../../../models/IProduct";
import { brandAPI } from "../../../service/BrandService";
import { Button } from "../button/Button";
import { Input } from "../input/Input";
import { Select } from "../select/Select";
import { Typography } from "../typography/Typography";

import styles from "./DumbForm.module.css";

function DumbForm({
  editProduct,
  setDumbModalVisible,
  activeElement,
  removeProduct,
}: any): JSX.Element {
  const [newItem, setNewItem] = useState<any>({ id: "" });
  const [data, setData] = useState<IProduct>(modalData);
  const { data: brands } = brandAPI.useFetchAllBrandsQuery(null);

  const saveEdit = (): void => {
    editProduct(newItem);
    setDumbModalVisible(false);
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
    setDumbModalVisible(false);
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
        <Typography>Название 1С</Typography>
        <Input disabled value={data.nameFrom1C} />
        <Typography>Название*</Typography>
        <Input value={data.name} />
        <Typography>Бренд*</Typography>
        <Input value={data.brand.name} />
        <Typography>Артикул</Typography>
        <Input value={data.codeFrom1C} />
        <Typography>Описание*</Typography>
        <Input value={data.description} />
        <Typography>Изображения*</Typography>
        <Input placeholder="Вставте ссылку на Google Drive" />
        <Input />
        <Typography>Максимум 5 изображений</Typography>
        <Typography>Размер фото 1000x1000 px PNG, JPG, JPEG</Typography>

        <Typography>Цена*</Typography>
        <Input disabled value={data.price} />
        <div>
          {/* <Select options={data.catalog_product}>Категория*</Select> */}
          <Select options={[]} value="">
            Категория*
          </Select>
          <Input disabled />
          {/* <Select options={data.sub_catalog_product}>Подкатегория**</Select> */}
          <Select options={[]} value="">
            Подкатегория**
          </Select>
          <Input disabled />
        </div>
        <Typography>Объем*</Typography>
        <div>
          <Input />
          <Input />
          <Button>Добавить объем</Button>
        </div>
        <Typography>Характеристики</Typography>
        <div>
          <Input />
          <Input />
          <Typography>Максимум 15 харакеристик</Typography>
          <Button>Добавить характеристику</Button>
        </div>
      </div>
    </div>
  );
}

export default DumbForm;
