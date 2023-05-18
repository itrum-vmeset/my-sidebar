import { memo } from "react";

import { Button } from "../../UI/button/Button";
import { Input } from "../../UI/input/Input";

import { TableFormProps } from "./TableForm.props";

import styles from "./TableForm.module.css";

function TableForm({ addItem, item, setItem }: TableFormProps): JSX.Element {
  return (
    <div className={styles.tableForm}>
      {Object.entries(item).map(([key, value]) => (
        <Input
          key={key}
          className={styles.input}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setItem({ ...item, [key]: e.target.value })
          }
        />
      ))}
      <Button className={styles.btn} appearance="filled" onClick={addItem}>
        Добавить город
      </Button>
    </div>
  );
}

export default memo(TableForm);
