import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import {
  CLIENTS_ROUTE,
  ORDERS_ROUTE,
  PRODUCTS_ROUTE,
} from "../../helpers/consts";
import { selectOptions } from "../../helpers/helpers";
import { getPageCount } from "../../helpers/pages";
import { useClients } from "../../hooks/useClients";
import { IParam } from "../../models/IResponse";
import Pagination from "../table/pagination/Pagination";
import Table from "../table/Table";
import MyAlert from "../UI/alert/MyAlert";
import { Button } from "../UI/button/Button";
import Form from "../UI/form/Form";
import FormCopy from "../UI/form/FormCopy";
import { Input } from "../UI/input/Input";
import Loader from "../UI/loader/Loader";
import MyModal from "../UI/modal/MyModal";
import ProductModal from "../UI/productModal/ProductModal";
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

  const [productModalVisible, setProductModalVisible] = useState(false);

  const [items, setItems] = useState<any>([]);
  const [query, setQuery] = useState("");
  const searchedClients = useClients(items, query);
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
    if (location.pathname === CLIENTS_ROUTE) {
      const newData =
        data?.data?.map((item: any) => {
          const { lastName, name, ...dataItem } = item;
          return {
            ...dataItem,
            fullName: name + " " + lastName,
          };
        }) || [];
      !isGoodsLoading && setItems(newData);
    } else {
      !isGoodsLoading && setItems(data.data);
    }
  }, [isGoodsLoading, params, data, query]);

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
      
      <ProductModal
        productModalVisible={productModalVisible}
        setProductModalVisible={setProductModalVisible}
      >
        <FormCopy />
      </ProductModal>
      {location.pathname === CLIENTS_ROUTE && (
        <div className={styles.search}>
          <SearchIcon className={styles.searchIcon} />
          <CloseIcon className={styles.closeIcon} />
          <Input
            placeholder="Поиск"
            className={styles.searchInput}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      )}
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
        onClick={
          location.pathname === PRODUCTS_ROUTE
            ? () => setProductModalVisible(true)
            : () => setModalVisible(true)
        }
      >
        Добавить акцию
      </Button>
      {error && <Typography>Произошла ошибка ${error}</Typography>}
      {isGoodsLoading ? (
        <Loader />
      ) : (
        <Table
          data={
            location.pathname === CLIENTS_ROUTE && query
              ? searchedClients
              : items
          }
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
