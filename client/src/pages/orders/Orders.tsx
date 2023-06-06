import { useMemo, useState } from "react";
import {
  TableInstance,
  useBlockLayout,
  useGlobalFilter,
  useTable,
} from "react-table";
import { usePagination } from "react-table";

import { withLayout } from "../../components/layout/Layout";
import { GlobalFilter } from "../../components/table/filter/Filter";
import Paginator from "../../components/table/pagination/Paginator";
import TableComponent from "../../components/table/TableComponent";
import Form from "../../components/UI/form/Form";
import MyModal from "../../components/UI/modal/MyModal";
import { orderAPI } from "../../service/OrderService";

import { columns } from "./config";

function Orders(): JSX.Element {
  const [formVisible, setFormVisible] = useState(false);
  const [activeElement, setActiveElement] = useState<any>({});
  const [updateOrder] = orderAPI.useUpdateOrderMutation();
  const [deleteOrder] = orderAPI.useDeleteOrderMutation();

  const { data } = orderAPI.useFetchAllOrdersQuery(null);

  const productsData = useMemo(
    () => (data?.data.length ? [...data.data] : []),
    [data]
  );

  const tableInstance = useTable(
    {
      columns: columns,
      data: productsData,
      initialState: {
        pageSize: 10,
      },
    },
    useBlockLayout,
    useGlobalFilter,
    usePagination
  );

  const {
    state,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = tableInstance;

  const handleClickRow = (row: any): void => {
    const [day, month, year] = row.original.date.split(".");
    const myDate = day.concat(".").concat(month).concat(".").concat("20", year);
    const order = { ...row.original, date: myDate };
    setActiveElement({
      user: row.original.user,
      order_number: row.original.order_number,
      date: myDate,
      delivery_type: row.original.delivery_type,
      ...order,
    });
    setFormVisible(true);
  };

  return (
    <div className="container">
      <MyModal
        modalVisible={formVisible}
        setModalVisible={setFormVisible}
        setActiveElement={setActiveElement}
      >
        <Form
          updateItem={updateOrder}
          removeItem={deleteOrder}
          modalVisible={formVisible}
          setModalVisible={setFormVisible}
          activeElement={activeElement}
        />
      </MyModal>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <Paginator
        gotoPage={gotoPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageCount={pageCount}
        nextPage={nextPage}
        previousPage={previousPage}
        setPageSize={setPageSize}
        pageIndex={state.pageIndex}
        pageSize={state.pageSize}
      />
      <TableComponent
        tableInstance={tableInstance}
        renderActions={() => {
          return [];
        }}
        // setSelectVisible={setSelectVisible}
        // selectedItems={selectedItems}
        // setSelectedItems={setSelectedItems}
        handleClickRow={handleClickRow}
      />
    </div>
  );
}

export default withLayout(Orders);
