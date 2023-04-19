import ProductService from "../service/ProductService";

import Content from "./content/Content";

function Products(): JSX.Element {
  return (
    <div>
      <Content service={ProductService} />
    </div>
  );
}

export default Products;
