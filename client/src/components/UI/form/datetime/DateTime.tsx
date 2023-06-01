import { useState } from "react";

import { Input } from "../../input/Input";
import { Typography } from "../../typography/Typography";

import { DateTimeProps } from "./DateTime.props";

import styles from "./DateTime.module.css";

function DateTime({ data, setData }: DateTimeProps): JSX.Element {
  const [date, setDate] = useState(
    data.datetime.split(" ")[0].split(".").reverse().join("-")
  );
  const [time, setTime] = useState(data.datetime.split(" ")[1]);

  return (
    <div className={styles.categorySection}>
      <div className={styles.categoryBlock}>
        <Typography>Дата*</Typography>
        <Input
          type="date"
          value={data.datetime.split(" ")[0].split(".").reverse().join("-")}
          onChange={(e) => {
            setDate(
              e.target.value.replaceAll("-", ".").split(".").reverse().join(".")
            );
            setData({
              ...data,
              datetime: "".concat(
                e.target.value
                  .replaceAll("-", ".")
                  .split(".")
                  .reverse()
                  .join("."),
                " ",
                time
              ),
            });
          }}
        />
      </div>
      <div className={styles.categoryBlock}>
        <Typography>Время*</Typography>
        <Input
          type="time"
          value={data.datetime.split(" ")[1]}
          onChange={(e) => {
            setTime(e.target.value);
            setData({
              ...data,
              datetime: date.concat(" ", e.target.value),
            });
          }}
        />
      </div>
    </div>
  );
}

export default DateTime;
