import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { ORDERS_ROUTE } from "../../helpers/consts";
import { selectOptions } from "../../helpers/helpers";
import { getPageCount } from "../../helpers/pages";
import { IParam } from "../../models/IResponse";
import Pagination from "../table/pagination/Pagination";
import Table from "../table/Table";
import MyAlert from "../UI/alert/MyAlert";
import { Button } from "../UI/button/Button";
import DumbForm from "../UI/dumbForm/DumbForm";
import DumbModal from "../UI/dumbModal/DumbModal";
import Form from "../UI/form/Form";
import Loader from "../UI/loader/Loader";
import MyModal from "../UI/modal/MyModal";
import { Typography } from "../UI/typography/Typography";

import { ContentProps } from "./Content.props";

import styles from "./Content.module.css";

function Content({
  service,
  updateProduct,
  deleteProduct,
}: ContentProps): JSX.Element {
  const [alertVisible, setAlertVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [activeElement, setActiveElement] = useState({});

  const [dumbModalVisible, setDumbModalVisible] = useState(false);

  const [items, setItems] = useState<any>([]);
  const [totalPages, setTotalPages] = useState(0);
  const location = useLocation();
  const [params, setParams] = useState<IParam>({
    page: 1,
    limit: 10,
  });

  const { data, isLoading: isGoodsLoading, error } = service(params);

  useEffect(() => {
    !isGoodsLoading && setTotalPages(getPageCount(data.count, params.limit));
  }, [isGoodsLoading]);

  useEffect(() => {
    !isGoodsLoading && setItems(data.data);
  }, [isGoodsLoading, params, data]);

  const removeProduct = (selectedId: any): void => {
    if (location.pathname === ORDERS_ROUTE) {
      const modifiedItems = items.filter((item: any) => {
        if (selectedId.find((element: any) => item.id === element)) {
          return;
        }
        return item;
      });
      setItems(modifiedItems);
    } else {
      selectedId.forEach((item: any) => deleteProduct(item));
    }
  };

  const editProduct = (product: any): void => {
    if (location.pathname === ORDERS_ROUTE) {
      setItems((prevState: any) =>
        prevState.map((item: any) =>
          item.id === product.id ? { ...product } : item
        )
      );
    } else {
      updateProduct(product);
    }
  };

  // const deleteItems = (): void => {
  //   const selectedId = selectedItems.map((item: any) => item.original.id);
  //   removeProduct(selectedId);
  //   setSelectedItems([]);
  //   setAlertVisible(false);
  // };

  return (
    <div className={styles.wrapper}>
      <MyModal modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <Form
          editProduct={editProduct}
          setModalVisible={setModalVisible}
          activeElement={activeElement}
          removeProduct={removeProduct}
        />
      </MyModal>
      <DumbModal
        dumbModalVisible={dumbModalVisible}
        setDumbModalVisible={setDumbModalVisible}
      >
        <DumbForm
          editProduct={editProduct}
          setDumbModalVisible={setDumbModalVisible}
          activeElement={activeElement}
          removeProduct={removeProduct}
        />
      </DumbModal>
      <Pagination
        params={params}
        setParams={setParams}
        selectOptions={selectOptions}
        totalPages={totalPages}
      />
      <Button
        appearance="filled"
        arrow="none"
        className={styles.btnFullWidth}
        onClick={() => setDumbModalVisible(true)}
      >
        Добавить акцию
      </Button>
      {error && <Typography>Произошла ошибка ${error}</Typography>}
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
        removeProduct={removeProduct}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
    </div>
  );
}

export default Content;
