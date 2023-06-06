import { useMemo, useState } from "react";
import { Row, useBlockLayout, useTable } from "react-table";
import { useGlobalFilter } from "react-table";
import { usePagination } from "react-table";

import { withLayout } from "../../components/layout/Layout";
import { GlobalFilter } from "../../components/table/filter/Filter";
import Paginator from "../../components/table/pagination/Paginator";
import TableComponent from "../../components/table/TableComponent";
import MyAlert from "../../components/UI/alert/MyAlert";
import Form from "../../components/UI/form/Form";
import MyModal from "../../components/UI/modal/MyModal";
import { brandAPI } from "../../service/BrandService";
import { productAPI } from "../../service/ProductService";

import { columns } from "./config";

function Products(): JSX.Element {
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [selectVisible, setSelectVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [activeElement, setActiveElement] = useState<any>({});

  const [updateProduct] = productAPI.useUpdateProductMutation();
  const [deleteProduct] = productAPI.useDeleteProductMutation();
  const { data, refetch } = productAPI.useFetchAllProductsQuery(null);
  const { data: brands } = brandAPI.useFetchAllBrandsQuery(null);

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

  const handleClickRow = (row: Row): void => {
    setActiveElement(row.original);
    setFormVisible(true);
  };

  const deleteItems = async () => {
    for (const item of selectedItems) {
      await deleteProduct(item.original);
    }
    refetch();
    setSelectedItems([]);
    setSelectVisible(false);
  };

  return (
    <div className="container">
      <MyModal
        modalVisible={formVisible}
        setModalVisible={setFormVisible}
        setActiveElement={setActiveElement}
      >
        <Form
          updateItem={updateProduct}
          removeItem={deleteProduct}
          modalVisible={formVisible}
          setModalVisible={setFormVisible}
          activeElement={activeElement}
          brands={brands}
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
        checkBox={true}
        setSelectVisible={setSelectVisible}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        handleClickRow={handleClickRow}
      />
      <MyAlert
        alertVisible={selectVisible}
        setAlertVisible={setSelectVisible}
        deleteItems={deleteItems}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        refetch={refetch}
      />
    </div>
  );
}

export default withLayout(Products);
