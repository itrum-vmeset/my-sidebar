import { useState } from "react";
import { useLocation } from "react-router-dom";

import { ReactComponent as ArrowsIcon } from "../../assets/icons/Arrows.svg";
import { withLayout } from "../../components/layout/Layout";
import { NoRows } from "../../components/table/noRows/NoRows";
import { Button } from "../../components/UI/button/Button";
import DeleteModal from "../../components/UI/deleteModal/DeleteModal";
import { Input } from "../../components/UI/input/Input";
import { List } from "../../components/UI/list/List";
import { categoryAPI } from "../../service/CategoryService";
import { subCategoryAPI } from "../../service/SubCategoryService";

import styles from "./Categories.module.css";

function Categories(): JSX.Element {
  const { pathname } = useLocation();
  const [category, setCategory] = useState({ id: "" });
  const [activeElement, setActiveElement] = useState({ catalog_product: "" });
  const [selected, setSelected] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newSubCategoryName, setNewSubCategoryName] = useState("");
  const [updateCategory] = categoryAPI.useUpdateCategoryMutation();
  const [deleteCategory] = categoryAPI.useDeleteCategoryMutation();
  const [createCategory] = categoryAPI.useCreateCategoryMutation();
  const [updateSubCategory] = subCategoryAPI.useUpdateSubCategoryMutation();
  const [deleteSubCategory] = subCategoryAPI.useDeleteSubCategoryMutation();
  const [createSubCategory] = subCategoryAPI.useCreateSubCategoryMutation();
  const { data: categories } = categoryAPI.useFetchAllCategoriesQuery(null);
  const { data: subCategories } = subCategoryAPI.useFetchAllSubCategoriesQuery(
    (category.id as any) || ""
  );

  const handleCreate = (marker: null | string): void => {
    const newCategory = {
      id: Date.now(),
      position: (categories?.count as any) + 1,
    };
    if (!marker) {
      if (!newCategoryName.trim().length) {
        return alert("Введите название категории");
      }
      createCategory({ ...newCategory, name: newCategoryName });
      setNewCategoryName("");
    } else {
      if (!newSubCategoryName.trim().length) {
        return alert("Введите название подкатегории");
      }
      createSubCategory({
        ...newCategory,
        name: newSubCategoryName,
        catalog_product: category.id,
      });
      setNewSubCategoryName("");
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLElement>,
    marker: null | string
  ): void => {
    if (e.keyCode === 13) {
      return handleCreate(marker);
    }
  };

  return (
    <div className={styles.wrapper}>
      <DeleteModal
        modalVisible={deleteModalVisible}
        setModalVisible={setDeleteModalVisible}
        activeElement={activeElement}
        deleteItem={
          activeElement.catalog_product ? deleteSubCategory : deleteCategory
        }
        text={"протокол"}
      />
      <div className={styles.content}>
        <Input
          placeholder="Введите название категории"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, null)}
        />
        <Button appearance="filled" onClick={() => handleCreate(null)}>
          Добавить категорию
        </Button>
        <div className={styles.list}>
          <div className={styles.headers}>
            <div className={styles.title}>Название категории</div>
          </div>
          <List
            data={categories}
            category={category}
            setCategory={setCategory}
            updateCategory={updateCategory}
            deleteCategory={deleteCategory}
            selected={selected}
            setSelected={setSelected}
            setActiveElement={setActiveElement}
            setModalVisible={setDeleteModalVisible}
          />
        </div>
      </div>
      <ArrowsIcon className={styles.arrows} />
      <div className={styles.content}>
        {category.id ? (
          <>
            <Input
              placeholder="Введите название подкатегории"
              value={newSubCategoryName}
              onChange={(e) => setNewSubCategoryName(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, category.id)}
            />
            <Button
              appearance="filled"
              onClick={() => handleCreate(category.id)}
            >
              Добавить подкатегорию
            </Button>
            {category ? (
              <div className={styles.list}>
                <div className={styles.headers}>
                  <div className={styles.title}>Название подкатегории</div>
                </div>
                <List
                  data={subCategories}
                  setCategory={() => null}
                  updateCategory={updateSubCategory}
                  deleteCategory={deleteSubCategory}
                  selected={selected}
                  setSelected={setSelected}
                  setActiveElement={setActiveElement}
                  setModalVisible={setDeleteModalVisible}
                />
              </div>
            ) : (
              <NoRows pathname={pathname} className={styles.noSubCategories} />
            )}
          </>
        ) : (
          <div className={styles.noSelectedCategory}>Выберите категорию</div>
        )}
      </div>
    </div>
  );
}

export default withLayout(Categories);
