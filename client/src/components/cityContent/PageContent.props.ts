import React, { DetailedHTMLProps, HTMLAttributes } from "react";

import { IUser } from "../../models/IResponse";

export interface PageContentProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  service?: any;
  clients?: IUser[];
  updateItem: (product: any) => void;
  deleteItem: (id: any) => void;
  columns: any;
  children: React.ReactNode;
}
