export interface IProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  nameFrom1C: string;
  codeFrom1C: string;
  price: number;
  estimation: number;
  purpose: string;
  volume: string;
  isReady: boolean;
  isRetailAllowed: boolean;
  product_in_warehouse_info: ProductInWarehouseInfo[];
  brand: Brand;
  sub_catalog_product: SubCatalogProduct;
  catalog_product: CatalogProduct;
  characteristics: Characteristic[];
  tags: Tag[];
  productRatings: any[];
  estimationCount: number;
  images: string[];
  variations: any[];
  similars: any[];
  protocols: any[];
  protocol_categories: any[];
  discount: number;
}

export interface ProductInWarehouseInfo {
  id: string;
  amount: number;
  prevAmount1C: number;
  warehouseId: string;
  productId: string;
}

export interface Brand {
  id: string;
  name: string;
  icon: string;
}

export interface SubCatalogProduct {
  id: string;
  name: string;
  position: number;
}

export interface CatalogProduct {
  id: string;
  name: string;
  position: number;
}

export interface Characteristic {
  id: string;
  key: string;
  value: string;
}

export interface Tag {
  id: string;
  name: string;
}
