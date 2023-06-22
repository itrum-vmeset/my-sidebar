import { useState } from "react";
import { useAsyncDebounce } from "react-table";

import { ReactComponent as CloseIcon } from "../../../assets/icons/close.svg";
import { ReactComponent as SearchIcon } from "../../../assets/icons/search.svg";
import { Input } from "../../UI/input/Input";

import styles from "./Filter.module.css";

export const GlobalFilter = ({
  globalFilter,
  setGlobalFilter,
}: any): JSX.Element => {
  const [value, setValue] = useState(globalFilter as string);
  // const onChange = useAsyncDebounce((val) => {
  //   setGlobalFilter?.(value || null);
  // }, 250);

  return (
    <div className={styles.search}>
      <SearchIcon className={styles.searchIcon} />
      <div
        className={styles.closeIconWrapper}
        // onClick={() => {
        //   setValue("");
        //   onChange("");
        // }}
      >
        <CloseIcon className={styles.closeIcon} />
      </div>
      <Input
        placeholder="Поиск"
        className={styles.searchInput}
        type="text"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          // onChange(e.target.value);
        }}
      />
    </div>
  );
};
