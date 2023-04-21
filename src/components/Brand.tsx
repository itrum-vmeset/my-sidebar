import { brandAPI } from "../service/BrandService";

import Content from "./content/Content";

function Brands(): JSX.Element {
  const [updateProduct] = brandAPI.useUpdateBrandMutation();
  const [deleteProduct] = brandAPI.useDeleteBrandMutation();

  return (
    <div>
      <Content
        service={brandAPI.useFetchAllBrandsQuery}
        updateProduct={updateProduct}
        deleteProduct={deleteProduct}
      />
    </div>
  );
}

export default Brands;
