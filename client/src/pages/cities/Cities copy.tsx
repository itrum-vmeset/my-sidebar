import { useId, useState } from "react";
import { useTable } from "react-table";

import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import PageContent from "../../components/cityContent/PageContent";
import { withLayout } from "../../components/layout/Layout";
import { GlobalFilter } from "../../components/table/filter/Filter";
import Paginator from "../../components/table/pagination/Paginator";
import TableForm from "../../components/table/tableForm/TableForm";
import { ICity } from "../../models/IResponse";
import { cityAPI } from "../../service/CityService";

function Cities(): JSX.Element {
  // const [newCity, setNewCity] = useState({
  //   name: "",
  //   address: "",
  // });
  // const [deleteCity] = cityAPI.useDeleteCityMutation();
  // const [updateCity] = cityAPI.useUpdateCityMutation();
  // const [createCity] = cityAPI.useCreateCityMutation();

  // const columns = [
  //   {
  //     Header: "Город",
  //     accessor: "name",
  //     width: 470,
  //   },
  //   {
  //     Header: "Адрес",
  //     accessor: "address",
  //     width: 470,
  //   },
  //   {
  //     Header: "",
  //     accessor: "delete",
  //     action: "delete",
  //     Cell: () => {
  //       // return <DeleteIcon onClick={(city: any) => deleteCity(city)} />;
  //       return <DeleteIcon />;
  //     },
  //     width: 100,
  //   },
  // ];
  // const action = (switch1: any, city) => {
  //   if (switch1 === "delete") {
  //     deleteCity(city);
  //     console.log(switch1);
  //   }
  // };

  // const renderActions = () => {
  //   return <>

  //   <DeleteIcon onClick={()} onChange={}  />
  //   <DeleteIcon onClick={()} />
  //   <DeleteIcon onClick={()} />
  //   <DeleteIcon onClick={()} />
  //   <DeleteIcon onClick={()} />
  //   </>

  // }

  // const renderFilters = () => {
  //   return (
  //     <>
  //       <TableForm />
  //       <dfjhsadlkgfjklsdfg />
  //       <TableForm onLoadedData={() => {}} />
  //     </>
  //   );
  // };

  return (
    <div>
      {/* <PageContent
        service={cityAPI.useFetchAllCitiesQuery}
        deleteItem={deleteCity}
        updateItem={updateCity}
        action={action}

        renderActions={renderActions}
        columns={columns}
      >
      </PageContent> */}
    </div>
  );
}

export default withLayout(Cities);
