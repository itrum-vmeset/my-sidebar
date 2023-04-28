import Content from "../../components/content/Content";
import { withLayout } from "../../components/layout/Layout";
import { brandAPI } from "../../service/BrandService";

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

export default withLayout(Brands);