import { useMemo } from "react";
import { useTable } from "react-table";
import { useBlockLayout } from "react-table";
import { useGlobalFilter } from "react-table";
import { usePagination } from "react-table";

import { GlobalFilter } from "../../components/table/filter/Filter";
import Paginator from "../../components/table/pagination/Paginator";
import Table from "../../components/table/Table";
import { clientAPI } from "../../services/ClientsService";

import { columns } from "./config";

function Clients(): JSX.Element {
  const { data } = clientAPI.useFetchAllClientsQuery(null);

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

  return (
    <div className="container" data-testid="clients-page">
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
      />
    </div>
  );
}

export default Clients;
