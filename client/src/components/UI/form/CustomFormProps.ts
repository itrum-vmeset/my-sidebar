import { DetailedHTMLProps, HTMLAttributes } from "react";

import { IFormData } from "../../../models/IFormData";

export interface CustomFormProps<S, T>
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  activeElement: T | undefined;
  setFormVisible: (action: boolean) => void;
  formData: IFormData[];
  updateItem: (item: T) => void;
  removeItem: (item: T) => void;
  validationSchema: S;
  modalVisible: boolean;
}
