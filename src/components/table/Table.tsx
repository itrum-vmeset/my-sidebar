import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import { Button } from "../button/Button";
import styles from "./Table.module.css";

function Table() {
  
  const [products, setProducts] = useState([]);
  const [params, setParams] = useState({
    page: 1,
    limit: 10
  })

  const fetchProducts = async () => {
    const url = "https://jsonplaceholder.typicode.com/posts";
    // const response = await axios.get(uri);
    const response = await axios.get(url, {params: {
      _page: params.page, _limit: params.limit
    }});
    setProducts(response.data);
  };

  // const fetchData = async () => {
  //   const url = "https://jsonplaceholder.typicode.com/users";
  //   const response = await axios.get(url, {params: {
  //     _page: params.page, _limit: params.limit
  //   }});

  //   setData(response.data);
  // };

  const productsData = useMemo(() => [...products], [products]);

  const productsColumns = useMemo(
    () =>
      products[0]
        ? Object.keys(products[0]).map((key) => {
              return { Header: key, accessor: key };
            })
        : [],
    [products]
  );

  const tableInstance = useTable(
    {
      // @ts-ignore
      columns: productsColumns,
      data: productsData,
    },
  );

  const {
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
  } = tableInstance;

  useEffect(() => {
    fetchProducts();
  }, [params])

  return (
    <div>
      <div className={styles.navi}>
          <span>Показывать</span>
          <select defaultValue={params.limit} onChange={e => setParams({...params, limit: Number(e.target.value)})} name="select">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
          </select>
          <span>Страница</span>
          <input value={params.page} onChange={(e) => setParams({...params, page: Number(e.target.value)})} />
      </div>
      <div><Button apearance='filled'>Добавить акцию</Button></div>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              <th>
                <input type="checkbox" className={styles.chb} />
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
                  <input type="checkbox" />
                </th>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table