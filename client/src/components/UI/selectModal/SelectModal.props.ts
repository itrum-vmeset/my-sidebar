import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface SelectModalProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  selectModalVisible: boolean;
  setSelectModalVisible: (action: Record<string, boolean>) => void;
  options: Record<string, string>[];
  active: string | Record<string, string>;
  setData: (val: any) => void;
}
