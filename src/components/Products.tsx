import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Table from './table/Table'
import {selectOptions} from '../helpers/helpers'

function Products() {

  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(true);
  const [params, setParams] = useState({
    page: 1,
    limit: selectOptions[0].value
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
    setLoading(false);
  };

  useEffect(() => {
    
    fetchProducts();
  }, [params]);

  return (
    <div>
        {isLoading ? 
          <h1>идет загрузка</h1> 
          :
          <Table data={data} params={params} setParams={setParams} selectOptions={selectOptions} />
        }
    </div>
  )
}

export default Products