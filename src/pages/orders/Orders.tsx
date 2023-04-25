import Content from "../../components/content/Content";
import { withLayout } from "../../components/layout/Layout";
import { orderAPI } from "../../service/OrderService";

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

export default withLayout(Orders);
