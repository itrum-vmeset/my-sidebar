import { useEffect, useState } from "react";
import classNames from "classnames";
import { useLocation } from "react-router-dom";

import { ReactComponent as AttachIcon } from "../../../assets/icons/attach.svg";
import {
  ORDERS_ROUTE,
  PROTOCOLS_ROUTE,
  SEMINARS_ROUTE,
} from "../../../helpers/consts";
import { deliveryOptions, paymentOptions } from "../../../helpers/helpers";
import { priceRu } from "../../../helpers/priceRu";
import { translator } from "../../../helpers/translator";
import { IProductMock } from "../../../models/IProductMockData";
import { Input } from "../input/Input";
import TagsInput from "../tagsInput/TagsInput";
import { Textarea } from "../textarea/Textarea";
import { Typography } from "../typography/Typography";

import FormCategory from "./category/FormCategory";
import Characteristics from "./characteristics/Characteristics";
import Controls from "./controls/Controls";
import CustomSelect from "./customSelect/CustomSelect";
import DateTime from "./datetime/DateTime";
import FormList from "./formList/FormList";
import FormImages from "./images/FormImages";
import ImgLinkRow from "./imgLinkRow/ImgLinkRow";

import styles from "./Form.module.css";

function Form({
  activeElement,
  modalVisible,
  setModalVisible,
  updateItem,
  removeItem,
  brands,
  cities,
}: any): JSX.Element {
  const [data, setData] = useState<any>();
  const [customModalVisible, setCustomModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [subCategoryModalVisible, setSubCategoryModalVisible] = useState(false);
  const [orderModalVisible, setOrderModalVisible] = useState(false);
  const [deliveryModalVisible, setDeliveryModalVisible] = useState(false);
  const [image, setImage] = useState("");
  const { pathname } = useLocation();

  const saveEdit = (): void => {
    data && updateItem(data);
  };
  const onRemove = (): void => {
    data && removeItem(data);
    setModalVisible(false);
  };

  useEffect(() => {
    if (activeElement) {
      setData(activeElement);
    }
  }, [activeElement]);

  useEffect(() => {
    if (!modalVisible) {
      setCustomModalVisible(false);
      setCategoryModalVisible(false);
      setSubCategoryModalVisible(false);
      setOrderModalVisible(false);
      setDeliveryModalVisible(false);
    }
  }, [modalVisible]);

  return (
    <div className={styles.formWrapper}>
      <Controls
        saveEdit={saveEdit}
        setModalVisible={setModalVisible}
        deleteItem={onRemove}
      />
      <div
        className={classNames(styles.formInpts, {
          [styles.noScroll]:
            pathname === ORDERS_ROUTE || pathname === PROTOCOLS_ROUTE,
        })}
      >
        {data &&
          Object.entries(data).map(([key, value], index) => (
            <div key={index}>
              <Typography>{translator(key, pathname)}</Typography>
              {(() => {
                switch (key) {
                  case "nameFrom1C":
                    return <Input value={data.nameFrom1C} disabled />;
                  case "brand":
                    return (
                      <CustomSelect
                        data={data?.brand?.name}
                        setData={(val) =>
                          setData({
                            ...data,
                            brand:
                              brands &&
                              brands.data.find(({ name }: any) => name === val),
                          })
                        }
                        selectModalVisible={customModalVisible}
                        setSelectModalVisible={() => {
                          setCustomModalVisible(!customModalVisible);
                          setCategoryModalVisible(false);
                          setSubCategoryModalVisible(false);
                        }}
                        options={brands?.data?.length ? brands.data : []}
                      />
                    );
                  case "user":
                    return (
                      <Input
                        value={`${data.user.name} ${data.user.lastName}`}
                        onChange={(e) => {
                          setData({
                            ...data,
                            user: {
                              ...data.user,
                              name: e.target.value,
                            },
                          });
                        }}
                      />
                    );
                  case "catalog_product":
                    return (
                      <FormCategory
                        data={data}
                        setData={setData}
                        categoryModalVisible={categoryModalVisible}
                        setCategoryModalVisible={() => {
                          setCategoryModalVisible(!categoryModalVisible);
                          setSubCategoryModalVisible(false);
                          setCustomModalVisible(false);
                        }}
                        subCategoryModalVisible={subCategoryModalVisible}
                        setSubCategoryModalVisible={() => {
                          setSubCategoryModalVisible(!subCategoryModalVisible);
                          setCategoryModalVisible(false);
                          setCustomModalVisible(false);
                        }}
                      />
                    );
                  // case "characteristics":
                  //   return (
                  //     <Characteristics
                  //       data={data}
                  //       setData={setData}
                  //       characteristics={data.characteristics}
                  //     />
                  //   );
                  // case "variations":
                  //   return (
                  //     <Characteristics
                  //       data={data}
                  //       setData={setData}
                  //       variations={data.variations}
                  //     />
                  //   );
                  // case "images":
                  //   return <FormImages data={data} setData={setData} />;

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
                  // case "tags":
                  //   return <TagsInput data={data} setData={setData} />;
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

                  case "protocol_category":
                    return (
                      <Input
                        value={data.protocol_category.name}
                        // onChange={(e) =>
                        //   setData({
                        //     ...data,
                        //     protocol_category: {
                        //       ...data.protocol_category,
                        //       name: e.target.value,
                        //     },
                        //   })
                        // }
                        disabled
                      />
                    );
                  case "products":
                    return <FormList data={data} setData={setData} />;
                  case "city":
                    return (
                      <CustomSelect
                        data={data.city.name}
                        setData={(val) =>
                          setData({
                            ...data,
                            city:
                              cities &&
                              cities.data.find(({ name }: any) => name === val),
                          })
                        }
                        selectModalVisible={customModalVisible}
                        setSelectModalVisible={() =>
                          setCustomModalVisible(!customModalVisible)
                        }
                        options={cities?.data?.length ? cities.data : []}
                      />
                    );
                  case "datetime":
                    return <DateTime data={data} setData={setData} />;
                  case "date":
                    return (
                      <Input
                        type="date"
                        value={data.date.split(".").reverse().join("-")}
                        onChange={(e) => {
                          setData({
                            ...data,
                            date: e.target.value
                              .replaceAll("-", ".")
                              .split(".")
                              .reverse()
                              .join("."),
                          });
                        }}
                      />
                    );
                  case "image":
                    return (
                      <>
                        {data.image ? (
                          <ImgLinkRow
                            link={data.image}
                            removeLink={() =>
                              setData({
                                ...data,
                                image: "",
                              })
                            }
                          />
                        ) : (
                          <>
                            <Input
                              placeholder="Вставте ссылку на Google Drive"
                              value={image}
                              onChange={(e) => setImage(e.target.value)}
                              onKeyUp={(e) =>
                                e.key === "Enter"
                                  ? setData({ ...data, image: image })
                                  : null
                              }
                            />
                            <AttachIcon
                              className={styles.inputFile}
                              onClick={() => setData({ ...data, image: image })}
                            />
                          </>
                        )}
                        <Typography sizer="s">
                          {pathname === SEMINARS_ROUTE ? (
                            <>Размер фото 750x730 px PNG, JPG, JPEG</>
                          ) : (
                            <>Размер баннера 576x320 px PNG, JPG, JPEG</>
                          )}
                        </Typography>
                      </>
                    );
                  case "percent":
                    return (
                      <Input
                        value={
                          (data[key as keyof IProductMock] as string) + "%"
                        }
                        onChange={(e) =>
                          setData({
                            ...data,
                            [key as keyof IProductMock]: e.target.value.slice(
                              0,
                              -1
                            ),
                          })
                        }
                      />
                    );
                  case "mobileImage":
                  case "createdAt":
                  case "updatedAt":
                  case "promocode":
                  case "availableFor":
                  case "type":
                  case "warehouse":
                  case "isViewedByAdmin":
                  case "isPayed":
                  case "isRetailAllowed":
                  case "id":
                  case "sub_catalog_product":
                    return null;
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
