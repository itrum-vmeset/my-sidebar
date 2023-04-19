import React from "react";
import classNames from "classnames";

import { Button } from "../../UI/button/Button";
import { Select } from "../../UI/select/Select";

import { ReactComponent as ArrowIcon } from "./arrowRight.svg";
import { PaginationProps } from "./Pagination.props";

import styles from "./Pagination.module.css";

function Pagination({
  params,
  setParams,
  selectOptions,
  totalPages,
}: PaginationProps): JSX.Element {
  return (
    <div className={styles.pagination}>
      <span>Показывать</span>
      <Select
        value={params.limit.toString()}
        changeVal={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setParams({ ...params, limit: Number(e.target.value) })
        }
        options={selectOptions}
      />
      <span>Страница</span>
      <input
        className={classNames(styles.naviTool, styles.naviInput)}
        value={params.page}
        onChange={(e) => setParams({ ...params, page: Number(e.target.value) })}
      />
      <span className={styles.pageCount}>из {totalPages}</span>
      <div className={styles.btnsBlock}>
        <Button
          appearance="grey"
          arrow="left"
          onClick={() => setParams({ ...params, page: params.page - 1 })}
          disabled={params.page <= 1}
        >
          <ArrowIcon />
        </Button>
        <Button
          appearance="grey"
          onClick={() => setParams({ ...params, page: params.page + 1 })}
          disabled={params.page === totalPages}
        >
          <ArrowIcon />
        </Button>
      </div>
    </div>
  );
}

export default Pagination;
