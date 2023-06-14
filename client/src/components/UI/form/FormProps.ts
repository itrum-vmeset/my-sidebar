import { DetailedHTMLProps, HTMLAttributes } from "react";

import { IFormData } from "../../../models/IFormData";

export interface FormProps<S, T>
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  activeElement: T;
  formData: IFormData[];
  updateItem: (item: T) => void;
  removeItem: (item: T) => void;
  validationSchema?: S;
  modalVisible: boolean;
  setFormVisible: (action: boolean) => void;
}
