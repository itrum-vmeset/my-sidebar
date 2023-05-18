import { useEffect, useState } from "react";
import classNames from "classnames";
import { useLocation } from "react-router-dom";

import { ORDERS_ROUTE, PROTOCOLS_ROUTE } from "../../../helpers/consts";
import { deliveryOptions, paymentOptions } from "../../../helpers/helpers";
import { priceRu } from "../../../helpers/priceRu";
import { translator } from "../../../helpers/translator";
import { IProductMock } from "../../../models/IProductMockData";
import { brandAPI } from "../../../service/BrandService";
import { Input } from "../input/Input";
import TagsInput from "../tagsInput/TagsInput";
import { Textarea } from "../textarea/Textarea";
import { Typography } from "../typography/Typography";

import FormCategory from "./category/FormCategory";
import Characteristics from "./characteristics/Characteristics";
import Controls from "./controls/Controls";
import CustomSelect from "./customSelect/CustomSelect";
import FormList from "./formList/FormList";
import FormImages from "./images/FormImages";

import styles from "./Form.module.css";

function Form({
  activeElement,
  setActiveElement,
  updateItem,
  setModalVisible,
  removeProduct,
}: any): JSX.Element {
  const [data, setData] = useState<any>();
  const [orderModalVisible, setOrderModalVisible] = useState(false);
  const [brandModalVisible, setBrandModalVisible] = useState(false);
  const [deliveryModalVisible, setDeliveryModalVisible] = useState(false);
  const { data: brands } = brandAPI.useFetchAllBrandsQuery(null);
  const { pathname } = useLocation();

  const saveEdit = (): void => {
    data && updateItem(data);
  };
  // const onRemove = (): void => {
  //   removeProduct([data?.id]);
  //   setModalVisible(false);
  // };

  useEffect(() => {
    if (activeElement) {
      setData(activeElement);
    }
  }, [activeElement]);

  return (
    <div className={styles.formWrapper}>
      <Controls saveEdit={saveEdit} setModalVisible={setModalVisible} />
      <div
        className={classNames(styles.formInpts, {
          [styles.noScroll]:
            pathname === ORDERS_ROUTE || pathname === PROTOCOLS_ROUTE,
        })}
      >
        {brands?.data.length &&
          data &&
          Object.entries(data).map(([key, value], index) => (
            <div key={index}>
              <Typography>{translator(key)}</Typography>
              {(() => {
                switch (key) {
                  case "nameFrom1C":
                    return <Input value={data.nameFrom1C} disabled />;
                  case "brand":
                    return (
                      <CustomSelect
                        data={data.brand.name}
                        setData={(val) =>
                          setData({
                            ...data,
                            brand: brands.data.find(({ name }) => name === val),
                          })
                        }
                        selectModalVisible={brandModalVisible}
                        setSelectModalVisible={() =>
                          setBrandModalVisible(!brandModalVisible)
                        }
                        options={brands.data}
                      />
                    );
                  // return <Select options={brands.data} value={""} />;
                  case "catalog_product":
                    return <FormCategory data={data} setData={setData} />;
                  case "characteristics":
                    return (
                      <Characteristics
                        data={data}
                        setData={setData}
                        characteristics={data.characteristics}
                      />
                    );
                  case "variations":
                    return (
                      <Characteristics
                        data={data}
                        setData={setData}
                        variations={data.variations}
                      />
                    );
                  case "images":
                    return <FormImages data={data} setData={setData} />;
                  case "id":
                    return null;
                  case "sub_catalog_product":
                    return null;
                  case "description":
                    return (
                      <Textarea
                        value={data.description}
                        onChange={(e) =>
                          setData({ ...data, description: e.target.value })
                        }
                        className={styles.description}
                      />
                    );
                  case "tags":
                    return <TagsInput data={data} setData={setData} />;
                  case "order_type":
                    return (
                      <CustomSelect
                        data={data.order_type}
                        setData={(val) => setData({ ...data, order_type: val })}
                        selectModalVisible={orderModalVisible}
                        setSelectModalVisible={() => {
                          setOrderModalVisible(!orderModalVisible);
                          setDeliveryModalVisible(false);
                        }}
                        options={paymentOptions}
                      />
                    );
                  case "delivery_type":
                    return (
                      <CustomSelect
                        data={data.delivery_type}
                        setData={(val) =>
                          setData({ ...data, delivery_type: val })
                        }
                        selectModalVisible={deliveryModalVisible}
                        setSelectModalVisible={() => {
                          setDeliveryModalVisible(!deliveryModalVisible);
                          setOrderModalVisible(false);
                        }}
                        options={deliveryOptions}
                      />
                    );
                  case "total":
                    return (
                      <div className={styles.total}>
                        <Typography className={styles.totalTypography}>
                          Итого:
                        </Typography>
                        <Typography className={styles.totalTypography}>
                          {priceRu(data.total)}
                        </Typography>
                      </div>
                    );
                  case "warehouse":
                    return null;
                  case "isViewedByAdmin":
                    return null;
                  case "isPayed":
                    return null;
                  case "isRetailAllowed":
                    return null;
                  case "protocol_category":
                    return (
                      <Input value={data.protocol_category.name} disabled />
                    );
                  case "products":
                    return <FormList data={data} setData={setData} />;
                  default:
                    return (
                      <Input
                        value={data[key as keyof IProductMock] as string}
                        onChange={(e) =>
                          setData({
                            ...data,
                            [key as keyof IProductMock]: e.target.value,
                          })
                        }
                      />
                    );
                }
              })()}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Form;
