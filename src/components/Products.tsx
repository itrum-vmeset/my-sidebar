import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Table from './table/Table';

function Products() {

    const [data, setData] = useState([])
  const [params, setParams] = useState({
    page: 1,
    limit: 10
  })

  const fetchProducts = async () => {
    const url = "https://jsonplaceholder.typicode.com/posts";
    const response = await axios.get(url, {
      params: {
        _page: params.page,
        _limit: params.limit,
      },
    });
    setData(response.data);
  };

  useEffect(() => {
    fetchProducts();
  }, [params]);

  return (
    <div>
        <Table data={data} params={params} setParams={setParams}  />
    </div>
  )
}

export default Products