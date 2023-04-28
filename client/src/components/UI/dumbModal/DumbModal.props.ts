import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface DumbModalProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  dumbModalVisible: boolean;
  setDumbModalVisible: (e: boolean) => void;
  children: ReactNode;
}
