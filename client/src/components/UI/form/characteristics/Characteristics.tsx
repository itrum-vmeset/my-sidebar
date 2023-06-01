import { useEffect } from "react";

import { Button } from "../../button/Button";
import { Typography } from "../../typography/Typography";
import FormRow from "../formRow/FormRow";

import { CharacteristicsProps } from "./Characteristics.props";

import styles from "./Characteristics.module.css";

function Characteristics({
  data,
  setData,
  characteristics,
  variations,
}: CharacteristicsProps): JSX.Element {
  const addCharacteristics = (): void => {
    if (characteristics) {
      if (data.characteristics.length < 16) {
        setData({
          ...data,
          characteristics: [
            ...data.characteristics,
            { id: Date.now(), key: "", value: "" },
          ],
        });
      } else {
        alert("Максимум 15 харакеристик");
      }
    } else {
      setData({
        ...data,
        variations: [
          ...data.variations,
          { id: Date.now(), value: "", code: "" },
        ],
      });
    }
  };
  const removeCharacteristics = (id: number): void => {
    if (characteristics) {
      setData({
        ...data,
        characteristics: data.characteristics.filter((el) => el.id !== id),
      });
    } else {
      setData({
        ...data,
        variations: data.variations.filter((el) => el.id !== id),
      });
    }
  };
  const changeCharacteristics = (
    id: number,
    key: string,
    value: string
  ): void => {
    if (characteristics) {
      setData({
        ...data,
        characteristics: data.characteristics.map((i) =>
          i.id === id ? { ...i, [key]: value } : i
        ),
      });
    } else {
      setData({
        ...data,
        variations: data.variations.map((i) =>
          i.id === id ? { ...i, [key]: value } : i
        ),
      });
    }
  };

  useEffect(() => {
    if (data) {
      if (!data.variations?.length) {
        setData({
          ...data,
          variations: [
            {
              id: Date.now(),
              value: "",
              code: "",
            },
          ],
        });
      }
      if (!data.characteristics?.length) {
        setData({
          ...data,
          characteristics: [
            {
              id: Date.now(),
              key: "",
              value: "",
            },
          ],
        });
      }
    }
  }, []);

  return (
    <div>
      <Typography>{characteristics ? "Характеристики" : "Объем*"}</Typography>
      {characteristics
        ? data?.characteristics?.map((item) => {
            return (
              <FormRow
                key={item.id}
                item={item}
                changeRow={changeCharacteristics}
                removeRow={removeCharacteristics}
              />
            );
          })
        : data?.variations?.map((item) => {
            return (
              <FormRow
                key={item.id}
                item={item}
                changeRow={changeCharacteristics}
                removeRow={removeCharacteristics}
              />
            );
          })}
      {characteristics ? (
        <Typography sizer="s">Максимум 15 харакеристик</Typography>
      ) : null}
      <Button className={styles.formButton} onClick={addCharacteristics}>
        {characteristics ? "Добавить характеристику" : "Добавить объем"}
      </Button>
    </div>
  );
}

export default Characteristics;
