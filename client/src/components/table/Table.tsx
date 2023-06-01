import React, { memo, useMemo } from "react";
import { useEffect } from "react";
import classNames from "classnames";
import { useLocation } from "react-router-dom";
import { Row, useColumnOrder, usePagination, useTable } from "react-table";
import { useBlockLayout } from "react-table";
import { useGlobalFilter } from "react-table";

import {
  CLIENTS_ROUTE,
  ORDERS_ROUTE,
  PRODUCTS_ROUTE,
} from "../../helpers/consts";
import { useColumns } from "../../hooks/useColumns";

import { GlobalFilter } from "./filter/Filter";
import { NoRows } from "./noRows/NoRows";
import Paginator from "./pagination/Paginator";
import { TableProps } from "./Table.props";

import styles from "./Table.module.css";

function Table({
  data,
  setModalVisible,
  setActiveElement,
  setAlertVisible,
  selectedItems,
  setSelectedItems,
}: TableProps): JSX.Element {
  const { pathname } = useLocation();

  const productsData = useMemo(() => data?.length && [...data], [data]);
  const productsColumns = useColumns(data, pathname);

  const {
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setColumnOrder,
    state,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns: productsColumns as any,
      data: productsData,
      initialState: {
        pageSize: 10,
      },
    },
    useColumnOrder,
    useBlockLayout,
    useGlobalFilter,
    usePagination
  );

  useEffect(() => {
    pathname === CLIENTS_ROUTE &&
      setColumnOrder(["fullName", "email", "phone"]);
    pathname === PRODUCTS_ROUTE && setColumnOrder(["name", "codeFrom1C"]);
    pathname === ORDERS_ROUTE &&
      setColumnOrder([
        "customer",
        "order_number",
        "delivery_type",
        "date",
        "total",
        "isPayed",
      ]);
  }, []);

  const selectItem = (row: Row): void => {
    let modifiedItems = [];
    row.values.checked = !row.values.checked;
    if (!row.values.checked) {
      const filteredItems = selectedItems.filter(
        (item: Row) => item.values.checked
      );
      modifiedItems = filteredItems;
      setSelectedItems(modifiedItems);
    } else {
      modifiedItems = [...selectedItems, row];
      setSelectedItems(modifiedItems);
    }
    modifiedItems.length ? setAlertVisible(true) : setAlertVisible(false);
  };
  const selectAll = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const filteredItems = page.map((row) => {
      row.values.checked = e.target.checked;
      return row;
    });
    if (e.target.checked) {
      setSelectedItems(filteredItems);
      setAlertVisible(true);
    } else {
      setSelectedItems([]);
      setAlertVisible(false);
    }
  };

  const handleClick = (row: Row): void => {
    if (pathname !== CLIENTS_ROUTE) {
      setActiveElement(row.original);
      setModalVisible(true);
    }
  };

  return (
    <div className={styles.wrapper}>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <Paginator
        gotoPage={gotoPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageCount={pageCount}
        nextPage={nextPage}
        previousPage={previousPage}
        setPageSize={setPageSize}
        pageIndex={state.pageIndex}
        pageSize={state.pageSize}
      />
      {page.length ? (
        <table className={classNames(styles.table)}>
          <thead className={styles.tableHead}>
            {headerGroups.map((headerGroup, index) => (
              // eslint-disable-next-line react/jsx-key
              <tr {...headerGroup.getHeaderGroupProps()}>
                {pathname === PRODUCTS_ROUTE && (
                  <th>
                    <input
                      className={styles.chkBox}
                      type="checkbox"
                      onChange={selectAll}
                      checked={selectedItems.length === page.length}
                    />
                  </th>
                )}
                {headerGroup.headers.map((column) => (
                  // eslint-disable-next-line react/jsx-key
                  <th
                    {...column.getHeaderProps({
                      style: { width: column.width },
                    })}
                    scope="col"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className={styles.tableBody} {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                // eslint-disable-next-line react/jsx-key
                <tr {...row.getRowProps()} onClick={() => handleClick(row)}>
                  {pathname === PRODUCTS_ROUTE && (
                    <th onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        className={styles.chkBox}
                        checked={row.values.checked}
                        onChange={() => selectItem(row)}
                      />
                    </th>
                  )}
                  {/* {...renderActions} */}
                  {row.cells.map((cell) => {
                    return (
                      // eslint-disable-next-line react/jsx-key
                      <td
                        {...cell.getCellProps({
                          style: {
                            width: cell.column.width,
                          },
                        })}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <NoRows pathname={pathname} />
      )}
    </div>
  );
}

export default memo(Table);
