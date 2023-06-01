import { useState } from "react";
import { useLocation } from "react-router-dom";

import { ReactComponent as ArrowsIcon } from "../../assets/icons/Arrows.svg";
import { withLayout } from "../../components/layout/Layout";
import { NoRows } from "../../components/table/noRows/NoRows";
import { Button } from "../../components/UI/button/Button";
import { Input } from "../../components/UI/input/Input";
import { List } from "../../components/UI/list/List";
import { categoryAPI } from "../../service/CategoryService";
import { subCategoryAPI } from "../../service/SubCategoryService";

import styles from "./Categories.module.css";

function Categories(): JSX.Element {
  const { pathname } = useLocation();
  const [category, setCategory] = useState(null);
  const [activeElement, setActiveElement] = useState({ name: "" });
  const [selected, setSelected] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
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
    (category as any) || ""
  );

  console.log("category", category);

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
        catalog_product: category,
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
      {/* <DeleteModal
        modalVisible={deleteModalVisible}
        setModalVisible={setDeleteModalVisible}
        activeElement={activeElement}
        deleteItem={
          activeElement.protocol_category ? deleteProtocol : deleteCategory
        }
        text={"протокол"}
      /> */}
      <div className={styles.list}>
        <Input
          placeholder="Введите название категории"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, null)}
        />
        <Button appearance="filled" onClick={() => handleCreate(null)}>
          Добавить категорию
        </Button>
        <List
          data={categories}
          category={category}
          setCategory={setCategory}
          updateCategory={updateCategory}
          deleteCategory={deleteCategory}
          selected={selected}
          setSelected={setSelected}
          setActiveElement={setActiveElement}
          setModalVisible={setModalVisible}
        />
      </div>
      <ArrowsIcon className={styles.arrows} />
      <div className={styles.list}>
        {category !== null ? (
          <>
            <Input
              placeholder="Введите название подкатегории"
              value={newSubCategoryName}
              onChange={(e) => setNewSubCategoryName(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, category)}
            />
            <Button appearance="filled" onClick={() => handleCreate(category)}>
              Добавить подкатегорию
            </Button>
            {category ? (
              <List
                data={subCategories}
                setCategory={() => null}
                updateCategory={updateSubCategory}
                deleteCategory={deleteSubCategory}
                selected={selected}
                setSelected={setSelected}
                setActiveElement={setActiveElement}
                setModalVisible={setModalVisible}
              />
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
