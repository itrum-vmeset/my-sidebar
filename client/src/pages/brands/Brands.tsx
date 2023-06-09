import { useState } from "react";

import { ReactComponent as ClipIcon } from "../../assets/icons/clip.svg";
import TableForm from "../../components/table/tableForm/TableForm";
import DeleteModal from "../../components/UI/deleteModal/DeleteModal";
import { List } from "../../components/UI/list/List";
import { brandAPI } from "../../services/BrandService";

import styles from "./Brands.module.css";

export interface NewBrand {
  name: {
    value: string;
    placeholder: string;
  };
  icon: {
    value: string;
    placeholder: string;
    attach: JSX.Element;
  };
}

function Brands(): JSX.Element {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [activeElement, setActiveElement] = useState({
    id: "",
    name: "",
    icon: "",
  });
  const [newBrand, setNewBrand] = useState<NewBrand>({
    name: {
      value: "",
      placeholder: "Введите название бренда",
    },
    icon: {
      value: "",
      placeholder: "Загрузите логотип бренда",
      attach: <ClipIcon className={styles.clipIcon} />,
    },
  });
  const [updateBrand] = brandAPI.useUpdateBrandMutation();
  const [deleteBrand] = brandAPI.useDeleteBrandMutation();
  const [createBrand] = brandAPI.useCreateBrandMutation();
  const { data } = brandAPI.useFetchAllBrandsQuery(null);

  const handleCreate = () => {
    if (!newBrand.name.value || !newBrand.icon.value) {
      return alert("Название и логотип не могут быть пустыми полями");
    }
    createBrand({
      id: Date.now().toString(),
      name: newBrand.name.value,
      icon: newBrand?.icon?.value?.split(`\\`).reverse()[0],
    });
    setNewBrand({
      name: {
        value: "",
        placeholder: "Введите название бренда",
      },
      icon: {
        value: "",
        placeholder: "Загрузите логотип бренда",
        attach: <ClipIcon className={styles.clipIcon} />,
      },
    });
  };
  return (
    <div className="container" data-testid="brands-page">
      <DeleteModal
        modalVisible={deleteModalVisible}
        setModalVisible={setDeleteModalVisible}
        activeElement={activeElement}
        deleteItem={deleteBrand}
        text={"бренд"}
      />
      <TableForm
        addItem={handleCreate}
        item={newBrand}
        setItem={(val) => setNewBrand(val as NewBrand)}
        buttonText="Добавить бренд"
        data-testid="addNewBrandBtn"
      />
      <div className={styles.list}>
        <div className={styles.headers}>
          <div>Логотип бренда</div>
          <div>Название бренда</div>
        </div>
        <List
          data={data?.data?.length ? data : null}
          updateCategory={updateBrand}
          deleteCategory={deleteBrand}
          selected={selected}
          setSelected={setSelected}
          setActiveElement={setActiveElement}
          setModalVisible={setDeleteModalVisible}
        />
      </div>
    </div>
  );
}

export default Brands;
