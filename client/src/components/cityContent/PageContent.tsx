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
  updateItem,
  deleteItem,
  children,
}: PageContentProps): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeElement, setActiveElement] = useState({});

  return (
    <div className={styles.wrapper}>
      {children}
      {/* <MyModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setActiveElement={setActiveElement}
      >
        <Form
          updateItem={updateItem}
          setModalVisible={setModalVisible}
          activeElement={activeElement}
        />
      </MyModal> */}
    </div>
  );
}

export default PageContent;
