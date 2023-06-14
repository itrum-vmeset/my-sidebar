import { useState } from "react";

import { ReactComponent as ClipIcon } from "../../assets/icons/clip.svg";
import { withLayout } from "../../components/layout/Layout";
import TableForm from "../../components/table/tableForm/TableForm";
import DeleteModal from "../../components/UI/deleteModal/DeleteModal";
import { List } from "../../components/UI/list/List";
import { brandAPI } from "../../service/BrandService";

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
    <div className="container">
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
      />
      <div className={styles.list}>
        <div className={styles.headers}>
          <div>Логотип бренда</div>
          <div>Название бренда</div>
        </div>
        <List
          data={data}
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

export default withLayout(Brands);
