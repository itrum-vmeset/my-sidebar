import React, { useEffect, useState } from 'react'
import { selectOptions } from '../helpers/helpers';
import { getPageCount } from '../helpers/pages';
import { useFetching } from '../hooks/useFetching';
import { IParam } from '../models/IResponse';
import OrderService from '../service/OrderService';
import Content from './content/Content';

function Orders() {

  const [data, setData] = useState([])
  const [totalPages, setTotalPages] = useState(0);
  const [params, setParams] = useState<IParam>({
    page: 1,
    limit: 10
  })

  const [fetchProducts, isLoading, error] = useFetching(async () => {
    const response = await OrderService.getAll(params)
    setData(response.data);
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, params.limit));
  })

  useEffect(() => {
    fetchProducts()
  }, [params]);

  return (
    <div>
        {isLoading ? 
          <h1>идет загрузка</h1> 
          :
          <Content data={data} params={params} setParams={setParams} selectOptions={selectOptions} totalPages={totalPages} />
        }
    </div>
  )
}

export default Orders