import { DetailedHTMLProps, HTMLAttributes } from "react";

import { IUser } from "../../models/IResponse";

export interface ContentProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  service?: any;
  clients?: IUser[];
  updateItem: (product: any) => void;
  deleteItem: (id: any) => void;
}
