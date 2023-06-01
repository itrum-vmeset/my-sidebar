import { useMemo } from "react";

import Content from "../../components/content/Content";
import { withLayout } from "../../components/layout/Layout";
import { productAPI } from "../../service/ProductService";

function Products(): JSX.Element {
  const [updateProduct] = productAPI.useUpdateProductMutation();
  const [deleteProduct] = productAPI.useDeleteProductMutation();

  return (
    <div>
      <Content
        service={productAPI.useFetchAllProductsQuery}
        updateItem={updateProduct}
        deleteItem={deleteProduct}
      />
    </div>
  );
}

export default withLayout(Products);
