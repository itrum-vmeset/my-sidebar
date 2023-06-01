import { useState } from "react";

import { withLayout } from "../../components/layout/Layout";
import { Button } from "../../components/UI/button/Button";
import DeleteModal from "../../components/UI/deleteModal/DeleteModal";
import CustomForm from "../../components/UI/form/CustomForm";
import { List } from "../../components/UI/list/List";
import MyModal from "../../components/UI/modal/MyModal";
import { IBanner } from "../../models/IResponse";
import { bannerAPI } from "../../service/BannerService";

import { formData } from "./config";

import styles from "./Banners.module.css";

function Banners(): JSX.Element {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [activeElement, setActiveElement] = useState<any>({});
  const [deleteBanner] = bannerAPI.useDeleteBannerMutation();
  const [updateBanner] = bannerAPI.useUpdateBannerMutation();
  const [createBanner] = bannerAPI.useCreateBannerMutation();
  const { data } = bannerAPI.useFetchAllBannersQuery(null);

  return (
    <div className="container">
      <DeleteModal
        modalVisible={deleteModalVisible}
        setModalVisible={setDeleteModalVisible}
        activeElement={activeElement}
        deleteItem={deleteBanner}
        text={"баннер"}
      />
      <MyModal
        modalVisible={formVisible}
        setModalVisible={setFormVisible}
        setActiveElement={setActiveElement}
      >
        <CustomForm
          activeElement={activeElement}
          setFormVisible={setFormVisible}
          formData={formData}
          updateItem={
            activeElement.name
              ? (banner: IBanner) => updateBanner(banner)
              : (banner: IBanner) => createBanner(banner)
          }
          removeItem={(banner: IBanner) => deleteBanner(banner)}
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
      <div className={styles.list}>
        <div className={styles.headers}>
          <div>Заголовок</div>
        </div>
        <List
          data={data}
          updateCategory={updateBanner}
          deleteCategory={deleteBanner}
          selected={selected}
          setSelected={setSelected}
          setActiveElement={setActiveElement}
          setModalVisible={setDeleteModalVisible}
          setFormVisible={setFormVisible}
        />
      </div>
    </div>
  );
}

export default withLayout(Banners);
