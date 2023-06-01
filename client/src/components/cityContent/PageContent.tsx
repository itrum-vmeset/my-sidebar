import { useState } from "react";

import { useData } from "../../hooks/useData";
import TableComponent from "../table/TableComponent";
import MyAlert from "../UI/alert/MyAlert";
import Form from "../UI/form/Form";
import Loader from "../UI/loader/Loader";
import MyModal from "../UI/modal/MyModal";
import { Typography } from "../UI/typography/Typography";

import { PageContentProps } from "./PageContent.props";

import styles from "./PageContent.module.css";

function PageContent({
  service,
  updateItem,
  deleteItem,
  columns,
  children,
}: PageContentProps): JSX.Element {
  const [alertVisible, setAlertVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeElement, setActiveElement] = useState({});
  const [items, setItems] = useState<any>([]);
  const { data, isLoading: isGoodsLoading, error, refetch } = service();

  useData(data, setItems, isGoodsLoading);

  const deleteItems = async () => {
    for (const item of selectedItems) {
      await deleteItem(item.original.id);
    }
    refetch();
    setSelectedItems([]);
    setAlertVisible(false);
  };

  return (
    <div className={styles.wrapper}>
      {children}
      <MyModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setActiveElement={setActiveElement}
      >
        <Form
          updateItem={updateItem}
          setModalVisible={setModalVisible}
          activeElement={activeElement}
        />
      </MyModal>
      {error && <Typography>Произошла ошибка</Typography>}
      {isGoodsLoading ? (
        <Loader />
      ) : (
        <TableComponent
          data={items}
          setModalVisible={setModalVisible}
          setActiveElement={setActiveElement}
          setAlertVisible={setAlertVisible}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          columns={columns}
        />
      )}
      <MyAlert
        alertVisible={alertVisible}
        setAlertVisible={setAlertVisible}
        deleteItems={deleteItems}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        refetch={refetch}
      />
    </div>
  );
}

export default PageContent;
