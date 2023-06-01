import { useState } from "react";

import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import PageContent from "../../components/cityContent/PageContent";
import { withLayout } from "../../components/layout/Layout";
import TableForm from "../../components/table/tableForm/TableForm";
import { ICity } from "../../models/IResponse";
import { cityAPI } from "../../service/CityService";



function Cities(): JSX.Element {
  const [newCity, setNewCity] = useState({
    name: "",
    address: "",
  });
  const [deleteCity] = cityAPI.useDeleteCityMutation();
  const [updateCity] = cityAPI.useUpdateCityMutation();
  const [createCity] = cityAPI.useCreateCityMutation();

  const columns = [
    {
      Header: "Город",
      accessor: "name",
      width: 470,
    },
    {
      Header: "Адрес",
      accessor: "address",
      width: 470,
    },
    {
      Header: "",
      accessor: "delete",
      Cell: () => {
        return <DeleteIcon onClick={(city: any) => deleteCity(city)} />;
      },
      width: 100,
    },
  ];

  return (
    <div>
      <PageContent
        service={cityAPI.useFetchAllCitiesQuery}
        deleteItem={deleteCity}
        updateItem={updateCity}
        columns={columns}
      >
        <TableForm
          addItem={() => createCity({ ...newCity, id: Date.now().toString() })}
          item={newCity}
          setItem={setNewCity}
        />
      </PageContent>
    </div>
  );
}

export default withLayout(Cities);
