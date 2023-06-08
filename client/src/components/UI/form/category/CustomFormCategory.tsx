import { useEffect, useState } from "react";

import { categoryAPI } from "../../../../service/CategoryService";
import { subCategoryAPI } from "../../../../service/SubCategoryService";
import { Typography } from "../../typography/Typography";
import CustomSelect from "../customSelect/CustomSelect";

import { CustomFormCategoryProps } from "./CustomFormCategory.props";

import styles from "./FormCategory.module.css";

function CustomFormCategory({
  getall,
  value,
  onChange,
  categoryModalVisible,
  setCategoryModalVisible,
  subCategoryModalVisible,
  setSubCategoryModalVisible,
  setCustomModalVisible,
  customModalVisible,
  setValue,
  name,
}: CustomFormCategoryProps): JSX.Element {
  const [subCategoryValue, setSubCategoryValue] = useState("");
  const { data: catalog_products } =
    categoryAPI.useFetchAllCategoriesQuery(null);
  const { data: subCategories } = subCategoryAPI.useFetchAllSubCategoriesQuery(
    (value?.id as any) || ""
  );

  useEffect(() => {
    if (value?.name) {
      setSubCategoryValue(getall?.sub_catalog_product?.name);
    } else {
      setSubCategoryValue("Выберите подкатегорию");
    }
  }, [value]);

  return (
    <div className={styles.categorySection}>
      <div className={styles.categoryBlock}>
        <Typography>Категория*</Typography>
        {catalog_products?.data.length && (
          <CustomSelect
            options={catalog_products?.data}
            setData={(e) => {
              const selectedCategory = catalog_products.data.find(
                (category) => category.name === e.name
              );
              onChange(selectedCategory);
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
        <CustomSelect
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

export default CustomFormCategory;
