import { useEffect, useState } from "react";

import { IProductMock } from "../../../../models/IProductMockData";
import { IPromocode } from "../../../../models/IResponse";
import { categoryAPI } from "../../../../service/CategoryService";
import { subCategoryAPI } from "../../../../service/SubCategoryService";
import { Typography } from "../../typography/Typography";
import CategoriesSelect from "../customSelect/CategoriesSelect";

import { FormCategoriesProps } from "./FormCategories.props";

import styles from "./FormCategories.module.css";

function FormCategories({
  getall,
  value,
  changeValue,
  categoryModalVisible,
  setCategoryModalVisible,
  subCategoryModalVisible,
  setSubCategoryModalVisible,
  setCustomModalVisible,
  customModalVisible,
  setValue,
  name,
}: FormCategoriesProps): JSX.Element {
  const [subCategoryValue, setSubCategoryValue] = useState("");
  const { data: catalog_products } =
    categoryAPI.useFetchAllCategoriesQuery(null);
  const { data: subCategories } = subCategoryAPI.useFetchAllSubCategoriesQuery(
    (value?.id) || ""
  );

  useEffect(() => {
    if (value?.name) {
      setSubCategoryValue(
      getall?.sub_catalog_product?.name
      );
    } else {
      setSubCategoryValue("Выберите подкатегорию");
    }
  }, [value]);

  return (
    <div className={styles.categorySection}>
      <div className={styles.categoryBlock}>
        <Typography>Категория*</Typography>
        {catalog_products?.data.length && (
          <CategoriesSelect
            options={catalog_products?.data}
            setData={(e) => {
              const selectedCategory = catalog_products.data.find(
                (category) => category.name === e.name
              );
              selectedCategory && changeValue(selectedCategory);
              setSubCategoryValue("Выберите подкатегорию");
              setValue("sub_catalog_product", "", {
                shouldValidate: true,
              });
            }}
            data={value?.name ? value?.name : "Выберите категорию"}
            selectModalVisible={categoryModalVisible}
            setSelectModalVisible={() => {
              setCategoryModalVisible(!categoryModalVisible);
              setSubCategoryModalVisible(false);
              setCustomModalVisible({ [name]: !customModalVisible[name] });
            }}
          />
        )}
      </div>
      <div className={styles.categoryBlock}>
        <Typography>Подкатегория*</Typography>
        <CategoriesSelect
          options={value?.id && subCategories?.data ? subCategories?.data : []}
          setData={(e) => {
            const selectedSubCategory = subCategories?.data.find(
              (subCategory) => subCategory.name === e.name
            );
            setValue("sub_catalog_product", selectedSubCategory, {
              shouldValidate: true,
            });
            selectedSubCategory &&
              setSubCategoryValue(selectedSubCategory?.name);
          }}
          data={subCategoryValue}
          selectModalVisible={subCategoryModalVisible}
          setSelectModalVisible={() => {
            setSubCategoryModalVisible(!subCategoryModalVisible);
            setCategoryModalVisible(false);
            setCustomModalVisible({ [name]: !customModalVisible[name] });
          }}
        />
      </div>
    </div>
  );
}

export default FormCategories;
