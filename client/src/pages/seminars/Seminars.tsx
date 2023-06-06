import { useEffect, useMemo, useState } from "react";
import { usePagination, useTable } from "react-table";
import { useBlockLayout } from "react-table";
import { useGlobalFilter } from "react-table";

import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import { ReactComponent as ShapeIcon } from "../../assets/icons/shape.svg";
import { withLayout } from "../../components/layout/Layout";
import { GlobalFilter } from "../../components/table/filter/Filter";
import Paginator from "../../components/table/pagination/Paginator";
import TableComponent from "../../components/table/TableComponent";
import MyAlert from "../../components/UI/alert/MyAlert";
import { Button } from "../../components/UI/button/Button";
import DeleteModal from "../../components/UI/deleteModal/DeleteModal";
import Form from "../../components/UI/form/Form";
import MyModal from "../../components/UI/modal/MyModal";
import { cityAPI } from "../../service/CityService";
import { seminarAPI } from "../../service/SeminarService";

import Navigator from "./Navigator/Navigator";
import {
  future,
  futureItem,
  history,
  historyItem,
  navItems,
  request,
} from "./config";

import styles from "./Seminars.module.css";

function Seminars(): JSX.Element {
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [selectVisible, setSelectVisible] = useState(false);
  const [columns, setColumns] = useState(future);
  const [modalVisible, setModalVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [activeRoute, setActiveRoute] = useState(navItems[0].value);
  const [activeElement, setActiveElement] = useState<any>({});
  const [deleteSeminar] = seminarAPI.useDeleteSeminarMutation();
  const [updateSeminar] = seminarAPI.useUpdateSeminarMutation();
  const [createSeminar] = seminarAPI.useCreateSeminarMutation();
  const { data, refetch } = seminarAPI.useFetchAllSeminarsQuery(activeRoute);
  const { data: cities } = cityAPI.useFetchAllCitiesQuery(null);

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
    if (activeRoute === "request") {
      return;
    }
    setActiveElement(row.original);
    setFormVisible(true);
  };

  const deleteItems = async () => {
    for (const item of selectedItems) {
      await deleteSeminar({ seminar: item.original, activeRoute });
    }
    refetch();
    setSelectedItems([]);
    setSelectVisible(false);
  };

  useEffect(() => {
    switch (activeRoute) {
      case "future":
        setColumns(future);
        setSelectVisible(false);
        setSelectedItems([]);
        break;
      case "history":
        setColumns(history);
        setSelectVisible(false);
        setSelectedItems([]);
        break;
      case "request":
        setColumns(request);
        setSelectVisible(false);
        setSelectedItems([]);
        break;
      default:
        break;
    }
  }, [activeRoute]);

  const renderActions = () => {
    if (activeRoute === "request") {
      return [];
    }
    if (activeRoute === "history") {
      return [
        {
          component: (
            <div className={styles.shapeIconWrapper}>
              <ShapeIcon key={55} />
              23
            </div>
          ),
          width: 80,
          action: (item: any) => {
            alert("не делай так больше");
          },
        },
        {
          component: (
            <div className="actionIconWrapper">
              <DeleteIcon key={33} />
            </div>
          ),
          width: 40,
          action: (item: any) => {
            setActiveElement(item);
            setModalVisible(true);
          },
        },
      ];
    }
    return [
      {
        component: (
          <div className="actionIconWrapper">
            <DeleteIcon key={33} />
          </div>
        ),
        width: 40,
        action: (item: any) => {
          setActiveElement(item);
          setModalVisible(true);
        },
      },
    ];
  };

  return (
    <div className="container">
      <DeleteModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        activeElement={activeElement}
        deleteItem={(seminar) => deleteSeminar({ seminar, activeRoute })}
        text={"семинар"}
      />

      <MyModal
        modalVisible={formVisible}
        setModalVisible={setFormVisible}
        setActiveElement={setActiveElement}
      >
        <Form
          updateItem={
            activeElement?.name
              ? (seminar: any) => updateSeminar({ seminar, activeRoute })
              : (seminar: any) => createSeminar({ seminar, activeRoute })
          }
          removeItem={(seminar: any) => deleteSeminar({ seminar, activeRoute })}
          modalVisible={formVisible}
          setModalVisible={setFormVisible}
          activeElement={activeElement}
          cities={cities}
        />
      </MyModal>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <div className={styles.navigation}>
        <Navigator
          navItems={navItems}
          activeRoute={activeRoute}
          setActiveRoute={setActiveRoute}
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
      </div>
      {activeRoute !== "request" && (
        <Button
          appearance="filled"
          arrow="none"
          className={styles.btnFullWidth}
          onClick={() => {
            setActiveElement(
              activeRoute === "future" ? futureItem : historyItem
            );
            setFormVisible(true);
          }}
        >
          Добавить семинар
        </Button>
      )}
      <TableComponent
        tableInstance={tableInstance}
        renderActions={renderActions}
        checkBox={activeRoute === "request" ? false : true}
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

export default withLayout(Seminars);
