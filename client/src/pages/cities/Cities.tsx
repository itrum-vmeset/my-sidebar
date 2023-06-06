import { useMemo, useState } from "react";
import { useTable } from "react-table";
import { useBlockLayout } from "react-table";

import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import PageContent from "../../components/cityContent/PageContent";
import { withLayout } from "../../components/layout/Layout";
import TableComponent from "../../components/table/TableComponent";
import TableForm from "../../components/table/tableForm/TableForm";
import DeleteModal from "../../components/UI/deleteModal/DeleteModal";
import { cityAPI } from "../../service/CityService";

import { columns } from "./config";

function Cities(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeElement, setActiveElement] = useState<any>({});

  const [newCity, setNewCity] = useState({
    name: {
      value: "",
      placeholder: "Введите название города",
    },
    address: {
      value: "",
      placeholder: "Введите адрес",
    },
  });
  const [deleteCity] = cityAPI.useDeleteCityMutation();
  const [updateCity] = cityAPI.useUpdateCityMutation();
  const [createCity] = cityAPI.useCreateCityMutation();
  const { data } = cityAPI.useFetchAllCitiesQuery(null);

  const productsData = useMemo(
    () => (data?.data.length ? [...data.data] : []),
    [data]
  );

  const tableInstance = useTable(
    {
      columns: columns,
      data: productsData,
    },
    useBlockLayout
  );

  const handleCreate = () => {
    createCity({
      id: Date.now().toString(),
      name: newCity.name.value,
      address: newCity.address.value,
    });
    setNewCity({
      name: {
        value: "",
        placeholder: "Введите название города",
      },
      address: {
        value: "",
        placeholder: "Введите адрес",
      },
    });
  };

  const renderActions = () => {
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
    <div>
      <DeleteModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        activeElement={activeElement}
        deleteItem={deleteCity}
        text={"город"}
      />
      <PageContent deleteItem={deleteCity} updateItem={updateCity}>
        <TableForm
          addItem={handleCreate}
          item={newCity}
          setItem={setNewCity}
          buttonText="Добавить город"
        />
        <TableComponent
          tableInstance={tableInstance}
          renderActions={renderActions}
        />
      </PageContent>
    </div>
  );
}

export default withLayout(Cities);
