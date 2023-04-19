import React, { useEffect, useState } from "react";

import { selectOptions } from "../../helpers/helpers";
import { getPageCount } from "../../helpers/pages";
import { useFetching } from "../../hooks/useFetching";
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

function Content({ service }: ContentProps): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);

  const [data, setData] = useState<any>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [params, setParams] = useState<IParam>({
    page: 1,
    limit: 5,
  });

  const [fetchProducts, isLoading, error] = useFetching(async () => {
    const response = await service.getAll(params);
    setData(response.data);
    const totalCount = response.headers["x-total-count"];
    setTotalPages(getPageCount(totalCount, params.limit));
  });

  const removeProduct = (items: any): void => {
    const arrayka = data.filter((element: any) =>
      items.find((item: any) => item.id === element.id)
    );
    setData(arrayka);
  };

  const addProduct = (item: any): void => {
    // setData([...data, item]);
    console.log(item);
  };

  useEffect(() => {
    fetchProducts();
  }, [params]);

  return (
    <div className={styles.wrapper}>
      <MyModal modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <Form addProduct={addProduct} />
      </MyModal>
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
        onClick={() => setModalVisible(true)}
      >
        Добавить акцию
      </Button>
      {error && <Typography>Произошла ошибка ${error}</Typography>}
      {isLoading ? (
        <Loader />
      ) : (
        <Table
          data={data}
          removeProduct={removeProduct}
          addProduct={addProduct}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </div>
  );
}

export default Content;
