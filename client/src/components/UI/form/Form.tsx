import { useEffect, useState } from "react";
import classNames from "classnames";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { AnyObject, ObjectSchema } from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { IFormData } from "../../../models/IFormData";
import { Typography } from "../typography/Typography";

import Controls from "./controls/Controls";
import { FormProps } from "./FormProps";

import styles from "./Form.module.css";

function Form<
  S extends ObjectSchema<any, AnyObject, any, "">,
  T extends { [x: string]: any } | undefined
>({
  activeElement,
  modalVisible,
  setFormVisible,
  formData,
  updateItem,
  removeItem,
  validationSchema,
}: FormProps<S, T>): JSX.Element {
  const [customModalVisible, setCustomModalVisible] = useState({});
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [subCategoryModalVisible, setSubCategoryModalVisible] = useState(false);
  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
    getValues,
    setValue,
  } = useForm({
    defaultValues: activeElement,
    resolver: validationSchema ? yupResolver(validationSchema) : undefined,
  });
  const saveEdit = (data: T): void => {
    data && updateItem(data);
  };
  const onRemove = (): void => {
    activeElement && removeItem(activeElement);
    setFormVisible(false);
  };

  useEffect(() => {
    reset(activeElement);
  }, [activeElement]);

  useEffect(() => {
    if (!modalVisible) {
      setCustomModalVisible({});
      setCategoryModalVisible(false);
      setSubCategoryModalVisible(false);
    }
  }, [modalVisible]);

  return (
    <div
      className={styles.formWrapper}
      onClick={() => {
        setCategoryModalVisible(false);
        setSubCategoryModalVisible(false);
        setCustomModalVisible({});
      }}
    >
      <Controls
        saveEdit={handleSubmit(saveEdit as SubmitHandler<FieldValues>)}
        setModalVisible={setFormVisible}
        deleteItem={onRemove}
      />
      <div>
        <div className={classNames(styles.formInpts, styles.noScroll)}>
          {formData.map(
            ({ id, title, Component, componentProps }: IFormData) => (
              <div key={id}>
                <Typography>
                  {title}{" "}
                  {(errors as any)[componentProps.name] !== "variations" ? (
                    <span className={styles.errorText}>
                      {errors[componentProps.name]?.message as string}
                    </span>
                  ) : (
                    <span className={styles.errorText}>
                      необходимо добавить свойства
                    </span>
                  )}
                </Typography>
                <Controller
                  control={control}
                  name={componentProps.name}
                  render={({ field }) => {
                    return (
                      <Component
                        value={field.value ? field.value : ""}
                        changeValue={field.onChange ? field.onChange : null}
                        onChange={field.onChange ? field.onChange : null}
                        name={componentProps.name}
                        getall={getValues()}
                        setValue={setValue}
                        disabled={componentProps.disabled ? true : false}
                        customModalVisible={customModalVisible}
                        setCustomModalVisible={setCustomModalVisible}
                        categoryModalVisible={categoryModalVisible}
                        setCategoryModalVisible={setCategoryModalVisible}
                        subCategoryModalVisible={subCategoryModalVisible}
                        setSubCategoryModalVisible={setSubCategoryModalVisible}
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
      </div>
    </div>
  );
}

export default Form;
