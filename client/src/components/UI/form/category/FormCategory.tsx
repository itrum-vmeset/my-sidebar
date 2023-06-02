import React from "react";

import { SubCatalogProduct } from "../../../../models/IProductMockData";
import { categoryAPI } from "../../../../service/CategoryService";
import { subCategoryAPI } from "../../../../service/SubCategoryService";
import { Typography } from "../../typography/Typography";
import CustomSelect from "../customSelect/CustomSelect";

import { FormCategoryProps } from "./FormCategory.props";

import styles from "./FormCategory.module.css";

function FormCategory({
  data,
  setData,
  categoryModalVisible,
  setCategoryModalVisible,
  subCategoryModalVisible,
  setSubCategoryModalVisible,
}: FormCategoryProps): JSX.Element {
  const { data: catalog_products } =
    categoryAPI.useFetchAllCategoriesQuery(null);
  const { data: subCategories } = subCategoryAPI.useFetchAllSubCategoriesQuery(
    (data?.catalog_product?.id as any) || ""
  );

  

  return (
    <div className={styles.categorySection}>
      <div className={styles.categoryBlock}>
        <Typography>Категория*</Typography>
        {catalog_products?.data.length && (
          <CustomSelect
            options={catalog_products?.data}
            setData={(e) => {
              const selectedCategory = catalog_products.data.find(
                (category) => category.name === e.target.value
              );
              setData({
                ...data,
                catalog_product: selectedCategory!,
              });
            }}
            data={data.catalog_product.name}
            selectModalVisible={categoryModalVisible}
            setSelectModalVisible={() =>
              setCategoryModalVisible(!categoryModalVisible)
            }
          />
        )}
      </div>
      <div className={styles.categoryBlock}>
        <Typography>Подкатегория*</Typography>
        <CustomSelect
          // disabled={!data.catalog_product.id}
          options={
            data.catalog_product.id && subCategories?.data
              ? subCategories?.data
              : []
          }
          setData={(e) => {
            const selectedSubCategory = subCategories?.data.find(
              (subCategory) => subCategory.name === e.target.value
            );
            setData({
              ...data,
              sub_catalog_product: selectedSubCategory! as SubCatalogProduct,
            });
          }}
          data={data.sub_catalog_product.name}
          selectModalVisible={subCategoryModalVisible}
          setSelectModalVisible={() =>
            setSubCategoryModalVisible(!subCategoryModalVisible)
          }
        />
        {/* <Select
          disabled={!data.catalog_product.id}
          options={
            data.catalog_product.id && subCategories?.data
              ? subCategories?.data
              : []
          }
          value={data.sub_catalog_product.name}
          onChange={(e) => {
            const selectedSubCategory = subCategories?.data.find(
              (subCategory) => subCategory.name === e.target.value
            );
            setData({
              ...data,
              sub_catalog_product: selectedSubCategory! as SubCatalogProduct,
            });
          }}
        /> */}
      </div>
    </div>
  );
}

export default FormCategory;
