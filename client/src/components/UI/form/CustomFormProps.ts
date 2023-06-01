import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface CustomFormProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  activeElement: any;
  // modalVisible: any;
  setFormVisible: any;
  formData: any;
  updateItem: any;
  removeItem: any;
  brands?: any;
  cities?: any;
}

// interface Req {
//   sum: string,
//   from: string,
//   to: string
// }

// interface Res {
//   status: string,
//   data: {
//     databaseId : number
//   } | {

//   }
// }
