import React from "react";
import { TableInstance } from "react-table";

import { selectOptions } from "../../../helpers/helpers";
import { Button } from "../../UI/button/Button";
import { Input } from "../../UI/input/Input";
import { Select } from "../../UI/select/Select";

import { ReactComponent as ArrowIcon } from "./arrowRight.svg";

import styles from "./Paginator.module.css";

type PaginatorProps = Pick<
  TableInstance<any>,
  | "gotoPage"
  | "previousPage"
  | "nextPage"
  | "canPreviousPage"
  | "canNextPage"
  | "pageCount"
  | "pageIndex"
  | "pageSize"
  | "setPageSize"
>;

export default function Paginator(props: PaginatorProps): JSX.Element {
  const gotoPage: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const page = e.target.value ? Number(e.target.value) - 1 : 0;
    props.gotoPage(page);
  };
  const setPageSize: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const size = Number(e.target.value);
    props.setPageSize(size);
  };

  return (
    <div className={styles.pagination}>
      <label>Показывать</label>
      <Select
        value={props.pageSize}
        onChange={setPageSize}
        options={selectOptions}
        className={styles.naviSelect}
      />
      <label>Страница</label>
      <Input
        className={styles.naviInput}
        value={props.pageIndex + 1}
        onChange={gotoPage}
      />
      <span className={styles.pageCount}>из {props.pageCount}</span>
      <div className={styles.btnsBlock}>
        <Button
          appearance="grey"
          arrow="left"
          onClick={props.previousPage}
          disabled={!props.canPreviousPage}
        >
          <ArrowIcon />
        </Button>
        <Button
          appearance="grey"
          onClick={props.nextPage}
          disabled={!props.canNextPage}
        >
          <ArrowIcon />
        </Button>
      </div>
    </div>
  );
}
