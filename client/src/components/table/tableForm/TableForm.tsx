import React from "react";
import classNames from "classnames";

import { Button } from "../../UI/button/Button";
import { Input } from "../../UI/input/Input";

import { TableFormProps } from "./TableForm.props";

import styles from "./TableForm.module.css";

function TableForm({
  addItem,
  item,
  setItem,
  buttonText,
}: TableFormProps): JSX.Element {
  return (
    <div className={styles.tableForm}>
      {Object.entries(item).map(([key, value]) => (
        <React.Fragment key={key}>
          <Input
            className={classNames(styles.input, {
              [styles.inputFile]: value.attach !== undefined,
            })}
            value={value.value}
            placeholder={value.placeholder}
            type={value.attach ? "file" : "text"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setItem({
                ...item,
                [key]: {
                  value: e.target.value,
                },
              })
            }
          />
          {value.attach}
        </React.Fragment>
      ))}
      <Button className={styles.btn} appearance="filled" onClick={addItem}>
        {buttonText}
      </Button>
    </div>
  );
}

export default TableForm;
