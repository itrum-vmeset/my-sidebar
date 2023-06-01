import Content from "../../components/content/Content";
import { withLayout } from "../../components/layout/Layout";
import { orderAPI } from "../../service/OrderService";

function Orders(): JSX.Element {
  const [deleteOrder] = orderAPI.useDeleteOrderMutation();
  const [updateOrder] = orderAPI.useUpdateOrderMutation();

  return (
    <div>
      <Content
        service={orderAPI.useFetchAllOrdersQuery}
        deleteItem={deleteOrder}
        updateItem={updateOrder}
      />
    </div>
  );
}

export default withLayout(Orders);
