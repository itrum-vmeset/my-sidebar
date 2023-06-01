import { useEffect } from "react";
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
  setFormVisible,
  formData,
  updateItem,
  removeItem,
  brands,
  cities,
}: CustomFormProps): JSX.Element {
  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: activeElement,
    resolver: yupResolver(BannerSchema),
  });
  const saveEdit = (data: any): void => {
    console.log(data);
    data && updateItem(data);
  };
  const onRemove = (): void => {
    removeItem(activeElement);
    setFormVisible(false);
  };

  useEffect(() => {
    reset(activeElement);
  }, [activeElement]);

  return (
    <div className={styles.formWrapper}>
      <form onSubmit={(e) => e.preventDefault()}>
        <Controls
          saveEdit={handleSubmit(saveEdit)}
          setModalVisible={setFormVisible}
          deleteItem={onRemove}
        />
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
                  render={({ field }) => (
                    <Component
                      value={field.value ? field.value : ""}
                      onChange={field.onChange ? field.onChange : null}
                      name={componentProps.name}
                      className={
                        errors[componentProps.name] ? styles.error : ""
                      }
                    />
                  )}
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
