import React, { useEffect, useState } from "react";

import { modalData } from "../../../helpers/helpers";
import { IProductMock } from "../../../models/IProductMockData";
import { brandAPI } from "../../../service/BrandService";
import { Button } from "../button/Button";
import { Input } from "../input/Input";
import ImgLinkRow from "../productForm/imgLinkRow/ImgLinkRow";
import { Select } from "../select/Select";
import TagsInput from "../tagsInput/TagsInput";
import { Textarea } from "../textarea/Textarea";
import { Typography } from "../typography/Typography";

import FormCategory from "./category/FormCategory";
import Characteristics from "./characteristics/Characteristics";
import FormImages from "./images/FormImages";

import styles from "./Form.module.css";

function FormCopy({
  editProduct,
  setModalVisible,
  removeProduct,
}: any): JSX.Element {
  const [data, setData] = useState<IProductMock>();
  const { data: brands } = brandAPI.useFetchAllBrandsQuery(null);

  const saveEdit = (): void => {
    editProduct(data);
    setModalVisible(false);
  };
  const onRemove = (): void => {
    removeProduct([data?.id]);
    setModalVisible(false);
  };

  const slovarik = (key: any) => {
    switch (key) {
      case "name":
        return "Название*";
        break;

      case "value2":
        return "Название 1C";
        break;

      case "brand":
        return "Бренд*";
        break;
      case "codeFrom1C":
        return "Артикул";
        break;
      case "description":
        return "Описание*";
        break;
      case "images":
        return null;
        break;
      case "price":
        return "Цена";
        break;
      case "catalog_product":
        return null;
        break;
      case "sub_catalog_product":
        return null;
        break;
      case "variations":
        return null;
        break;
      case "tags":
        return "Тэги товаров";
        break;

      case "characteristics":
        return null;
        break;

      default:
        return null;
        break;
    }
  };

  useEffect(() => {
    setData(modalData as any);
  }, []);

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
        {brands?.data.length &&
          data &&
          Object.entries(data).map(([key, value], index) => (
            <div key={index}>
              <Typography>{slovarik(key)}</Typography>
              {(() => {
                switch (key) {
                  case "nameFrom1C":
                    return <Input value={data.nameFrom1C} disabled />;
                  case "brand":
                    return <Select options={brands.data} value={""} />;
                  case "catalog_product":
                    return <FormCategory data={data} setData={setData} />;
                  case "sub_catalog_product":
                    return null;
                  case "characteristics":
                    return (
                      <Characteristics
                        data={data}
                        setData={setData}
                        characteristics={data.characteristics}
                      />
                    );
                  case "variations":
                    return (
                      <Characteristics
                        data={data}
                        setData={setData}
                        variations={data.variations}
                      />
                    );
                  case "images":
                    return <FormImages data={data} setData={setData} />;
                  case "id":
                    return null;
                  case "description":
                    return (
                      <Textarea
                        value={data.description}
                        onChange={(e) =>
                          setData({ ...data, description: e.target.value })
                        }
                        className={styles.description}
                      />
                    );
                  case "tags":
                    return <TagsInput data={data} setData={setData} />;
                  default:
                    return (
                      <Input
                        value={data[key as keyof IProductMock] as string}
                        onChange={(e) =>
                          setData({
                            ...data,
                            [key as keyof IProductMock]: e.target.value,
                          })
                        }
                      />
                    );
                }
              })()}
            </div>
          ))}
      </div>
    </div>
  );
}

export default FormCopy;
