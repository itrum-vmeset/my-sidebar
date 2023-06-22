import { useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTable } from "react-table";
import { useBlockLayout } from "react-table";

import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import Table from "../../components/table/Table";
import { IRenderAction } from "../../components/table/Table.props";
import TableForm from "../../components/table/tableForm/TableForm";
import DeleteModal from "../../components/UI/deleteModal/DeleteModal";
import { ICity } from "../../models/IResponse";
import CityStore from "../../store/mobxStore/promocodeStore/CityStore";

import { columns } from "./config";

export interface NewCity {
  name: {
    value: string;
    placeholder: string;
  };
  address: {
    value: string;
    placeholder: string;
  };
}

function Cities(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);

  const [newCity, setNewCity] = useState<NewCity>({
    name: {
      value: "",
      placeholder: "Введите название города",
    },
    address: {
      value: "",
      placeholder: "Введите адрес",
    },
  });

  const productsData = useMemo(
    () => (CityStore.citiesM.length ? [...CityStore.citiesM] : []),
    [CityStore.citiesM]
  );

  const tableInstance = useTable(
    {
      columns: columns,
      data: productsData,
    },
    useBlockLayout
  );

  const handleCreate = (): void => {
    CityStore.createCityM({
      id: Date.now().toString(),
      name: newCity.name.value,
      address: newCity?.address?.value,
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

  const renderActions = (): IRenderAction<ICity>[] => {
    return [
      {
        component: (
          <div className="actionIconWrapper">
            <DeleteIcon key={33} />
          </div>
        ),
        width: 40,
        action: (item: ICity) => {
          CityStore.setActiveElementM(item);
          setModalVisible(true);
        },
      },
    ];
  };

  useEffect(() => {
    CityStore.fetchCitiesM();
  }, []);

  return (
    <div className="container" data-testid="cities-page">
      {CityStore.activeElementM && (
        <DeleteModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          activeElement={CityStore.activeElementM}
          deleteItem={(city) => CityStore.deleteCityM(city)}
          text={"город"}
        />
      )}
      <TableForm
        addItem={handleCreate}
        item={newCity}
        setItem={(val) => setNewCity(val as NewCity)}
        buttonText="Добавить город"
      />
      <Table renderActions={renderActions} tableInstance={tableInstance} />
    </div>
  );
}

export default observer(Cities);
