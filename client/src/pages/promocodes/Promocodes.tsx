import { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import { useBlockLayout } from "react-table";

import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import PageContent from "../../components/cityContent/PageContent";
import { withLayout } from "../../components/layout/Layout";
import TableComponent from "../../components/table/TableComponent";
import { Button } from "../../components/UI/button/Button";
import DeleteModal from "../../components/UI/deleteModal/DeleteModal";
import CustomForm from "../../components/UI/form/CustomForm";
import MyModal from "../../components/UI/modal/MyModal";
import { IPromocode } from "../../models/IResponse";
import { brandAPI } from "../../service/BrandService";
import { promocodeAPI } from "../../service/PromocodeService";

import { columns, formData, PromocodeSchema } from "./config";

import styles from "./Promocodes.module.css";

function Promocodes(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [enrichedFormData, setEnrichedFormData] = useState<any>([]);
  const [formVisible, setFormVisible] = useState(false);
  const [activeElement, setActiveElement] = useState<any>({});
  const [deletePromocode] = promocodeAPI.useDeletePromocodeMutation();
  const [updatePromocode] = promocodeAPI.useUpdatePromocodeMutation();
  const [createPromocode] = promocodeAPI.useCreatePromocodeMutation();
  const { data } = promocodeAPI.useFetchAllPromocodesQuery(null);
  const { data: brands } = brandAPI.useFetchAllBrandsQuery(null);

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

  return (
    <div className="container">
      <DeleteModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        activeElement={activeElement}
        deleteItem={deletePromocode}
        text={"промокод"}
      />

      <MyModal
        modalVisible={formVisible}
        setModalVisible={setFormVisible}
        setActiveElement={setActiveElement}
      >
        <CustomForm
          modalVisible={formVisible}
          activeElement={activeElement}
          setFormVisible={setFormVisible}
          formData={enrichedFormData}
          brands={brands}
          validationSchema={PromocodeSchema}
          updateItem={
            activeElement.name
              ? (promocode: IPromocode) => updatePromocode(promocode)
              : (promocode: IPromocode) => createPromocode(promocode)
          }
          removeItem={(promocode: IPromocode) => deletePromocode(promocode)}
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
            promocode: "",
            percent: 0,
            catalog_product: {
              id: "",
              name: "",
            },
            sub_catalog_product: {
              id: "",
              name: "",
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
      <TableComponent
        data={productsData}
        columns={columns}
        tableInstance={tableInstance}
        renderActions={renderActions}
        handleClickRow={handleClickRow}
      />
    </div>
  );
}

export default withLayout(Promocodes);
