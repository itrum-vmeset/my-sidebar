import { useEffect, useMemo, useState } from "react";
import { useBlockLayout, useGlobalFilter, useTable } from "react-table";
import { usePagination } from "react-table";

import { withLayout } from "../../components/layout/Layout";
import { GlobalFilter } from "../../components/table/filter/Filter";
import Paginator from "../../components/table/pagination/Paginator";
import Table from "../../components/table/Table";
import Form from "../../components/UI/form/Form";
import MyModal from "../../components/UI/modal/MyModal";
import {
  deliveryOptions,
  IDelivery,
  paymentOptions,
} from "../../helpers/helpers";
import { IFormData } from "../../models/IFormData";
import { IOrder } from "../../models/IOrder";
import { orderAPI } from "../../service/OrderService";
import OrderStore from "../../store/mobxStore/promocodeStore/OrderStore";

import { columns, formData } from "./config";

function Orders(): JSX.Element {
  const [formVisible, setFormVisible] = useState(false);
  const [enrichedFormData, setEnrichedFormData] = useState<IFormData[]>([]);
  // const [activeElement, setActiveElement] = useState<IOrder>({
  //   id: "",
  //   order_type: "",
  //   total: 0,
  //   isViewedByAdmin: false,
  //   order_number: "",
  //   delivery_type: "",
  //   isPayed: false,
  //   user: {
  //     id: "",
  //     name: "",
  //     lastName: "",
  //     secondName: "",
  //     firmName: "",
  //     role: "",
  //   },
  //   warehouse: {
  //     city: "",
  //   },
  //   date: "",
  // });
  // const [updateOrder] = orderAPI.useUpdateOrderMutation();
  // const [deleteOrder] = orderAPI.useDeleteOrderMutation();

  const { data } = orderAPI.useFetchAllOrdersQuery(null);

  const productsData = useMemo(
    () => (OrderStore.ordersM.length ? [...OrderStore.ordersM] : []),
    [OrderStore.ordersM]
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
    OrderStore.setActiveElementM({
      user: row.original.user,
      order_number: row.original.order_number,
      date: myDate,
      delivery_type: row.original.delivery_type,
      ...order,
    });
    setFormVisible(true);
  };

  const handleUpdateOrder = (order: IOrder): void => {
    const [day, month, year] = order.date.split(".");
    if (typeof order.user === "string") {
      OrderStore.activeElementM &&
        OrderStore.updateOrderM({
          ...order,
          user: {
            ...OrderStore.activeElementM.user,
            name: order.user as string,
            lastName: "",
            secondName: "",
            firmName: "",
          },
          date: day.concat(".", month, ".", year.slice(2)),
          delivery_type: (order.delivery_type as IDelivery).value,
        });
    } else {
      OrderStore.updateOrderM({
        ...order,
        date: day.concat(".", month, ".", year.slice(2)),
        delivery_type: (order.delivery_type as IDelivery).value,
      });
    }
  };

  useEffect(() => {
    const enriched = formData.map((item) => {
      if (item.componentProps.options === "payments") {
        return {
          ...item,
          componentProps: {
            ...item.componentProps,
            options: paymentOptions,
          },
        };
      }
      if (item.componentProps.options === "delivery") {
        return {
          ...item,
          componentProps: {
            ...item.componentProps,
            options: deliveryOptions,
          },
        };
      }
      return item;
    });
    setEnrichedFormData(enriched);
  }, []);

  useEffect(() => {
    OrderStore.fetchOrdersM();
  }, []);

  return (
    <div className="container">
      {formVisible && (
        <MyModal
          modalVisible={formVisible}
          setModalVisible={setFormVisible}
          setActiveElement={() => OrderStore.setActiveElementM(null)}
        >
          {OrderStore.activeElementM && (
            <Form
              modalVisible={formVisible}
              activeElement={OrderStore.activeElementM}
              setFormVisible={setFormVisible}
              formData={enrichedFormData}
              updateItem={handleUpdateOrder}
              removeItem={(order: IOrder) => OrderStore.deleteOrderM(order)}
            />
          )}
        </MyModal>
      )}
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
      <Table
        tableInstance={tableInstance}
        renderActions={() => {
          return [];
        }}
        handleClickRow={handleClickRow}
      />
    </div>
  );
}

export default withLayout(Orders);
