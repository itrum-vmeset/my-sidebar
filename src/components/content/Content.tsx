import React, { useState } from "react";
import { Button } from "../UI/button/Button";
import styles from "./Content.module.css";
import MyModal from "../UI/modal/MyModal";
import Form from "../UI/form/Form";
import Pagination from "../table/pagination/Pagination";
import Table from "../table/Table";
import { ContentProps } from "./Content.props";

function Content({data, params, setParams, selectOptions, totalPages}: ContentProps): JSX.Element {

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div className={styles.wrapper}>
      <MyModal modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <Form />
      </MyModal>
      <Pagination params={params} setParams={setParams} selectOptions={selectOptions} totalPages={totalPages} />
      <Button
        apearance="filled"
        arrow="none"
        className={styles.btnFullWidth}
        onClick={() => setModalVisible(true)}
      >
        Добавить акцию
      </Button>
      <Table data={data} />
    </div>
  );
}

export default Content;
