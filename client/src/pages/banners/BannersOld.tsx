import { useMemo, useState } from "react";
import { useTable } from "react-table";
import { useBlockLayout } from "react-table";

import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import PageContent from "../../components/cityContent/PageContent";
import { withLayout } from "../../components/layout/Layout";
import TableComponent from "../../components/table/TableComponent";
import { Button } from "../../components/UI/button/Button";
import DeleteModal from "../../components/UI/deleteModal/DeleteModal";
import Form from "../../components/UI/form/Form";
import MyModal from "../../components/UI/modal/MyModal";
import { IBanner } from "../../models/IResponse";
import { bannerAPI } from "../../service/BannerService";

import { columns } from "./config";

import styles from "./Banners.module.css";

function Banners(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [activeElement, setActiveElement] = useState<any>({});
  const [deleteBanner] = bannerAPI.useDeleteBannerMutation();
  const [updateBanner] = bannerAPI.useUpdateBannerMutation();
  const [createBanner] = bannerAPI.useCreateBannerMutation();
  const { data } = bannerAPI.useFetchAllBannersQuery(null);

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
            <EditIcon key={33} />
          </div>
        ),
        width: 60,
        action: (item: any) => {
          setActiveElement(item);
          setFormVisible(true);
        },
      },
      {
        component: (
          <div className="actionIconWrapper">
            <DeleteIcon key={33} />
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
        deleteItem={deleteBanner}
        text={"баннер"}
      />
      <PageContent
        deleteItem={(banner: IBanner) => deleteBanner(banner)}
        updateItem={(banner: IBanner) => updateBanner(banner)}
      >
        <MyModal
          modalVisible={formVisible}
          setModalVisible={setFormVisible}
          setActiveElement={setActiveElement}
        >
          <Form
            updateItem={
              activeElement.name
                ? (banner: IBanner) => updateBanner(banner)
                : (banner: IBanner) => createBanner(banner)
            }
            removeItem={(banner: IBanner) => deleteBanner(banner)}
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
          Добавить баннер
        </Button>
        <TableComponent
          tableInstance={tableInstance}
          renderActions={renderActions}
          handleClickRow={handleClickRow}
        />
      </PageContent> */}
    </div>
  );
}

export default withLayout(Banners);
