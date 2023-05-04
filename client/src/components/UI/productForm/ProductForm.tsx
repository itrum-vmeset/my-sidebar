import { useState } from "react";

import { ReactComponent as AttachIcon } from "../../../assets/icons/attach.svg";
import { modalData } from "../../../helpers/helpers";
import { IProductMock } from "../../../models/IProductMockData";
import { brandAPI } from "../../../service/BrandService";
import { categoryAPI } from "../../../service/CategoryService";
import { Button } from "../button/Button";
import { Input } from "../input/Input";
import { Select } from "../select/Select";
import TagsInput from "../tagsInput/TagsInput";
import { Typography } from "../typography/Typography";

import FormRow from "./formRow/FormRow";
import ImgLinkRow from "./imgLinkRow/ImgLinkRow";

import styles from "./ProductForm.module.css";

function ProductForm(): JSX.Element {
  const [data, setData] = useState<IProductMock>({
    id: "",
    name: "",
    description: "",
    image: "",
    nameFrom1C: "",
    codeFrom1C: "",
    price: 0,
    estimation: 0,
    purpose: "",
    volume: "",
    isReady: false,
    isRetailAllowed: false,
    product_in_warehouse_info: [],
    brand: {
      id: "",
      name: "",
      icon: "",
    },
    sub_catalog_product: {
      id: "",
      name: "",
      position: 0,
      catalog_product: "",
    },
    catalog_product: {
      id: "",
      name: "",
      position: 0,
      _id: "",
    },
    characteristics: [{ key: "", value: "", id: Date.now() }],
    tags: [
      { id: 0, name: "NodeJS" },
      { id: 2, name: "MongoDB" },
    ],
    productRatings: [],
    estimationCount: 0,
    images: [],
    variations: [{ value: "", code: "", id: Date.now() }],
    similars: [],
    protocols: [],
    protocol_categories: [],
    discount: 0,
  });
  const { data: brands } = brandAPI.useFetchAllBrandsQuery(null);
  const { data: catalog_products } =
    categoryAPI.useFetchAllCategoriesQuery(null);
  const { data: subCategories } = categoryAPI.useFetchAllSubCategoriesQuery(
    data.catalog_product._id as any
  );

  const [newLink, setNewLink] = useState("");

  const addLink = (): void => {
    if (newLink !== "") {
      setData({ ...data, images: [...data.images, newLink] });
      setNewLink("");
    }
  };
  const removeLink = (link: string): void => {
    setData({ ...data, images: data.images.filter((el) => el !== link) });
  };

  const addVolume = (): void => {
    setData({
      ...data,
      variations: [...data.variations, { value: "", code: "", id: Date.now() }],
    });
  };
  const removeVolume = (id: number): void => {
    setData({
      ...data,
      variations: data.variations.filter((el) => el.id !== id),
    });
  };
  const changeVolume = (key: string, value: string, id: number): void => {
    setData({
      ...data,
      variations: data.variations.map((i) =>
        i.id === id ? { ...i, [key]: value } : i
      ),
    });
  };

  const addCharacteristics = (): void => {
    if (data.characteristics.length < 16) {
      setData({
        ...data,
        characteristics: [
          ...data.characteristics,
          { key: "", value: "", id: Date.now() },
        ],
      });
    } else {
      alert("Максимум 15 харакеристик");
    }
  };
  const removeCharacteristics = (id: number): void => {
    setData({
      ...data,
      characteristics: data.characteristics.filter((el) => el.id !== id),
    });
  };
  const changeCharacteristics = (
    key: string,
    value: string,
    id: number
  ): void => {
    setData({
      ...data,
      characteristics: data.characteristics.map((i) =>
        i.id === id ? { ...i, [key]: value } : i
      ),
    });
  };

  const removeTag = (id: string | number): void => {
    setData({ ...data, tags: data.tags.filter((tag) => tag.id !== id) });
    // setTags([...tags.filter((tag) => tag.id !== id)]);
  };
  const addTag = (tag: string): void => {
    if (data.tags.length > 120) {
      alert("Максимум 120 тегов");
    }
    if (tag !== "" && data.tags.length < 121) {
      // setTags([...tags, event.target.value]);
      setData({ ...data, tags: [...data.tags, { id: Date.now(), name: tag }] });
    }
  };

  return (
    <div className={styles.formWrapper}>
      <div className={styles.formBtns}>
        <Button
          appearance="transparent"
          arrow="none"
          className={styles.btn}
          // onClick={onRemove}
        >
          Удалить
        </Button>
        <Button
          appearance="filled"
          arrow="none"
          className={styles.btn}
          onClick={() => console.log(data)}
        >
          Сохранить
        </Button>
      </div>
      <div className={styles.formInpts}>
        <button onClick={() => console.log(data)}>boom</button>
        <Typography>Название 1С</Typography>
        <Input disabled value={data.nameFrom1C} />
        <Typography>Название*</Typography>
        <Input
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <Typography>Бренд*</Typography>
        {brands?.data.length && (
          <Select
            options={brands?.data}
            value={data.brand.name}
            onChange={(e) => {
              const selectedBrand = brands.data.find(
                (brand) => brand.name === e.target.value
              );
              setData({ ...data, brand: selectedBrand! });
            }}
            defaultValue={"Выберите бренд"}
          />
        )}
        <Typography>Артикул</Typography>
        <Input
          value={data.codeFrom1C}
          onChange={(e) => setData({ ...data, codeFrom1C: e.target.value })}
        />
        <Typography>Описание*</Typography>
        <textarea
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          className={styles.description}
        />
        <div className="images">
          <Typography>Изображения*</Typography>
          {data.images.length ? (
            data.images.map((item, index) => {
              return (
                <ImgLinkRow key={index} link={item} removeLink={removeLink} />
              );
            })
          ) : (
            <></>
          )}
          <Input
            placeholder="Вставте ссылку на Google Drive"
            className="inputFile"
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
            onKeyUp={(event) => (event.key === "Enter" ? addLink() : null)}
          />
          <AttachIcon className={styles.inputFile} onClick={addLink} />
          <Typography sizer="s" style={{ marginTop: "-20px" }}>
            Максимум 5 изображений
          </Typography>
          <Typography sizer="s">
            Размер фото 1000x1000 px PNG, JPG, JPEG
          </Typography>
        </div>

        <div className={styles.priceBlock}>
          <Typography>Цена*</Typography>
          <Input disabled value={data.price} />
        </div>
        <div className={styles.categorySection}>
          <div className={styles.categoryBlock}>
            <Typography>Категория*</Typography>
            {catalog_products?.data.length && (
              <Select
                options={catalog_products?.data}
                value={data.catalog_product.name}
                onChange={(e) => {
                  const selectedCategory = catalog_products.data.find(
                    (category) => category.name === e.target.value
                  );
                  setData({ ...data, catalog_product: selectedCategory! });
                }}
              />
            )}
          </div>
          <div className={styles.categoryBlock}>
            <Typography>Подкатегория*</Typography>
            <Select
              disabled={data.catalog_product._id === ""}
              options={data.catalog_product._id ? subCategories?.data : []}
              value={data.sub_catalog_product.name}
              onChange={(e) => {
                const selectedSubCategory = subCategories?.data.find(
                  (subCategory) => subCategory.name === e.target.value
                );
                setData({
                  ...data,
                  sub_catalog_product: selectedSubCategory! as any,
                });
              }}
            />
          </div>
        </div>
        <div className={styles.volumeSection}>
          <Typography>Объем*</Typography>
          {data.variations.map((item) => {
            return (
              // <FormRow
              //   key={item.id}
              //   item={item}
              //   changeRow={changeVolume}
              //   removeRow={removeVolume}
              // />
              <></>
            );
          })}
          <Button className={styles.formButton} onClick={addVolume}>
            + Добавить объем
          </Button>
        </div>
        <Typography>Характеристики</Typography>
        <div>
          {data.characteristics.map((item) => {
            return (
              // <FormRow
              //   key={item.id}
              //   item={item}
              //   changeRow={changeCharacteristics}
              //   removeRow={removeCharacteristics}
              // />
              <></>
            );
          })}
          <Typography sizer="s">Максимум 15 харакеристик</Typography>
          <Button className={styles.formButton} onClick={addCharacteristics}>
            Добавить характеристику
          </Button>
        </div>
        {/* <div>
          <Typography>Тэги товаров</Typography>
          <TagsInput tags={data.tags} addTag={addTag} removeTag={removeTag} />
          <Typography sizer="s">Максимум 120 тэгов</Typography>
        </div> */}
      </div>
    </div>
  );
}

export default ProductForm;
