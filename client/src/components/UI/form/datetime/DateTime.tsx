import { useState } from "react";

import { Input } from "../../input/Input";
import { Typography } from "../../typography/Typography";

import { DateTimeProps } from "./DateTime.props";

import styles from "./DateTime.module.css";

function DateTime({ value, changeValue }: DateTimeProps): JSX.Element {
  const [date, setDate] = useState(
    value.split(" ")[0].split(".").reverse().join("-")
  );
  const [time, setTime] = useState(value.split(" ")[1]);

  return (
    <div className={styles.categorySection}>
      <div className={styles.categoryBlock}>
        <Typography>Дата*</Typography>
        <Input
          type="date"
          value={value.split(" ")[0].split(".").reverse().join("-")}
          onChange={(e) => {
            setDate(
              e.target.value.replaceAll("-", ".").split(".").reverse().join(".")
            );
            changeValue(
              "".concat(
                e.target.value
                  .replaceAll("-", ".")
                  .split(".")
                  .reverse()
                  .join("."),
                " ",
                time
              )
            );
          }}
        />
      </div>
      <div className={styles.categoryBlock}>
        <Typography>Время*</Typography>
        <Input
          type="time"
          value={value.split(" ")[1]}
          onChange={(e) => {
            setTime(e.target.value);
            changeValue(date.concat(" ", e.target.value));
          }}
        />
      </div>
    </div>
  );
}

export default DateTime;
