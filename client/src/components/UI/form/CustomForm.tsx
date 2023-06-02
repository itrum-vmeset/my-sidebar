import { useEffect, useState } from "react";
import classNames from "classnames";
import { Controller, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { BannerSchema, IFormData } from "../../../pages/banners/config";
import { Typography } from "../typography/Typography";

import Controls from "./controls/Controls";
import { CustomFormProps } from "./CustomFormProps";

import styles from "./Form.module.css";

function CustomForm({
  activeElement,
  modalVisible,
  setFormVisible,
  formData,
  updateItem,
  removeItem,
  brands,
  cities,
  validationSchema,
}: CustomFormProps): JSX.Element {
  const [customModalVisible, setCustomModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [subCategoryModalVisible, setSubCategoryModalVisible] = useState(false);
  const [orderModalVisible, setOrderModalVisible] = useState(false);
  const [deliveryModalVisible, setDeliveryModalVisible] = useState(false);
  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
    getValues,
    setValue,
  } = useForm({
    defaultValues: activeElement,
    resolver: yupResolver(validationSchema),
  });
  const saveEdit = (data: any): void => {
    data && updateItem(data);
  };
  const onRemove = (): void => {
    removeItem(activeElement);
    setFormVisible(false);
  };

  useEffect(() => {
    reset(activeElement);
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
    <div
      className={styles.formWrapper}
      onClick={() => {
        setCategoryModalVisible(false);
        setSubCategoryModalVisible(false);
        setOrderModalVisible(false);
        setDeliveryModalVisible(false);
        setCustomModalVisible(false);
      }}
    >
      <Controls
        saveEdit={handleSubmit(saveEdit)}
        setModalVisible={setFormVisible}
        deleteItem={onRemove}
      />
      <form onSubmit={(e) => e.preventDefault()}>
        <div className={classNames(styles.formInpts, styles.noScroll)}>
          {formData.map(
            ({ id, title, Component, componentProps }: IFormData) => (
              <div key={id}>
                <Typography>
                  {title}{" "}
                  {errors[componentProps.name] ? (
                    <span className={styles.errorText}>
                      {errors[componentProps.name]?.message as string}
                    </span>
                  ) : null}
                </Typography>
                <Controller
                  control={control}
                  name={componentProps.name}
                  render={({ field }) => {
                    return (
                      <Component
                        value={field.value ? field.value : ""}
                        onChange={field.onChange ? field.onChange : null}
                        name={componentProps.name}
                        getall={getValues()}
                        setValue={setValue}
                        customModalVisible={customModalVisible}
                        setCustomModalVisible={setCustomModalVisible}
                        categoryModalVisible={categoryModalVisible}
                        setCategoryModalVisible={setCategoryModalVisible}
                        subCategoryModalVisible={subCategoryModalVisible}
                        setSubCategoryModalVisible={setSubCategoryModalVisible}
                        // orderModalVisible={orderModalVisible}
                        // setOrderModalVisible={setOrderModalVisible}
                        // deliveryModalVisible={deliveryModalVisible}
                        // setDeliveryModalVisible={setDeliveryModalVisible}
                        options={
                          componentProps.options ? componentProps.options : []
                        }
                        className={
                          errors[componentProps.name] ? styles.error : ""
                        }
                      />
                    );
                  }}
                />
              </div>
            )
          )}
        </div>
      </form>
    </div>
  );
}

export default CustomForm;
