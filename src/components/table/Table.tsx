import React, { useMemo, useState } from "react";
import { Row, useTable } from "react-table";

import { ReactComponent as DeleteIcon } from "../../icons/del.svg";
import MyAlert from "../alert/MyAlert";
import Form from "../UI/form/Form";
import MyModal from "../UI/modal/MyModal";

import { TableProps } from "./Table.props";

import styles from "./Table.module.css";

function Table({
  data,
  removeProduct,
  addProduct,
  modalVisible,
  setModalVisible,
}: TableProps): JSX.Element {
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

  const { getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  const selectItem = (row: Row<any>): void => {
    let modifiedItems = [];
    row.values.checked = !row.values.checked;
    if (!row.values.checked) {
      const filteredItems = selectedItems.filter((item) => item.values.checked);
      modifiedItems = filteredItems;
      setSelectedItems(modifiedItems);
    } else {
      modifiedItems = [...selectedItems, row];
      setSelectedItems(modifiedItems);
    }
    modifiedItems.length ? setAlertVisible(true) : setAlertVisible(false);
  };

  const selectAll = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let modifiedItems = [];
    const filteredItems = rows.map((row) => {
      row.values.checked = e.target.checked;
      return row;
    });
    modifiedItems = filteredItems;
    if (e.target.checked) {
      setSelectedItems(modifiedItems);
      setAlertVisible(true);
    } else {
      setSelectedItems([]);
      setAlertVisible(false);
    }
  };

  const deleteItems = (): void => {
    const selectedId = selectedItems.map((item: any) => item.original.id);
    removeProduct(selectedId);
    setSelectedItems([]);
    setAlertVisible(false);
  };

  return (
    <div className={styles.wrapper}>
      <MyModal modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <Form
          addProduct={addProduct}
          setModalVisible={setModalVisible}
          headers={headerGroups}
        />
      </MyModal>
      {rows.length ? (
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            {headerGroups.map((headerGroup) => (
              // eslint-disable-next-line react/jsx-key
              <tr {...headerGroup.getHeaderGroupProps()}>
                <th>
                  <input
                    className={styles.chkBox}
                    type="checkbox"
                    onChange={selectAll}
                    checked={selectedItems.length === rows.length}
                  />
                </th>
                {headerGroup.headers.map((column) => (
                  // eslint-disable-next-line react/jsx-key
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
                // eslint-disable-next-line react/jsx-key
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
                      // eslint-disable-next-line react/jsx-key
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
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
      <MyAlert
        alertVisible={alertVisible}
        setAlertVisible={setAlertVisible}
        removeProduct={removeProduct}
      >
        <div>
          Количество выбранных позиций:{" "}
          {selectedItems.length && selectedItems.length}
        </div>
        <div onClick={deleteItems} style={{ cursor: "pointer" }}>
          <DeleteIcon style={{ marginRight: "10px" }} />
          Удалить
        </div>
      </MyAlert>
    </div>
  );
}

export default Table;
