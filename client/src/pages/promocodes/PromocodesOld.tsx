import { useMemo, useState } from "react";
import { useTable } from "react-table";
import { useBlockLayout } from "react-table";

import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import PageContent from "../../components/cityContent/PageContent";
import { withLayout } from "../../components/layout/Layout";
import TableComponent from "../../components/table/TableComponent";
import { Button } from "../../components/UI/button/Button";
import DeleteModal from "../../components/UI/deleteModal/DeleteModal";
import Form from "../../components/UI/form/Form";
import MyModal from "../../components/UI/modal/MyModal";
import { IPromocode } from "../../models/IResponse";
import { promocodeAPI } from "../../service/PromocodeService";

import { columns } from "./config";

import styles from "./Promocodes.module.css";

function Promocodes(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [activeElement, setActiveElement] = useState<any>({});
  const [deletePromocode] = promocodeAPI.useDeletePromocodeMutation();
  const [updatePromocode] = promocodeAPI.useUpdatePromocodeMutation();
  const [createPromocode] = promocodeAPI.useCreatePromocodeMutation();
  const { data } = promocodeAPI.useFetchAllPromocodesQuery(null);

  const productsData = useMemo(
    () => (data?.data.length ? [...data.data] : []),
    [data]
  );

  const tableInstance = useTable(
    {
      columns: columns as any,
      data: productsData,
    },
    useBlockLayout
  );

  const handleClickRow = (row: any): void => {
    setActiveElement(row.original);
    setFormVisible(true);
  };

  const renderActions = () => {
    return [
      {
        component: (
          <div className="actionIconWrapper">
            <DeleteIcon key={33} className={styles.actionIcon} />
          </div>
        ),
        width: 40,
        action: (item: any) => {
          setActiveElement(item);
          setModalVisible(true);
        },
      },
    ];
  };

  return (
    <div>
      {/* <DeleteModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        activeElement={activeElement}
        deleteItem={deletePromocode}
        text={"промокод"}
      />
      <PageContent
        deleteItem={(promocode: IPromocode) => deletePromocode(promocode)}
        updateItem={(promocode: IPromocode) => updatePromocode(promocode)}
      >
        <MyModal
          modalVisible={formVisible}
          setModalVisible={setFormVisible}
          setActiveElement={setActiveElement}
        >
          <Form
            updateItem={
              activeElement.name
                ? (promocode: IPromocode) => updatePromocode(promocode)
                : (promocode: IPromocode) => createPromocode(promocode)
            }
            removeItem={(promocode: IPromocode) => deletePromocode(promocode)}
            setModalVisible={setFormVisible}
            activeElement={activeElement}
          />
        </MyModal>
        <Button
          appearance="filled"
          arrow="none"
          className={styles.btnFullWidth}
          onClick={() => {
            setActiveElement({
              id: Date.now().toString(),
              name: "",
              description: "",
              percent: "",
              image: "",
              availableFor: "",
              products: [],
            });
            setFormVisible(true);
          }}
        >
          Добавить промокод
        </Button>
        <TableComponent
          // data={productsData}
          // columns={columns}
          tableInstance={tableInstance}
          renderActions={renderActions}
          handleClickRow={handleClickRow}
        />
      </PageContent> */}
    </div>
  );
}

export default withLayout(Promocodes);
