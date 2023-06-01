import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ControlsProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  saveEdit: () => void;
  deleteItem?: () => void;
  setModalVisible: (val: boolean) => void;
}
