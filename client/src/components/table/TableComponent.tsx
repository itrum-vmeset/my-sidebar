import React, { memo, useMemo } from "react";
import classNames from "classnames";
import { useLocation } from "react-router-dom";
import { Row, usePagination, useTable } from "react-table";
import { useBlockLayout } from "react-table";
import { useGlobalFilter } from "react-table";

import { CITIES_ROUTE, CLIENTS_ROUTE } from "../../helpers/consts";

import { GlobalFilter } from "./filter/Filter";
import { NoRows } from "./noRows/NoRows";
import Paginator from "./pagination/Paginator";
import { TableComponentProps } from "./TableComponent.props";

import styles from "./TableComponent.module.css";

function TableComponent({
  data,
  setModalVisible,
  setActiveElement,
  setAlertVisible,
  selectedItems,
  setSelectedItems,
  columns,
  // children,
}: TableComponentProps): JSX.Element {
  const { pathname } = useLocation();

  const productsData = useMemo(() => (data?.length ? [...data] : []), [data]);

  const {
    getTableBodyProps,
    headerGroups,
    prepareRow,
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
      columns,
      data: productsData,
      initialState: {
        pageSize: 10,
      },
    },
    useBlockLayout,
    useGlobalFilter,
    usePagination
  );

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
    if (pathname === CLIENTS_ROUTE || pathname === CITIES_ROUTE) {
      /* empty */
    } else {
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
            {headerGroups.map((headerGroup) => (
              // eslint-disable-next-line react/jsx-key
              <tr {...headerGroup.getHeaderGroupProps()}>
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

export default memo(TableComponent);
