import { useState } from "react";
import { useLocation } from "react-router-dom";

import { ReactComponent as ArrowsIcon } from "../../assets/icons/Arrows.svg";
import { withLayout } from "../../components/layout/Layout";
import { NoRows } from "../../components/table/noRows/NoRows";
import { Button } from "../../components/UI/button/Button";
import DeleteModal from "../../components/UI/deleteModal/DeleteModal";
import Form from "../../components/UI/form/Form";
import { Input } from "../../components/UI/input/Input";
import { List } from "../../components/UI/list/List";
import MyModal from "../../components/UI/modal/MyModal";
import { brandAPI } from "../../service/BrandService";
import { protocolCategoriesAPI } from "../../service/ProtocolCategoriesService";
import { protocolAPI } from "../../service/ProtocolsService";

import styles from "./Protocols.module.css";

function Protocols(): JSX.Element {
  const { pathname } = useLocation();
  const [category, setCategory] = useState({ id: "" });
  const [activeElement, setActiveElement] = useState<any>({
    description: "",
    protocol_category: "",
  });
  const [selected, setSelected] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  const [newCategoryName, setNewCategoryName] = useState("");
  const [updateCategory] =
    protocolCategoriesAPI.useUpdateProtocolCategoryMutation();
  const [deleteCategory] =
    protocolCategoriesAPI.useDeleteProtocolCategoryMutation();
  const [createCategory] =
    protocolCategoriesAPI.useCreateProtocolCategoryMutation();
  const [updateProtocol] = protocolAPI.useUpdateProtocolMutation();
  const [deleteProtocol] = protocolAPI.useDeleteProtocolMutation();
  const [createProtocol] = protocolAPI.useCreateProtocolMutation();
  const { data: protocols } = protocolAPI.useFetchAllProtocolsQuery(
    category?.id || ""
  );
  const { data: protocolCategories } =
    protocolCategoriesAPI.useFetchAllProtocolCategoriesQuery(null);
  const { data: brands } = brandAPI.useFetchAllBrandsQuery(null);

  const handleCreate = (): void => {
    const newProtocolCategory = {
      name: newCategoryName,
      id: Date.now(),
    };
    if (!newCategoryName.trim().length) {
      return alert("Сначала выберите категорию");
    }
    createCategory(newProtocolCategory);
    setNewCategoryName("");
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLElement>,
    marker: null | string
  ): void => {
    if (e.keyCode === 13) {
      return handleCreate();
    }
  };

  const setNewProtocol = (item: any) => {
    if (!category) {
      return alert("Сначала выберите категорию");
    }
    const name = protocolCategories?.data?.find((el) => el.id === category.id);
    const newData = {
      ...item,
      name: item.name,
      brand: item.brand,
      description: item.description,
      protocol_category: name,
      products: item.products,
    };
    setActiveElement(newData);
    setFormVisible(true);
  };

  const handleCreateProtocol = (data: any) => {
    createProtocol({
      ...data,
      protocol_category: data?.protocol_category?.id,
    });
  };

  return (
    <div className={styles.wrapper}>
      <DeleteModal
        modalVisible={deleteModalVisible}
        setModalVisible={setDeleteModalVisible}
        activeElement={activeElement}
        deleteItem={
          activeElement.protocol_category ? deleteProtocol : deleteCategory
        }
        text={"протокол"}
      />
      <MyModal
        modalVisible={formVisible}
        setModalVisible={setFormVisible}
        setActiveElement={setActiveElement}
      >
        <Form
          updateItem={
            activeElement?.description ? updateProtocol : handleCreateProtocol
          }
          setModalVisible={setFormVisible}
          activeElement={activeElement}
          setActiveElement={setActiveElement}
          brands={brands}
        />
      </MyModal>
      <div className={styles.list}>
        <Input
          placeholder="Введите название категории протокола"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, null)}
        />
        <Button appearance="filled" onClick={() => handleCreate()}>
          Добавить категорию протокола
        </Button>
        <div className={styles.headers}>
          <div>Название категории</div>
        </div>
        <List
          data={protocolCategories}
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
      <ArrowsIcon className={styles.arrows} />
      <div className={styles.list}>
        {category.id ? (
          <>
            <Button
              appearance="filled"
              onClick={() =>
                setNewProtocol({
                  name: "",
                  brand: "",
                  description: "",
                  protocol_category: category,
                  products: [],
                  id: Date.now(),
                  isRetailAllowed: false,
                })
              }
              className={styles.addProtocolBtn}
            >
              Добавить протокол
            </Button>
            {category ? (
              <>
                <div className={styles.headers}>
                  <div>Название протокола</div>
                </div>
                <List
                  data={protocols}
                  setCategory={() => null}
                  updateCategory={updateProtocol}
                  deleteCategory={deleteProtocol}
                  selected={selected}
                  setSelected={setSelected}
                  setActiveElement={setActiveElement}
                  setModalVisible={setDeleteModalVisible}
                  setFormVisible={setFormVisible}
                />
              </>
            ) : (
              <NoRows pathname={pathname} className={styles.noSubCategories} />
            )}
          </>
        ) : (
          <div className={styles.noSelectedCategory}>
            Выберите категорию протокола
          </div>
        )}
      </div>
    </div>
  );
}

export default withLayout(Protocols);
