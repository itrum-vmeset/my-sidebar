import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import Table from './components/table/Table';
import {menuItems} from './helpers/helpers'

function App() {
  const [data, setData] = useState([])
  const [params, setParams] = useState({
    page: 1,
    limit: 10
  })

  // const fetchData = async () => {
  //   const url = "https://jsonplaceholder.typicode.com/users";
  //   const response = await axios.get(url, {params: {
  //     _page: params.page, _limit: params.limit
  //   }});

  //   setData(response.data);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <div className="App">
      {/* <Sidebar menuItems={menuItems} /> */}
      <Table />
    </div>
  );
}

export default App;
