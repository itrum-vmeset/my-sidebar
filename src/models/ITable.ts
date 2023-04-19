export interface IBrand {
  brand: string;
  brandId: number;
}

export interface ICategory {
  category: string;
  categoryId: number;
}

export interface ISubCategory {
  subCategory: string;
  subCategoryId: number;
}

export interface IProduct {
  id: number;
  title: string;
  brand: IBrand;
  category: ICategory;
  subCategory: ISubCategory;
  cashback: number;
}
