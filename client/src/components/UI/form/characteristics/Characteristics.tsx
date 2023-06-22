import { useEffect } from "react";

import { Button } from "../../button/Button";
import { Typography } from "../../typography/Typography";
import FormRow from "../formRow/FormRow";

import { CharacteristicsProps } from "./Characteristics.props";

import styles from "./Characteristics.module.css";

function Characteristics({
  value,
  changeValue,
  name,
}: CharacteristicsProps): JSX.Element {
  const addCharacteristics = (): void => {
    if (name === "characteristics") {
      if (value.length < 16) {
        changeValue([
          ...value,
          { id: Date.now().toString(), key: "", value: "" },
        ]);
      } else {
        alert("Максимум 15 харакеристик");
      }
    } else {
      changeValue([
        ...value,
        { id: Date.now().toString(), value: "", code: "" },
      ]);
    }
  };
  const removeCharacteristics = (id: string): void => {
    changeValue(value.filter((el: any) => el.id !== id));
  };
  const changeCharacteristics = (newValue: Record<string, string>): void => {
    changeValue(
      value.map((el: any) => {
        if (el.id === newValue.id) {
          return newValue;
        }
        return el;
      })
    );
  };

  useEffect(() => {
    if (value?.length === 0) {
      name === "characteristics"
        ? changeValue([
            ...value,
            { id: Date.now().toString(), key: "", value: "" },
          ])
        : changeValue([
            ...value,
            { id: Date.now().toString(), value: "", code: "" },
          ]);
    }
  }, []);

  return (
    <div>
      <Typography>
        {name === "characteristics" ? "Характеристики" : "Объем*"}
      </Typography>
      {value?.length ? (
        value?.map((item: Record<string, string>) => {
          return (
            <FormRow
              key={item.id}
              item={item}
              changeRow={changeCharacteristics}
              removeRow={removeCharacteristics}
            />
          );
        })
      ) : (
        <></>
      )}
      {name === "characteristics" ? (
        <Typography sizer="s">Максимум 15 харакеристик</Typography>
      ) : null}
      <Button className={styles.formButton} onClick={addCharacteristics}>
        {name === "characteristics"
          ? "Добавить характеристику"
          : "Добавить объем"}
      </Button>
    </div>
  );
}

export default Characteristics;
