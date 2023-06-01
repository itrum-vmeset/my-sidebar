import Content from "../../components/content/Content";
import { withLayout } from "../../components/layout/Layout";
import { clientAPI } from "../../service/ClientsService";

function Clients(): JSX.Element {
  const [updateClient] = clientAPI.useUpdateClientMutation();
  const [deleteClient] = clientAPI.useDeleteClientMutation();

  return (
    <div>
      {/* <Content
        service={clientAPI.useFetchAllClientsQuery}
        updateItem={updateClient}
        deleteItem={deleteClient}
      /> */}
    </div>
  );
}

export default withLayout(Clients);
