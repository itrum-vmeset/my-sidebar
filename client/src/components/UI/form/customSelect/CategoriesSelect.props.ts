import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface CategoriesSelectProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  data: any;
  setData: (item: any) => void;
  selectModalVisible: boolean;
  setSelectModalVisible: any;
  options: any;
}
