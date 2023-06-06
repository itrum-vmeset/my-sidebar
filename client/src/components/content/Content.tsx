import { useState } from "react";

import { useData } from "../../hooks/useData";
import Table from "../table/Table";
import MyAlert from "../UI/alert/MyAlert";
import { Button } from "../UI/button/Button";
import Form from "../UI/form/Form";
import Loader from "../UI/loader/Loader";
import MyModal from "../UI/modal/MyModal";
import { Typography } from "../UI/typography/Typography";

import { ContentProps } from "./Content.props";

import styles from "./Content.module.css";

function Content({
  service,
  updateItem,
  deleteItem,
}: ContentProps): JSX.Element {
  const [alertVisible, setAlertVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeElement, setActiveElement] = useState(undefined);
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

  // const removeProduct = (selectedId: any): void => {
  //   if (location.pathname === ORDERS_ROUTE) {
  //     const modifiedItems = items.filter((item: any) => {
  //       if (selectedId.find((element: any) => item.id === element)) {
  //         return;
  //       }
  //       return item;
  //     });
  //     setItems(modifiedItems);
  //   } else {
  //     selectedId.forEach((item: any) => deleteItem(item));
  //   }
  // };

  return (
    <div className={styles.wrapper}>
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
      {/* <Button
        appearance="filled"
        arrow="none"
        className={styles.btnFullWidth}
        onClick={
          location.pathname === PRODUCTS_ROUTE
            ? () => setProductModalVisible(true)
            : () => setModalVisible(true)
        }
      >
        Добавить акцию
      </Button> */}
      {error && <Typography>Произошла ошибка</Typography>}
      {isGoodsLoading ? (
        <Loader />
      ) : (
        <Table
          data={items}
          setModalVisible={setModalVisible}
          setActiveElement={setActiveElement}
          setAlertVisible={setAlertVisible}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
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

export default Content;
