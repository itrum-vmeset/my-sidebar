import { DetailedHTMLProps, HTMLAttributes } from "react";

import { IUser } from "../../models/IResponse";

export interface ContentProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  service?: any;
  clients?: IUser[];
  updateProduct: (product: any) => void;
  deleteProduct: (product: any) => void;
}
