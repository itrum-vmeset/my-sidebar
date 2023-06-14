import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface SelectModalProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  selectModalVisible: boolean;
  setSelectModalVisible: (action: Record<string, boolean>) => void;
  options: Record<string, string | number>[];
  active: any;
  setData: (val: any) => void;
}
