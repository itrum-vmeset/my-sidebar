import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import { withLayout } from "../../components/layout/Layout";
import { Button } from "../../components/UI/button/Button";
import DeleteModal from "../../components/UI/deleteModal/DeleteModal";
import Form from "../../components/UI/form/Form";
import { ListM } from "../../components/UI/list/ListM";
import MyModal from "../../components/UI/modal/MyModal";
import { IBanner } from "../../models/IResponse";
import BannerStore from "../../store/mobxStore/promocodeStore/BannerStore";

import { BannerSchema, formData } from "./config";

import styles from "./Banners.module.css";

function Banners(): JSX.Element {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    BannerStore.fetchBannersM();
  }, []);

  return (
    <div className="container">
      {BannerStore.activeElementM && (
        <DeleteModal
          modalVisible={deleteModalVisible}
          setModalVisible={setDeleteModalVisible}
          activeElement={BannerStore.activeElementM}
          deleteItem={(banner) => BannerStore.deleteBannerM(banner)}
          text={"промокод"}
        />
      )}
      {formVisible && (
        <MyModal
          modalVisible={formVisible}
          setModalVisible={setFormVisible}
          setActiveElement={() => BannerStore.setActiveElementM(null)}
        >
          {BannerStore.activeElementM && (
            <Form
              modalVisible={formVisible}
              activeElement={BannerStore.activeElementM}
              setFormVisible={setFormVisible}
              formData={formData}
              validationSchema={BannerSchema}
              updateItem={
                BannerStore.activeElementM?.name
                  ? (banner: IBanner) => BannerStore.updateBannerM(banner)
                  : (banner: IBanner) => BannerStore.createBannerM(banner)
              }
              removeItem={(banner: IBanner) =>
                BannerStore.deleteBannerM(banner)
              }
            />
          )}
        </MyModal>
      )}
      <Button
        appearance="filled"
        arrow="none"
        className={styles.btnFullWidth}
        onClick={() => {
          BannerStore.setActiveElementM({
            id: Date.now().toString(),
            name: "",
            description: "",
            percent: 0,
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
        <ListM
          data={BannerStore.bannersM}
          updateCategory={(banner: IBanner) =>
            BannerStore.updateBannerM(banner)
          }
          deleteCategory={(banner: IBanner) =>
            BannerStore.deleteBannerM(banner)
          }
          selected={selected}
          setSelected={setSelected}
          setActiveElement={(banner: IBanner) =>
            BannerStore.setActiveElementM(banner)
          }
          setModalVisible={setDeleteModalVisible}
          setFormVisible={setFormVisible}
        />
      </div>
    </div>
  );
}

export default withLayout(observer(Banners));
