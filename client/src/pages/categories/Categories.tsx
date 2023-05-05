import Content from "../../components/content/Content";
import { withLayout } from "../../components/layout/Layout";
import { categoryAPI } from "../../service/CategoryService";

function Categories(): JSX.Element {
  const [updateProduct] = categoryAPI.useUpdateCategoryMutation();
  const [deleteProduct] = categoryAPI.useDeleteCategoryMutation();

  return (
    <div>
      <Content
        service={categoryAPI.useFetchAllCategoriesQuery}
        updateProduct={updateProduct}
        deleteProduct={deleteProduct}
      />
    </div>
  );
}

export default withLayout(Categories);
