import { useEffect, useMemo, useState } from "react";
import { Row, useBlockLayout, useTable } from "react-table";
import { useGlobalFilter } from "react-table";
import { usePagination } from "react-table";

import { GlobalFilter } from "../../components/table/filter/Filter";
import Paginator from "../../components/table/pagination/Paginator";
import Table from "../../components/table/Table";
import MyAlert from "../../components/UI/alert/MyAlert";
import Form from "../../components/UI/form/Form";
import MyModal from "../../components/UI/modal/MyModal";
import { IFormData } from "../../models/IFormData";
import { IProductMock } from "../../models/IProductMockData";
import { brandAPI } from "../../services/BrandService";
import { productAPI } from "../../services/ProductService";

import { columns, formData, ProductSchema } from "./config";

function Products(): JSX.Element {
  const [selectedItems, setSelectedItems] = useState<Row[]>([]);
  const [selectVisible, setSelectVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [activeElement, setActiveElement] = useState<IProductMock>(
    {} as IProductMock
  );
  const [enrichedFormData, setEnrichedFormData] = useState<IFormData[]>([]);

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
    setActiveElement(row.original as IProductMock);
    setFormVisible(true);
  };

  const deleteItems = async (): Promise<void> => {
    for (const item of selectedItems) {
      await deleteProduct(item.original as IProductMock);
    }
    refetch();
    setSelectedItems([]);
    setSelectVisible(false);
  };

  useEffect(() => {
    const enriched = formData.map((item) => {
      if (item.componentProps.options === "brands") {
        return {
          ...item,
          componentProps: {
            ...item.componentProps,
            options: brands?.data,
          },
        };
      } else {
        return item;
      }
    });
    setEnrichedFormData(enriched);
  }, [brands]);

  return (
    <div className="container" data-testid="products-page">
      {formVisible && (
        <MyModal
          modalVisible={formVisible}
          setModalVisible={setFormVisible}
          setActiveElement={setActiveElement}
        >
          <Form
            modalVisible={formVisible}
            setFormVisible={setFormVisible}
            activeElement={activeElement}
            formData={enrichedFormData}
            validationSchema={ProductSchema}
            updateItem={updateProduct}
            removeItem={deleteProduct}
          />
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
      />
    </div>
  );
}

export default Products;
