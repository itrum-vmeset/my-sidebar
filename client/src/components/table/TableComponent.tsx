/* eslint-disable prefer-const */
import React, { memo } from "react";
import classNames from "classnames";
import { useLocation } from "react-router-dom";
import { Row } from "react-table";

import { BRANDS_ROUTE } from "../../helpers/consts";

import { NoRows } from "./noRows/NoRows";
import { TableComponentProps } from "./TableComponent.props";

import styles from "./TableComponent.module.css";

function TableComponent({
  setSelectVisible,
  selectedItems,
  setSelectedItems,
  tableInstance,
  renderActions,
  checkBox,
  handleClickRow,
}: TableComponentProps): JSX.Element {
  const { pathname } = useLocation();

  let { getTableBodyProps, headerGroups, rows, prepareRow, page } =
    tableInstance;

  const selectItem = (row: Row): void => {
    let modifiedItems = [];
    row.values.checked = !row.values.checked;
    if (!row.values.checked) {
      const filteredItems =
        selectedItems &&
        selectedItems.filter((item: Row) => item.values.checked);
      modifiedItems = filteredItems as any;
      setSelectedItems && setSelectedItems(modifiedItems);
    } else {
      modifiedItems = selectedItems && ([...selectedItems, row] as any);
      setSelectedItems && setSelectedItems(modifiedItems);
    }
    modifiedItems.length
      ? setSelectVisible && setSelectVisible(true)
      : setSelectVisible && setSelectVisible(false);
  };
  const selectAll = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const filteredItems = page.map((row: any) => {
      row.values.checked = e.target.checked;
      return row;
    });
    if (e.target.checked) {
      setSelectedItems && setSelectedItems(filteredItems);
      setSelectVisible && setSelectVisible(true);
    } else {
      setSelectedItems && setSelectedItems([]);
      setSelectVisible && setSelectVisible(false);
    }
  };

  if (!page) {
    page = rows;
  }

  return (
    <div className={styles.wrapper}>
      {page?.length || rows.length ? (
        <table className={classNames(styles.table)}>
          <thead className={styles.tableHead}>
            {headerGroups.map((headerGroup: any) => (
              // eslint-disable-next-line react/jsx-key
              <tr {...headerGroup.getHeaderGroupProps()}>
                {checkBox && (
                  <th>
                    <input
                      className={styles.chkBox}
                      type="checkbox"
                      onChange={selectAll}
                      checked={
                        selectedItems && selectedItems.length === page.length
                      }
                    />
                  </th>
                )}
                {headerGroup.headers.map((column: any) => (
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
                {renderActions &&
                  renderActions().map((item: any, index: number) => (
                    <th key={index} style={{ width: item.width }}></th>
                  ))}
              </tr>
            ))}
          </thead>
          <tbody className={styles.tableBody} {...getTableBodyProps()}>
            {page.map((row: any) => {
              prepareRow(row);
              return (
                // eslint-disable-next-line react/jsx-key
                <tr
                  {...row.getRowProps()}
                  onClick={() => (handleClickRow ? handleClickRow(row) : null)}
                  className={classNames({
                    [styles.brandsTableRow]: BRANDS_ROUTE === pathname,
                    [styles.clickableRow]: handleClickRow,
                  })}
                >
                  {checkBox && (
                    <th onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        className={styles.chkBox}
                        checked={row.values.checked}
                        onChange={() => selectItem(row)}
                      />
                    </th>
                  )}
                  {row.cells.map((cell: any) => {
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
                  {renderActions &&
                    renderActions().map((item: any, index: number) => (
                      <td
                        key={index}
                        style={{ width: item.width }}
                        onClick={(e) => {
                          e.stopPropagation();
                          item.action(row.original);
                        }}
                      >
                        {item.component}
                      </td>
                    ))}
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
