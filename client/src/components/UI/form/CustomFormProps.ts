import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface CustomFormProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  activeElement: any;
  setFormVisible: any;
  formData: any;
  updateItem: any;
  removeItem: any;
  brands?: any;
  cities?: any;
  validationSchema: any;
  modalVisible: any;
}
