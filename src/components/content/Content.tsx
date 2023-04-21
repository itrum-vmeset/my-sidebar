import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { selectOptions } from "../../helpers/helpers";
import { getPageCount } from "../../helpers/pages";
import { IParam } from "../../models/IResponse";
import Pagination from "../table/pagination/Pagination";
import Table from "../table/Table";
import { Button } from "../UI/button/Button";
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
  const [modalVisible, setModalVisible] = useState(false);

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

  const removeProduct = (selectedItems: any): void => {
    if (location.pathname === "/orders") {
      const modifiedItems = items.filter((item: any) => {
        if (selectedItems.find((element: any) => item.id === element)) {
          return;
        }
        return item;
      });
      setItems(modifiedItems);
    } else {
      selectedItems.forEach((item: any) => deleteProduct(item));
    }
  };

  const editProduct = (product: any): void => {
    if (location.pathname === "/orders") {
      setItems((prevState: any) =>
        prevState.map((item: any) =>
          item.id === product.id ? { ...product } : item
        )
      );
    } else {
      updateProduct(product);
    }
  };

  return (
    <div className={styles.wrapper}>
      <MyModal modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <Form addProduct={editProduct} />
      </MyModal>
      <Pagination
        params={params}
        setParams={setParams}
        selectOptions={selectOptions}
        totalPages={totalPages}
      />
      <Button appearance="filled" arrow="none" className={styles.btnFullWidth}>
        Добавить акцию
      </Button>
      {error && <Typography>Произошла ошибка ${error}</Typography>}
      {isGoodsLoading ? (
        <Loader />
      ) : (
        <Table
          data={items}
          removeProduct={removeProduct}
          editProduct={editProduct}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </div>
  );
}

export default Content;
