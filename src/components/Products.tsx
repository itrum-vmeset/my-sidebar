import { productAPI } from "../service/ProductService";

import Content from "./content/Content";

function Products(): JSX.Element {
  // const { data } = productAPI.useFetchAllProductsQuery(null);

  const [updateProduct] = productAPI.useUpdateProductMutation();
  const [deleteProduct] = productAPI.useDeleteProductMutation();

  return (
    <div>
      <Content
        service={productAPI.useFetchAllProductsQuery}
        updateProduct={updateProduct}
        deleteProduct={deleteProduct}
      />
    </div>
  );
}

export default Products;
