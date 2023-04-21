import { orderAPI } from "../service/OrderService";

import Content from "./content/Content";

function Orders(): JSX.Element {
  return (
    <div>
      <Content
        service={orderAPI.useFetchAllOrdersQuery}
        deleteProduct={() => ({})}
        updateProduct={() => ({})}
      />
    </div>
  );
}

export default Orders;
