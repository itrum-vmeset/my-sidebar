import React, { memo, useMemo } from "react";
import { useEffect } from "react";
import classNames from "classnames";
import { useLocation } from "react-router-dom";
import { Row, useColumnOrder, useTable } from "react-table";

import { CLIENTS_ROUTE } from "../../helpers/consts";
import { useColumns } from "../../hooks/useColumns";
import Loader from "../UI/loader/Loader";

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

  const productsData = useMemo(() => [...data], [data]);
  const productsColumns = useColumns(data, pathname);

  const { getTableBodyProps, headerGroups, rows, prepareRow, setColumnOrder } =
    useTable(
      {
        columns: productsColumns as any,
        data: productsData,
      },
      useColumnOrder
    );

  useEffect(() => {
    pathname === CLIENTS_ROUTE &&
      setColumnOrder(["fullName", "email", "phone"]);
  }, []);

  // const { getTableBodyProps, headerGroups, rows, prepareRow, setColumnOrder } = tableInstance;

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
    const filteredItems = rows.map((row) => {
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
    setActiveElement(row.cells);
    setModalVisible(true);
  };

  if (!rows.length) {
    return <Loader />;
  }

  return (
    <div className={styles.wrapper}>
      {rows.length ? (
        <table
          className={classNames(styles.table, {
            [styles.noScroll]: location.pathname === CLIENTS_ROUTE,
          })}
        >
          <thead className={styles.tableHead}>
            {headerGroups.map((headerGroup) => (
              // eslint-disable-next-line react/jsx-key
              <tr {...headerGroup.getHeaderGroupProps()}>
                {pathname !== CLIENTS_ROUTE && (
                  <th>
                    <input
                      className={styles.chkBox}
                      type="checkbox"
                      onChange={selectAll}
                      checked={selectedItems.length === rows.length}
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
            {rows.map((row) => {
              prepareRow(row);
              return (
                // eslint-disable-next-line react/jsx-key
                <tr {...row.getRowProps()} onClick={() => handleClick(row)}>
                  {pathname !== CLIENTS_ROUTE && (
                    <th onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        className={styles.chkBox}
                        checked={row.values.checked}
                        onChange={() => selectItem(row)}
                      />
                    </th>
                  )}
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
        <div className={styles.noGoods}>Здесь пока нет товаров</div>
      )}
    </div>
  );
}

export default memo(Table);
