import { useState } from "react";
import { useLocation } from "react-router-dom";

import { ReactComponent as ArrowsIcon } from "../../assets/icons/Arrows.svg";
import { NoRows } from "../../components/table/noRows/NoRows";
import { Button } from "../../components/UI/button/Button";
import DeleteModal from "../../components/UI/deleteModal/DeleteModal";
import { Input } from "../../components/UI/input/Input";
import { List } from "../../components/UI/list/List";
import { ICategory } from "../../models/IResponse";
import { categoryAPI } from "../../services/CategoryService";
import { subCategoryAPI } from "../../services/SubCategoryService";

import styles from "./Categories.module.css";

function Categories(): JSX.Element {
  const { pathname } = useLocation();
  const [category, setCategory] = useState<ICategory>({ id: "" } as ICategory);
  const [activeElement, setActiveElement] = useState({
    catalog_product: "",
    id: "",
    name: "",
    position: 0,
  });
  const [selected, setSelected] = useState(null);
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
  const { data: subCategories, refetch } =
    subCategoryAPI.useFetchAllSubCategoriesQuery(category.id || "");

  const handleCreate = (marker: null | string): void => {
    const newCategory = {
      id: Date.now().toString(),
      position: (categories?.count as number) + 1,
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

  const handleDeleteCategoryAndHerSubCategories = async (
    element: ICategory
  ): Promise<void> => {
    await deleteCategory(element);
    if (subCategories?.data?.length) {
      for (const item of subCategories.data) {
        await deleteSubCategory(item);
      }
      refetch();
    }
    setCategory({ id: "" } as ICategory);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLElement>,
    marker: null | string
  ): void => {
    if (e.key === "Enter") {
      return handleCreate(marker);
    }
  };

  return (
    <div className={styles.wrapper} data-testid="categories-page">
      <DeleteModal
        modalVisible={deleteModalVisible}
        setModalVisible={setDeleteModalVisible}
        activeElement={activeElement}
        deleteItem={
          activeElement.catalog_product
            ? deleteSubCategory
            : handleDeleteCategoryAndHerSubCategories
        }
        text={"протокол"}
      />
      <div className={styles.content}>
        <Input
          placeholder="Введите название категории"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, null)}
          data-testid="inputNewCategory"
        />
        <Button
          appearance="filled"
          onClick={() => handleCreate(null)}
          data-testid="addCategoryBtn"
        >
          Добавить категорию
        </Button>
        <div className={styles.list} data-testid="categoriesBlock">
          <div className={styles.headers}>
            <div className={styles.title}>Название категории</div>
          </div>
          <List
            data={categories?.data?.length ? categories : null}
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
              data-testid="inputNewSubCategory"
            />
            <Button
              appearance="filled"
              onClick={() => handleCreate(category.id)}
              data-testid="addSubCategoryBtn"
            >
              Добавить подкатегорию
            </Button>
            {category ? (
              <div className={styles.list} data-testid="subCategoriesBlock">
                <div className={styles.headers}>
                  <div className={styles.title}>Название подкатегории</div>
                </div>
                <List
                  data={subCategories?.data?.length ? subCategories : null}
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

export default Categories;
