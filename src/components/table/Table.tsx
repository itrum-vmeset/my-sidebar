import classNames from "classnames";
import React, { useMemo, useState } from "react";
import { useTable } from "react-table";
import MyAlert from "../alert/MyAlert";
import { Button } from "../button/Button";
import styles from "./Table.module.css";
import { ReactComponent as DeleteIcon } from "../../icons/del.svg";
import MyModal from "../modal/MyModal";
import Form from "../form/Form";
import { Select } from "../select/Select";

function Table({data, params, setParams, selectOptions}: any) {

  const [products, setProducts] = useState<any>([]);
  const [selectedRows, setSelected] = useState([]);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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
    // @ts-ignore
    columns: productsColumns,
    data: productsData,
  });

  const { getTableBodyProps, headerGroups, rows, prepareRow, state } =
    tableInstance;

  const selectItem = (row: any) => {
    let arrayka = []
    row.values.checked = !row.values.checked;
    if (!row.values.checked) {
      const filteredItems = selectedItems.filter((item) => item.values.checked);
      arrayka = filteredItems
      setSelectedItems(arrayka);
    } else {
      arrayka = [...selectedItems, row]
      setSelectedItems(arrayka);
    }
    arrayka.length ? setAlertVisible(true) : setAlertVisible(false);
  };

  const selectAll = (e: any) => {
    let arrayka = []
    const filteredItems = rows.map((row) => {
      row.values.checked = e.target.checked
      return row
    });
    arrayka = filteredItems
    if(e.target.checked) {
      setSelectedItems(arrayka)
      setAlertVisible(true)
    } else {
      setSelectedItems([])
      setAlertVisible(false)
    }
  };

  return (
    <div className={styles.wrapper}>
      <MyModal modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <Form />
      </MyModal>

      {/* PAGINATION COMPONENT */}

      <div className={styles.navi}>
        <span>Показывать</span>
        <Select value={params.limit}
          changeVal={(e: any) =>
            setParams({ ...params, limit: Number(e.target.value) })
          }
          options={selectOptions}
        />
        <span>Страница</span>
        <input
          className={classNames(styles.naviTool, styles.naviInput)}
          value={params.page}
          onChange={(e) =>
            setParams({ ...params, page: Number(e.target.value) })
          }
        />
        <span className={styles.pageCount}>из 1</span>
        <div className={styles.naviBtns}>
          <Button apearance="grey" arrow="left" />
          <Button apearance="grey" arrow="right" />
        </div>
      </div>
      <Button
        apearance="filled"
        arrow="none"
        className={styles.btnFullWidth}
        onClick={() => setModalVisible(true)}
      >
        Добавить акцию
      </Button>

      {/* TABLE COMPONENT */}

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
