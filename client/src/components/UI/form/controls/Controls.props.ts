import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ControlsProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  saveEdit: () => void;
  setModalVisible: (val: boolean) => void;
}
