import React, { useMemo, useState } from "react";
import { Row, useTable } from "react-table";
import MyAlert from "../alert/MyAlert";
import styles from "./Table.module.css";
import { ReactComponent as DeleteIcon } from "../../icons/del.svg";
import { TableProps } from "./Table.props";

function Table({data}: TableProps): JSX.Element {

  const [selectedItems, setSelectedItems] = useState<Row[]>([]);
  const [alertVisible, setAlertVisible] = useState(false);

  const productsData = useMemo(() => [...data], [data]);
  const productsColumns = useMemo(
    () =>
      data[0]
        ? Object.keys(data[0]).map((key) => {
            return { Header: key, accessor: key };
          })
        : [],
    [data]
  );

  const tableInstance = useTable({
    columns: productsColumns,
    data: productsData,
  });

  const { getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const selectItem = (row: Row<any>) => {
    let modifiedItems = []
    row.values.checked = !row.values.checked;
    if (!row.values.checked) {
      const filteredItems = selectedItems.filter((item) => item.values.checked);
      modifiedItems = filteredItems
      setSelectedItems(modifiedItems);
    } else {
      modifiedItems = [...selectedItems, row]
      setSelectedItems(modifiedItems);
    }
    modifiedItems.length ? setAlertVisible(true) : setAlertVisible(false);
  };

  const selectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    let modifiedItems = []
    const filteredItems = rows.map((row) => {
      row.values.checked = e.target.checked
      return row
    });
    modifiedItems = filteredItems
    if(e.target.checked) {
      setSelectedItems(modifiedItems)
      setAlertVisible(true)
    } else {
      setSelectedItems([])
      setAlertVisible(false)
    }
  }

  return (
    <div className={styles.wrapper}>
      {rows.length ? (
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                <th>
                  <input className={styles.chkBox} type="checkbox" onChange={selectAll} />
                </th>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} scope="col">
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
                <tr {...row.getRowProps()}>
                  <th>
                    <input
                      type="checkbox"
                      className={styles.chkBox}
                      checked={row.values.checked}
                      onChange={() => selectItem(row)}
                    />
                  </th>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()} onClick={() => console.log(row.id)}>{cell.render("Cell")}</td>
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
      <MyAlert alertVisible={alertVisible} setAlertVisible={setAlertVisible}>
        <div>
          Количество выбранных позиций:{" "}
          {selectedItems.length && selectedItems.length}
        </div>
        <div>
          <DeleteIcon style={{ marginRight: "10px" }} onClick={() => console.log(selectedItems)} />
          Удалить
        </div>
      </MyAlert>
    </div>
  );
}

export default Table;
