import OrderService from "../service/OrderService";

import Content from "./content/Content";

function Orders(): JSX.Element {
  return (
    <div>
      <Content service={OrderService} />
    </div>
  );
}

export default Orders;
