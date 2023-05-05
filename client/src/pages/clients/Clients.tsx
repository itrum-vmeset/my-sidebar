import Content from "../../components/content/Content";
import { withLayout } from "../../components/layout/Layout";
import { clientAPI } from "../../service/ClientsService";

function Clients(): JSX.Element {
  const [updateProduct] = clientAPI.useUpdateClientMutation();
  const [deleteProduct] = clientAPI.useDeleteClientMutation();

  return (
    <div>
      <Content
        service={clientAPI.useFetchAllClientsQuery}
        updateProduct={updateProduct}
        deleteProduct={deleteProduct}
      />
    </div>
  );
}

export default withLayout(Clients);
