import { useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { Row, useTable } from "react-table";
import { useBlockLayout } from "react-table";

import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import Table from "../../components/table/Table";
import { IRenderAction } from "../../components/table/Table.props";
import { Button } from "../../components/UI/button/Button";
import DeleteModal from "../../components/UI/deleteModal/DeleteModal";
import Form from "../../components/UI/form/Form";
import MyModalM from "../../components/UI/modal/MyModalM";
import { IFormData } from "../../models/IFormData";
import { IPromocode } from "../../models/IResponse";
import { brandAPI } from "../../services/BrandService";
import PromocodeStore from "../../store/mobxStore/promocodeStore/PromocodeStore";

import { columns, formData, PromocodeSchema } from "./config";

import styles from "./Promocodes.module.css";

function Promocodes(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [enrichedFormData, setEnrichedFormData] = useState<IFormData[]>([]);
  const [formVisible, setFormVisible] = useState(false);
  const { data: brands } = brandAPI.useFetchAllBrandsQuery(null);

  const productsData = useMemo(
    () =>
      PromocodeStore.promocodesM.length ? [...PromocodeStore.promocodesM] : [],
    [PromocodeStore.promocodesM]
  );

  const tableInstance = useTable(
    {
      columns: columns,
      data: productsData,
    },
    useBlockLayout
  );

  const handleClickRow = (row: Row): void => {
    PromocodeStore.setActiveElementM(row.original as IPromocode);
    setFormVisible(true);
  };

  const renderActions = (): IRenderAction<IPromocode>[] => {
    return [
      {
        component: (
          <div className="actionIconWrapper" data-testid="delIcon">
            <DeleteIcon key={33} className={styles.actionIcon} />
          </div>
        ),
        width: 40,
        action: (item: IPromocode) => {
          PromocodeStore.setActiveElementM(item);
          setModalVisible(true);
        },
      },
    ];
  };

  useEffect(() => {
    const enriched = formData.map((item) => {
      if (item.componentProps.options === "brands") {
        return {
          ...item,
          componentProps: {
            ...item.componentProps,
            options: brands?.data,
          },
        };
      } else {
        return item;
      }
    });
    setEnrichedFormData(enriched);
  }, [brands]);

  useEffect(() => {
    PromocodeStore.fetchPromocodesM();
  }, []);

  return (
    <div className="container" data-testid="promocodes-page">
      {PromocodeStore.activeElementM && (
        <DeleteModal
          data-testid="deleteModal"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          activeElement={PromocodeStore.activeElementM}
          deleteItem={(promocode) => PromocodeStore.deletePromocodeM(promocode)}
          text={"промокод"}
        />
      )}
      {formVisible && (
        <MyModalM
          modalVisible={formVisible}
          setModalVisible={setFormVisible}
          setActiveElement={() => PromocodeStore.setActiveElementM(null)}
        >
          {PromocodeStore.activeElementM && (
            <Form
              modalVisible={formVisible}
              activeElement={PromocodeStore.activeElementM}
              setFormVisible={setFormVisible}
              formData={enrichedFormData}
              validationSchema={PromocodeSchema}
              updateItem={
                PromocodeStore.activeElementM?.name
                  ? (promocode: IPromocode) =>
                      PromocodeStore.updatePromocodeM(promocode)
                  : (promocode: IPromocode) =>
                      PromocodeStore.createPromocodeM(promocode)
              }
              removeItem={(promocode: IPromocode) =>
                PromocodeStore.deletePromocodeM(promocode)
              }
            />
          )}
        </MyModalM>
      )}
      <Button
        data-testid="addBtn"
        appearance="filled"
        arrow="none"
        className={styles.btnFullWidth}
        onClick={() => {
          PromocodeStore.setActiveElementM({
            id: Date.now().toString(),
            name: "",
            promocode: "",
            percent: 0,
            catalog_product: {
              id: "",
              name: "",
            },
            sub_catalog_product: {
              id: "",
              name: "",
              catalog_product: "",
            },
            brand: {
              id: "",
              name: "",
            },
            products: [],
          });
          setFormVisible(true);
        }}
      >
        Добавить промокод
      </Button>
      {tableInstance && (
        <Table
          tableInstance={tableInstance}
          renderActions={renderActions}
          handleClickRow={handleClickRow}
        />
      )}
    </div>
  );
}

export default observer(Promocodes);
