import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface CustomSelectProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  data: any;
  setData: (item: any) => void;
  selectModalVisible: boolean;
  setSelectModalVisible: any;
  options: any;
}
